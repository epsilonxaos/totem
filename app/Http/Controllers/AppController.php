<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use App\Mail\MailRecoveryPasswordSocio;
use App\Models\Daypass;
use App\Models\Orden;
use App\Models\Reservacion;
use App\Models\Socios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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
		$reservacion = Reservacion::select('id', 'socio_id', 'folio', 'fecha_reservacion', 'p_adultos', 'pay_adultos', 'p_ninos', 'pay_ninos', 'p_ninos_menores')
			->where('folio', $request->folio)->first();
		$orden = Orden::select('total')->where('reservacion_id', $reservacion->id)->first();
		$daypass = Daypass::select('precio_adultos', 'precio_ninos', 'precio_ninos_menores')->find(1);

		$reservacion->socio_id = $reservacion->socio_id ? true : false;
		$reservacion->fecha_reservacion = Helpers::dateSpanishComplete($reservacion->fecha_reservacion);

		return response(['orden' => $orden, "reservacion" => $reservacion, 'daypass' => $daypass], 200);
	}

	public function validarSocio(Request $request)
	{
		$socio = Socios::select('id', 'nombre_completo', 'telefono', 'correo', 'password')
			->where('correo', $request->correo)->first();

		if (!$socio) return response(['acceso' => false, 'error' => 'Usuario no encontrado']);

		if (Hash::check($request->password, $socio->password)) {
			return response(['acceso' => true, 'socio' => ['nombre_completo' => $socio->nombre_completo, 'telefono' => $socio->telefono, 'correo' => $socio->correo]]);
		} else {
			return response(['acceso' => false, 'error' => 'ID de acceso no es correcto']);
		}
	}

	public function recuperarPasswordSocio(Request $request)
	{
		$socio = Socios::select('id', 'correo', 'token', 'nombre')
			->where('correo', $request->correo)->first();

		if (!$socio) return response(['exist' => false, 'error' => 'Lo sentimos, la cuenta que ingreso no existe, verifique que los datos sean correctos.']);

		$urlRecovery = url('/membresia/passwordRecovery/' . encrypt($socio->correo) . '/' . $socio->token);
		$data = [
			'nombre' => $socio->nombre,
			'urlRecovery' => $urlRecovery
		];

		Mail::to($request->correo)->send(new MailRecoveryPasswordSocio($data));

		return response(['exist' => true]);
	}

	public function updatePasswordSocio(Request $request)
	{
		try {
			$correo = decrypt($request->socio);
			$socio = Socios::where([
				['correo', '=', $correo],
				['token', '=', $request->token],
			])->first();

			if (!$socio) return response(['success' => false, 'message' => 'Lo sentimos, se presento un error, la sesión expiro, los datos para la recuperación no son correctos o la cuenta no existe, vuelva a intentar el proceso. Si el proble persiste contacte a soporte apra brindarle ayuda'], 500);

			$socio->password = Hash::make($request->password);
			$socio->token = Str::random(10);
			$socio->save();

			return response(['success' => true, 'socio' => $socio, 'message' => 'Contraseña actualizada, ahora ya puede iniciar sesión con la nueva contraseña.'], 200);
		} catch (\Throwable $th) {
			return response(['success' => false, 'message' => 'Lo sentimos, se presento un error, la sesión expiro, los datos para la recuperación no son correctos o la cuenta no existe, vuelva a intentar el proceso. Si el proble persiste contacte a soporte apra brindarle ayuda'], 500);
		}
	}
}
