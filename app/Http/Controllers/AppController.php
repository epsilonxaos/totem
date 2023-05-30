<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Orden;
use App\Models\Reservacion;
use App\Models\Socios;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function documentoInicial()
    {
        $daypass = Daypass::find(1);
        $daypass->fechas_excluidas = json_decode($daypass->fechas_excluidas);

        $datos = [
            'daypass' => $daypass
        ];

        return response($datos, 200);
    }

    public function obtenerOrden(Request $request)
    {
        $reservacion = Reservacion::where('folio', $request->folio)->first();
        $orden = Orden::where('reservacion_id', $reservacion->id)->first();

        return response(['orden' => $orden, "reservacion" => $reservacion], 200);
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
