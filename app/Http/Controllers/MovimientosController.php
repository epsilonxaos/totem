<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Movimientos;
use Illuminate\Http\Request;

class MovimientosController extends Controller
{
    public function verificarDisponibilidad(Request $request)
    {
        $daypass = Daypass::find($request->daypass_id);
        $count = Movimientos::where([
            ['daypass_id', '=', $request->daypass_id],
            ['fecha_reservacion', '=', $request->fecha_reservacion]
        ])->count();

        if ($count >= $daypass->limite_total) {
            return response(['disponibilidad' => false]);
        } else {
            return response(['disponibilidad' => true, 'cupo_disponible' => $daypass->limite_total - $count]);
        }
    }
}
