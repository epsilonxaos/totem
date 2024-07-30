<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use Illuminate\Http\Request;
use Stripe\Webhook;

class StripeController extends Controller
{
	public function webhook(Request $request)
	{
		$endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
		$sig_header = $request->header('Stripe-Signature');
		$payload = $request->getContent();

		try {
			$event = Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
		} catch (\UnexpectedValueException $e) {
			// Invalid payload
			return response()->json(['error' => 'Invalid payload'], 400);
		} catch (\Stripe\Exception\SignatureVerificationException $e) {
			// Invalid signature
			return response()->json(['error' => 'Invalid signature'], 400);
		}

		// Manejar el evento
		switch ($event->type) {
			case 'payment_intent.succeeded':
				$paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
				// Actualizar base de datos, enviar confirmación, etc.
				$source = Orden::find($request->data['object']['metadata']['pago_id']);
				$source->status = 3; //* Estado 3 - completado o pagado
				$source->save();
				logger('Realizado', ['pago' => $source, 'status' => $request->data['object']['payment_status']]);
				break;
				// Manejar otros tipos de eventos
			default:
				return response()->json(['error' => 'Unhandled event type'], 400);
		}

		logger('WEBHOOK STRIPE LOG', [
			'type' => $event->type,
			'data' => print_r($event->data, true)
		]);

		return response('webhook done', 200);
	}
}
