<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\SignatureVerificationException;
use Stripe\StripeClient;
use Stripe\Webhook;
use UnexpectedValueException;

class StripeController extends Controller
{
	public function webhook(Request $request)
	{

		$stripe = new StripeClient(env("STRIPE_SECRET_KEY"));

		// This is your Stripe CLI webhook secret for testing your endpoint locally.
		$endpoint_secret = 'whsec_828a1b9fa9ca9804b4d7062d7514ca58db8774a4c2304657ffc3c6d83a022c41';

		$payload = @file_get_contents('php://input');
		$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
		$event = null;

		try {
			$event = Webhook::constructEvent(
				$payload,
				$sig_header,
				$endpoint_secret
			);
		} catch (UnexpectedValueException $e) {
			// Invalid payload
			http_response_code(400);
			exit();
		} catch (SignatureVerificationException $e) {
			// Invalid signature
			http_response_code(400);
			exit();
		}

		// Handle the event
		switch ($event->type) {
			case 'payment_intent.succeeded':
				$paymentIntent = $event->data->object;
				Log::debug($paymentIntent);
				// Actualizar base de datos, enviar confirmación, etc.
				$source = Orden::find($request->data['object']['metadata']['pago_id']);
				$source->status = 2; //* Estado 2- completado o pagado
				$source->save();
				logger('Realizado', ['pago' => $source, 'status' => $request->data['object']['payment_status']]);
			default:
				echo 'Received unknown event type ' . $event->type;
		}

		// http_response_code(200);

		logger('WEBHOOK STRIPE LOG', [
			'type' => $event->type,
			'data' => print_r($event->data, true)
		]);

		return response('webhook done', 200);
	}
}
