<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Movimientos;
use App\Models\Reservacion;
use Illuminate\Http\Request;

class MovimientosController extends Controller
{
	public function verificarDisponibilidad(Request $request)
	{
		$daypass = Daypass::find($request->daypass_id);
		$count = Movimientos::where([
			['daypass_id', '=', $request->daypass_id],
			['fecha_reservacion', '=', $request->fecha_reservacion]
		]);

		$total = $count->sum('cantidad');
		$socio = null;

		if (isset($request->socio_id)) {
			$resp = self::verificarReservacionesSocios($request->socio_id, $request->fecha_reservacion);
			$total = self::verificarSocioReservacionesMes($request->socio_id, $request->fecha_reservacion);
			$socio = ['diaReservadoPrev' => $resp, 'reservacionesMes' => $total];
		}

		if ($total >= $daypass->limite_total) {
			return response(['disponibilidad' => false, 'fecha_reservacion' => $request->fecha_reservacion, 'socio' => $socio]);
		} else {
			return response(['disponibilidad' => true, 'fecha_reservacion' => $request->fecha_reservacion, 'socio' => $socio, 'cupo_disponible' => $daypass->limite_total - $total]);
		}
	}

	public function verificarReservacionesSocios($socioID, $fechaReservacion)
	{
		$data = Reservacion::where([
			['socio_id', '=', $socioID],
			['fecha_reservacion', '=', $fechaReservacion]
		])->first();

		return $data ? true : false;
	}

	public function verificarSocioReservacionesMes($socioID, $fechaReservacion)
	{
		// Obtén el mes actual
		$mesActual = date('m', strtotime($fechaReservacion));
		$data = Reservacion::where('socio_id', $socioID)
			->whereMonth('fecha_reservacion', $mesActual)->get();

		$total = $data->count();
		return $total;
	}
}
