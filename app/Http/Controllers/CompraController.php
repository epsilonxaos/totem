<?php

namespace App\Http\Controllers;

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
use Illuminate\Support\Str;

class CompraController extends Controller
{
	public function compraConekta(Request $request)
	{
		Conekta::setApiKey("key_udNu9b2MboHMhzCi5uYUK7n");
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

		if (true) {
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

							if ($socioIsPay) {
								$reservacion->socio_id = $socio->id;
								$reservacion->save();
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
								'cantidad' => $request->adultos + $request->ninos + $request->ninos_menores
							]);

							return response(["status" => 'paid', 'orden_folio' => $reservacion->folio], 200);
						default:
							$orden->status = 3;
							$orden->save();
							return response(["status" => 'fail', 'error' => $error], 500);
							break;
					}
				} else {
					return response(["status" => 'error', 'error' => $error], 500);
				}
			} else {
				$orden->status = 4;
				$orden->save();
				return response(["status" => 'Orden error', 'error' => $er], 500);
			}
		}
		return response(["status" => 'error desconocido', 'error' => 'Ni idea'], 200);
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
				'cantidad' => $request->adultos + $request->ninos + $request->ninos_menores
			]);

			return response(["status" => 'paid', 'orden_folio' => $reservacion->folio], 200);
		} catch (\Throwable $th) {
			return response(["status" => 'error', 'error' => 'Hubo un problema en el proceso', 'er' => $th], 200);
		}
	}

	public function compraAdmin(Request $request)
	{
		try {
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
				'is_socio' => $request->isSocio,
			]);

			if ($request->isSocio) {
				$reservacion->socio_id = $request->socio['id'];
				$reservacion->save();
			}

			$orden = Orden::create([
				'reservacion_id' => $reservacion->id,
				'daypass_id' => $daypass->id,
				'total' => $request->total,
				'pago_metodo' => $request->isSocio ? 'incluido' : $request->pago_metodo,
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
				'cantidad' => $request->adultos + $request->ninos + $request->ninos_menores
			]);
			return route('panel.reservacion.show', ['id' => $reservacion->id]);
			// return response(["status" => 'paid', 'orden_folio' => $reservacion->folio], 200);
		} catch (\Throwable $th) {
			return response(["status" => 'error', 'error' => 'Hubo un problema en el proceso', 'er' => $th], 200);
		}
	}
}
