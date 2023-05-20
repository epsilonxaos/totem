<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Orden;
use App\Models\Socios;
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

    public function validarSocio(Request $request)
    {
        $socio = Socios::select('id', 'nombre_completo', 'telefono', 'correo', 'token_access')
            ->where('correo', $request->correo)->first();

        if (!$socio) return response(['acceso' => false, 'error' => 'Usuario no encontrado']);

        if ($request->token_access == decrypt($socio->token_access)) {
            return response(['acceso' => true, 'socio' => $socio]);
        } else {
            return response(['acceso' => false, 'error' => 'ID de acceso no es correcto']);
        }
    }
}
