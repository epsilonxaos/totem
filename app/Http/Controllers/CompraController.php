<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Movimientos;
use App\Models\Orden;
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

		try {
			$customerConekta = Customer::create(
				array(
					"name" => $request->nombre,
					"email" => $request->correo,
					"phone" => $request->telefono,
					"payment_sources" => [
						[
							"type" => "card",
							"token_id" => $request->token
						]
					]
				) //customer
			);

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
				'folio' => strtoupper('TBC' . Str::random(8)),
				'nombre_completo' => $request->nombre,
				'correo' => $request->correo,
				'telefono' => $request->telefono,
				'fecha_reservacion' => $request->reservacion,
				'p_adultos' => $request->adultos,
				'p_ninos' => $request->ninos,
				'p_ninos_menores' => $request->ninos_menores,
				'total' => $request->total,
				'status' => 1
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
							$orden->save();

							Movimientos::create([
								'daypass_id' => $daypass->id,
								'orden_id' => $orden->id,
								'fecha_reservacion' => $request->reservacion,
								'precio_adulto' => $daypass->precio_adultos,
								'precio_ninio' => $daypass->precio_ninos,
								'precio_ninio_menor' => $daypass->precio_ninos_menores,
								'cantidad' => $request->adultos + $request->ninos + $request->ninos_menores
							]);

							return response(["status" => 'paid', 'orden_folio' => $orden->folio], 200);
						default:
							return response(["status" => 'fail', 'error' => $error], 200);
							break;
					}
				} else {
					return response(["status" => 'error', 'error' => $error], 200);
				}
			} else {
				$orden->status = 4;
				$orden->save();
				return response(["status" => 'Orden error', 'error' => $er], 200);
			}
		}
		return response(["status" => 'error desconocido', 'error' => 'Ni idea'], 200);
	}
}
