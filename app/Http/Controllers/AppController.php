<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Orden;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function documentoInicial()
    {
        $datos = [
            'daypass' => Daypass::find(1)
        ];

        return response($datos, 200);
    }

    public function obtenerOrden(Request $request)
    {
        $orden = Orden::where('folio', $request->folio)->first();

        return response($orden, 200);
    }
}
