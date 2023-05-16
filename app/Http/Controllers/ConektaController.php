<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use Illuminate\Http\Request;

class ConektaController extends Controller
{
	public function webhook(Request $request)
	{
		switch ($request->type) {
			case 'order.paid':
				$source = Orden::find($request->data['object']['metadata']['pago_id']);
				$source->status = 3; //* Estado 3 - completado o pagado
				$source->save();
				logger('Realizado', ['pago' => $source, 'status' => $request->data['object']['payment_status']]);
				break;
			case 'charge.paid':
				//TODO
				break;
			case 'subscription.created':
				//TODO
				break;
			case 'subscription.paid':
				//TODO
				break;
		}

		logger('WEBHOOK LOG', [
			'type' => $request->type,
			'data' => print_r($request->data, true)
		]);

		return response('webhook done', 200);
	}
}
