<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use App\Mail\MailConfirmOrden;
use App\Mail\MailStaffNewOrden;
use App\Models\Daypass;
use App\Models\Movimientos;
use App\Models\Orden;
use App\Models\Reservacion;
use App\Models\Socios;
use Conekta\Conekta;
use Conekta\Customer;
use Conekta\Handler;
use Conekta\Order;
use Conekta\ParameterValidationError;
use Conekta\ProcessingError;
use Conekta\ResourceNotFoundError;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class CompraController extends Controller
{
	public function compraConekta(Request $request)
	{
		Conekta::setApiKey(config('app.conektaSecret'));
		Conekta::setApiVersion('2.0.0');
		Conekta::setLocale('es');
		$success_customer = false;
		$socioIsPay = isset($request->socio) ? true : false;
		if ($socioIsPay) {
			$socio = Socios::where('correo', $request->socio['correo'])->first();
		}

		try {
			if ($socioIsPay) {
				$arrayCustomerConekta = array(
					"name" => $socio->nombre_completo,
					"email" => $socio->correo,
					"phone" => $socio->telefono,
					"payment_sources" => [
						[
							"type" => "card",
							"token_id" => $request->token
						]
					]
				);
			} else {
				$arrayCustomerConekta = array(
					"name" => $request->nombre,
					"email" => $request->correo,
					"phone" => $request->telefono,
					"payment_sources" => [
						[
							"type" => "card",
							"token_id" => $request->token
						]
					]
				);
			}

			$customerConekta = Customer::create($arrayCustomerConekta);

			$success_customer = true;
		} catch (ProcessingError $error) {
			$er = $error->getMessage();
		} catch (ParameterValidationError $error) {
			$er = $error->getMessage();
		} catch (Handler $error) {
			$er = $error->getMessage();
		}

		if ($success_customer) {
			$daypass = Daypass::find(1);
			$orden = Orden::create([
				'daypass_id' => $daypass->id,
				'pago_metodo' => 'tarjeta',
				'pago_realizado' => 'website',
				'total' => $request->total,
				'status' => 1 // En proceso
			]);

			if ($success_customer) {
				$success = false;

				try {

					$validOrderWithCheckout = array(
						'line_items' => array(
							array(
								'name' => 'Daypass',
								'description' => 'Pase a nuestras playas y amenidades',
								'unit_price' => $request->total * 100,
								'quantity' => 1,
								'category' => 'daypass',
							)
						),
						"charges" => array(
							array(
								"payment_method" => array(
									"type" => "default",
								)
							)
						),
						'customer_info' => array(
							'customer_id'   =>  $customerConekta->id
						),
						'currency'    => 'mxn',
						'metadata'    => array('order_id' => $orden->id)
					);
					$order = Order::create($validOrderWithCheckout);

					$success = true;
				} catch (ProcessingError $error) {
					$error = 'Error: ' . $error->getMessage();
				} catch (ParameterValidationError $error) {
					$error = 'Error: ' . $error->getMessage();
				} catch (Handler $error) {
					$error = 'Error: ' . $error->getMessage();
				} catch (ResourceNotFoundError $error) {
					$error = 'Error: ' . $error->getMessage();
				}

				if ($success) {
					$status = $order->charges[0]->status;

					switch ($status) {
						case 'paid':
							$orden->status = 2;
							$orden->pago_referencia = $order->id;
							$orden->save();

							$reservacion = Reservacion::create([
								'folio' => strtoupper('TBC' . Str::random(8)),
								'nombre_completo' => $socioIsPay ? $socio->nombre_completo : $request->nombre,
								'correo' => $socioIsPay ? $socio->correo : $request->correo,
								'telefono' => $socioIsPay ? $socio->telefono : $request->telefono,
								'fecha_reservacion' => $request->reservacion,
								'p_adultos' => $request->adultos,
								'p_ninos' => $request->ninos,
								'p_ninos_menores' => $request->ninos_menores,
								'is_socio' => false
							]);

							$cantidad = $request->adultos + $request->ninos;

							if ($socioIsPay) {
								$reservacion->socio_id = $socio->id;
								$reservacion->pay_adultos = $request->pay_adultos;
								$reservacion->pay_ninos = $request->pay_ninos;
								$reservacion->save();


								$cantidadAdultosReal = $request->adultos - $request->pay_adultos;
								$cantidadNinosReal = $request->ninos - $request->pay_ninos;
								$cantidad = $cantidadAdultosReal + $request->pay_adultos + $cantidadNinosReal + $request->pay_ninos;
							}

							$orden->reservacion_id = $reservacion->id;
							$orden->save();

							Movimientos::create([
								'daypass_id' => $daypass->id,
								'orden_id' => $orden->id,
								'reservacion_id' => $reservacion->id,
								'fecha_reservacion' => $request->reservacion,
								'precio_adulto' => $daypass->precio_adultos,
								'precio_ninio' => $daypass->precio_ninos,
								'precio_ninio_menor' => $daypass->precio_ninos_menores,
								'cantidad' => $cantidad
							]);

							$data = [
								'nombre' => $reservacion->nombre_completo,
								'folio' => $reservacion->folio,
								'fechaCompra' => Helpers::dateSpanishComplete($reservacion->created_at),
								'fechaReservacion' => Helpers::dateSpanishComplete($reservacion->fecha_reservacion),
								'adultos' => $reservacion->p_adultos,
								'ninos' => $reservacion->p_ninos,
								'ninosMenores' => $reservacion->p_ninos_menores,
								'payAdultos' => $reservacion->pay_adultos,
								'payNinos' => $reservacion->pay_ninos,
								'precioAdultos' => $daypass->precio_adultos,
								'precioNinos' => $daypass->precio_ninos,
								'precioNinosMenores' => $daypass->precio_ninos_menores,
								'total' => $orden->total,
								'isSocio' => $socioIsPay,
								'referencia' => $orden->pago_referencia
							];

							$dataStaff = [
								'cliente' => $reservacion->nombre_completo,
								'orden' => $orden->id,
								'folio' => $reservacion->folio,
								'fechaCompra' => Helpers::dateSpanishComplete($reservacion->created_at)
							];

							// Mail::to('wilberthg16@gmail.com')->send(new MailStaffNewOrden($dataStaff));
							// Mail::to($reservacion->correo)->send(new MailConfirmOrden($data));

							return response(["status" => 'paid', 'orden_folio' => $reservacion->folio], 200);
						default:
							$orden->status = 3;
							$orden->save();
							return response(["status" => 'fail', 'error' => $error], 500);
							break;
					}
				} else {
					$orden->status = 3;
					$orden->save();
					return response(["status" => 'error', 'error' => $error], 500);
				}
			} else {
				$orden->status = 4;
				$orden->save();
				return response(["status" => 'Orden error', 'error' => $er], 500);
			}
		}
		return response(["status" => 'error desconocido', 'error' => 'Lo sentimos, tenemos problemas con nuestro sistema.', 'errorConekta' => $er], 500);
	}

	public function compraSocios(Request $request)
	{
		try {

			$daypass = Daypass::find(1);
			$socio = Socios::where('correo', $request->socio['correo'])->first();

			$reservacion = Reservacion::create([
				'socio_id' => $socio->id,
				'folio' => strtoupper('TBC' . Str::random(8)),
				'nombre_completo' => $socio->nombre_completo,
				'correo' => $socio->correo,
				'telefono' => $socio->telefono,
				'fecha_reservacion' => $request->reservacion,
				'p_adultos' => $request->adultos,
				'p_ninos' => $request->ninos,
				'p_ninos_menores' => $request->ninos_menores,
				'is_socio' => true,
			]);

			$orden = Orden::create([
				'reservacion_id' => $reservacion->id,
				'daypass_id' => $daypass->id,
				'total' => 0,
				'pago_metodo' => 'incluido',
				'pago_realizado' => 'website',
				'status' => 6 //Estatus para Socios
			]);

			Movimientos::create([
				'daypass_id' => $daypass->id,
				'orden_id' => $orden->id,
				'reservacion_id' => $reservacion->id,
				'fecha_reservacion' => $request->reservacion,
				'precio_adulto' => $daypass->precio_adultos,
				'precio_ninio' => $daypass->precio_ninos,
				'precio_ninio_menor' => $daypass->precio_ninos_menores,
				'cantidad' => $request->adultos + $request->ninos
			]);

			$data = [
				'nombre' => $reservacion->nombre_completo,
				'folio' => $reservacion->folio,
				'fechaCompra' => Helpers::dateSpanishComplete($reservacion->created_at),
				'fechaReservacion' => Helpers::dateSpanishComplete($reservacion->fecha_reservacion),
				'adultos' => $reservacion->p_adultos,
				'ninos' => $reservacion->p_ninos,
				'ninosMenores' => $reservacion->p_ninos_menores,
				'payAdultos' => $reservacion->pay_adultos,
				'payNinos' => $reservacion->pay_ninos,
				'precioAdultos' => $daypass->precio_adultos,
				'precioNinos' => $daypass->precio_ninos,
				'precioNinosMenores' => $daypass->precio_ninos_menores,
				'total' => $orden->total,
				'isSocio' => true,
				'referencia' => $orden->pago_referencia
			];

			$dataStaff = [
				'cliente' => $reservacion->nombre_completo,
				'orden' => $orden->id,
				'folio' => $reservacion->folio,
				'fechaCompra' => Helpers::dateSpanishComplete($reservacion->created_at)
			];

			// Mail::to('wilberthg16@gmail.com')->send(new MailStaffNewOrden($dataStaff));
			// Mail::to($reservacion->correo)->send(new MailConfirmOrden($data));


			return response(["status" => 'paid', 'orden_folio' => $reservacion->folio], 200);
		} catch (\Throwable $th) {
			return response(["status" => 'error', 'error' => 'Hubo un problema en el proceso', 'er' => $th], 200);
		}
	}

	public function compraAdmin(Request $request)
	{
		try {
			// dd($request->toArray());
			$daypass = Daypass::find(1);

			$reservacion = Reservacion::create([
				'folio' => strtoupper('TBC' . Str::random(8)),
				'nombre_completo' => $request->nombre,
				'correo' => $request->correo,
				'telefono' => $request->telefono,
				'fecha_reservacion' => $request->fecha_reservacion,
				'p_adultos' => $request->adultos,
				'p_ninos' => $request->ninos,
				'p_ninos_menores' => $request->ninos_menores,
				'pay_adultos' => $request->pay_adultos,
				'pay_ninos' => $request->pay_ninos,
			]);

			if ($request->isSocio) {
				$reservacion->socio_id = $request->socio['id'];
				if ($request->pay_adultos) {
					$reservacion->p_adultos = $request->adultos + $request->pay_adultos;
					$reservacion->pay_adultos = $request->pay_adultos;
				}
				if ($request->pay_ninos) {
					$reservacion->p_ninos = $request->ninos + $request->pay_ninos;
					$reservacion->pay_ninos = $request->pay_ninos;
				}
				$reservacion->socio_id = $request->socio['id'];
				$reservacion->save();
			}

			if (!$request->isSocio) {
				$metodo = $request->pago_metodo;
				$cantidad = $request->adultos + $request->ninos;
			} else {
				$metodo = $request->total > 0 ? $request->pago_metodo : 'incluido';
				$cantidadAdultosReal = $request->adultos;
				$cantidadNinosReal = $request->ninos;
				$cantidad = $cantidadAdultosReal + $request->pay_adultos + $cantidadNinosReal + $request->pay_ninos;
			}

			$orden = Orden::create([
				'reservacion_id' => $reservacion->id,
				'daypass_id' => $daypass->id,
				'total' => $request->total,
				'pago_metodo' => $metodo,
				'pago_realizado' => 'club',
				'status' => $request->isSocio ? 6 : 2 //Estatus para Socios
			]);

			Movimientos::create([
				'daypass_id' => $daypass->id,
				'orden_id' => $orden->id,
				'reservacion_id' => $reservacion->id,
				'fecha_reservacion' => $request->fecha_reservacion,
				'precio_adulto' => $daypass->precio_adultos,
				'precio_ninio' => $daypass->precio_ninos,
				'precio_ninio_menor' => $daypass->precio_ninos_menores,
				'cantidad' => $cantidad
			]);
			return route('panel.reservacion.show', ['id' => $reservacion->id]);
			// return response(["status" => 'paid', 'orden_folio' => $reservacion->folio], 200);
		} catch (\Throwable $th) {
			return response(["status" => 'error', 'error' => 'Hubo un problema en el proceso', 'er' => $th], 200);
		}
	}
}
