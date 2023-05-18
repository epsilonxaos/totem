<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Socios;
use Conekta\Conekta;
use Conekta\Customer;
use Conekta\Handler;
use Conekta\Order;
use Conekta\ParameterValidationError;
use Conekta\ProcessingError;
use Conekta\ResourceNotFoundError;
use Illuminate\Http\Request;
use stdClass;

class CompraController extends Controller
{
	public function compraConekta(Request $request)
	{
		Conekta::setApiKey("key_udNu9b2MboHMhzCi5uYUK7n");
		Conekta::setApiVersion('2.0.0');
		Conekta::setLocale('es');

		$datos = new stdClass();
		$datos->nombre = "Jesus";
		$datos->apellido_paterno = "Gonzalez";
		$datos->apellido_materno = "Ramon";
		$datos->correo = "jesus@example.com";
		$datos->telefono = "9934325614";
		$datos->monto = 450;


		$today = date('Y-m-d H:i:s');
		$client = isset($request->isSocio) ? Socios::where([['email', '=', $request->email], ['token_access', '=', $request->token_access]])->get() : $request;
		// $client = Customer::where('id_customer', Auth() -> User() -> id_customer)->first();
		$success_customer = false;

		try {
			$customerConekta = Customer::create(
				array(
					"name" => $datos->nombre . ' ' . $datos->apellido_paterno . ' ' . $datos->apellido_materno,
					"email" => $datos->correo,
					"phone" => $datos->telefono,
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

		//? En caso de necesitar recordar pagos
		// if ($client->conekta_id) {
		// 	// $customerConekta =  Conektacustomer::find($client->conekta_id); //ubicamos al cliente
		// 	if ($request->new_Card && $request->token) {
		// 		try {
		// 			$antigua_tarjeta = $customerConekta->payment_sources[0]->id; //id de la tarjeta antigua
		// 			$source = $customerConekta->createPaymentSource(['token_id' => $request->token, 'type' => 'card']); // creamos la tarjeta nueva
		// 			$customerConekta->update(['default_payment_source_id' => $source->id]); // configuramos la nueva tarjeta default
		// 			$customerConekta->deletePaymentSourceById($antigua_tarjeta); // eliminamos la anterior tarjeta
		// 		} catch (ProcessingError $error) {
		// 			$er = $error->getMessage();
		// 		} catch (ParameterValidationError $error) {
		// 			$er = $error->getMessage();
		// 		} catch (Handler $error) {
		// 			$er = $error->getMessage();
		// 		}
		// 	}
		// 	$success_customer = true;
		// } else {

		// }

		//dd($customerConekta);

		//? Actualizar las tarjetas por defecto de un cliente
		// $client->update([
		// 	'name' => $request->nombre,
		// 	'lastname' => $request->apellidos,
		// 	'phone' => $request->celular,
		// 	'address' => $request->calleyNumero,
		// 	'colony' => $request->colonia,
		// 	'city' => $request->municipio,
		// 	'state' => $request->estado,
		// 	'country' => $request->pais,
		// 	'zip' => $request->cp,
		// 	'status' => 1,
		// 	'conekta_id' => $customerConekta->id
		// ]);

		// if (self::validatePackage($request->id_package, $request->id_customer)) {
		if (true) {
			$daypass = Daypass::find(1);
			//? Hitorial de compras
			// // $package = Package::where('id_package', $request->id_package)->first();
			// $duration = $package->duration;
			// $purchase = Purchase::create([
			// 	'id_customer' => $request->id_customer,
			// 	'id_package' => $request->id_package,
			// 	'price' => $package->price,
			// 	'no_class' => $package->no_class,
			// 	'duration' => $duration,
			// 	'status' => 1,
			// 	'date_expirate' => date('Y-m-d H:i:s', strtotime($today . ' +' . $duration . ' days')),
			// 	'method_pay' => "conekta",
			// 	'discount' => $request->discount
			// ]);
			// $order = Order::create([]);

			if ($success_customer) {
				$success = false;

				try {

					$validOrderWithCheckout = array(
						'line_items' => array(
							array(
								'name' => 'Box of Cohiba S1s',
								'description' => 'Imported From Mex.',
								'unit_price' => 120000,
								'quantity' => 1,
								'sku' => 'cohbs1',
								'category' => 'food',
								'tags' => array('food', 'mexican food')
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
						'metadata'    => array('test' => 'extra info')
					);
					$order = Order::create($validOrderWithCheckout);

					// if($request -> discond > 0)
					// {
					//     $preOrder['discount_lines'] = Array(
					//         array(
					//             "code" => $request -> cupon,
					//             "type" => "coupon",
					//             "amount" => $request -> cupon_discount
					//         )
					//     );
					// }

					// $order = Order::create($preOrder);


					$success = true;
				} catch (ProcessingError $error) {
					$error = 'Error 1: ' . $error->getMessage();
				} catch (ParameterValidationError $error) {
					$error = 'Error 2: ' . $error->getMessage();
				} catch (Handler $error) {
					$error = 'Error 3: ' . $error->getMessage();
				} catch (ResourceNotFoundError $error) {
					$error = 'Error 4: ' . $error->getMessage();
				}

				if ($success) {
					// return response($order['charges'][0], 200);
					$status = $order->charges[0]->status;
					// $free = 2;
					switch ($status) {
						case 'paid':
							// $order->status = 2;

							//? Cupones
							// if ($request->discount > 0) { //Detectamos si existe algun descuento
							// 	$total = $request->total; //Calculamos el total a pagar aplicando el cupon
							// 	if ($total == 0) { //Verificamos si el total es igual a 0
							// 		$purchase->method_pay = 'gratis';
							// 		if ($request->cupon != '') { //Detectamos que el titulo del cupon no venga vacio
							// 			if (Cupon::where('title', $request->cupon)->exists()) { //Verificamos que exista ese cupon
							// 				$cupon = Cupon::where('title', $request->cupon)->first(); //Obtenemos el registro del cupon con el titulo
							// 				$cupon->uses = $cupon->uses + 1; //Amentamos el uso del cupon
							// 				$cupon->save(); //Guardamos ese aumento

							// 				$free = 1;
							// 				$purchase->status = 3;
							// 			}
							// 		}
							// 		// SendMailJob::dispatch("compra", $purchase -> id_customer, $purchase -> id_purchase) ->delay(now()->addMinutes(1));
							// 		// SendMailJob::dispatch("compra_staff", "", "") ->delay(now()->addMinutes(1));
							// 	}
							// }

							// $order->save();
							// dd($order);
							return response(["status" => 'paid'], 200);
						default:
							return response(["status" => 'fail', 'error' => $error], 200);
							break;
					}
				} else {
					return response(["status" => 'error', 'error' => $error], 200);
				}
			} else {
				return response(["status" => 'Orden error', 'error' => $er], 200);
			}

			// ? Historial de compra
			//si la compra se crea el purchase data
			// if ($purchase->id_purchase) {

			// 	// PurchaseData::create([
			// 	// 	'id_purchase' => $purchase->id_purchase,
			// 	// 	'name' => $client->name,
			// 	// 	'lastname' => $client->lastname,
			// 	// 	'phone' => $client->phone,
			// 	// 	'email' => $client->email,
			// 	// 	'address' => $client->address,
			// 	// 	'cupon_name' => $request->cupon,
			// 	// 	'cupon_type' => $request->cupon_type,
			// 	// 	'cupon_value' => $request->cupon_discount
			// 	// ]);





			// }
		}
		return response(["status" => 'error desconocido', 'error' => 'Ni idea'], 200);
	}
}