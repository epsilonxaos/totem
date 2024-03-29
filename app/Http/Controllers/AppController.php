<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use App\Mail\MailRecoveryPasswordSocio;
use App\Models\Amenidades;
use App\Models\Daypass;
use App\Models\Galerias;
use App\Models\Habitaciones;
use App\Models\Movimientos;
use App\Models\Orden;
use App\Models\Reservacion;
use App\Models\Socios;
use App\Models\Websites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;

class AppController extends Controller
{
	public function documentoInicial()
	{
		$daypass = Daypass::select(
			'limite_total',
			'fechas_excluidas',
			'precio_adultos',
			'precio_ninos',
			'precio_ninos_menores',
			'moneda',
			'limite_compra_personas',
			'limite_invitados_socios',
			'maximo_pago_tarjeta',
		)->find(1);
		$habitaciones = Habitaciones::select('title', 'link', 'description', 'uid')->get();
		$daypass->fechas_excluidas = json_decode($daypass->fechas_excluidas);

		foreach ($habitaciones as $key => $room) {
			$room->galeria = Galerias::select('id', 'cover', 'order')->where('uid', $room->uid)->orderBy('order', 'asc')->get();
			$room->amenidades = Amenidades::select('id', 'cover', 'order')->where('uid', $room->uid)->orderBy('order', 'asc')->get();
		}

		$datos = [
			'daypass' => $daypass,
			'website' => Websites::select('menu')->find(1),
			'habitaciones' => $habitaciones->makeHidden(['uid'])
		];

		return response($datos, 200);
	}

	public function obtenerOrden(Request $request)
	{
		$reservacion = Reservacion::select('id', 'socio_id', 'folio', 'fecha_reservacion', 'p_adultos', 'pay_adultos', 'p_ninos', 'pay_ninos', 'p_ninos_menores')
			->where('folio', $request->folio)->first();
		if (!$reservacion) return response(false, 400);

		$orden = Orden::select('total')->where('reservacion_id', $reservacion->id)->first();
		$daypass = Daypass::select('precio_adultos', 'precio_ninos', 'precio_ninos_menores')->find(1);

		$reservacion->socio_id = $reservacion->socio_id ? true : false;
		$reservacion->fecha_reservacion = Helpers::dateSpanishComplete($reservacion->fecha_reservacion);

		return response(['orden' => $orden, "reservacion" => $reservacion, 'daypass' => $daypass], 200);
	}

	public function validarSocio(Request $request)
	{
		$socio = Socios::select('id', 'nombre_completo', 'telefono', 'correo', 'password', 'fecha_finalizacion')
			->where('correo', $request->correo)->first();

		if (!$socio) return response(['acceso' => false, 'error' => 'El usuario ingresado no existe, por favor verifica la información.']);

		if (Hash::check($request->password, $socio->password)) {
			if ($socio->fecha_finalizacion >= now()) {
				return response(['acceso' => true, 'socio' => ['id' => $socio->id, 'nombre_completo' => $socio->nombre_completo, 'telefono' => $socio->telefono, 'correo' => $socio->correo]]);
			} else {
				return response(['acceso' => false, 'error' => 'Lo sentimos, la membresía ha expirado el día ' . Helpers::dateSpanishShort($socio->fecha_finalizacion) . ', por favor, contáctate con nosotros.']);
			}
		} else {
			return response(['acceso' => false, 'error' => 'La contraseña no es correcta, por favor intenta nuevamente.']);
		}
	}

	public function recuperarPasswordSocio(Request $request)
	{
		$socio = Socios::select('id', 'correo', 'token', 'nombre')
			->where('correo', $request->correo)->first();

		if (!$socio) return response(['exist' => false, 'error' => 'Lo sentimos, la cuenta que ingresaste no existe. Por favor verifica que los datos sean correctos.']);

		$urlRecovery = url('/membresia/passwordRecovery/' . encrypt($socio->correo) . '/' . $socio->token);
		$data = [
			'nombre' => $socio->nombre,
			'urlRecovery' => $urlRecovery
		];

		// Mail::to($request->correo)->send(new MailRecoveryPasswordSocio($data));

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

			if (!$socio) return response(['success' => false, 'message' => 'Lo sentimos la sesión expiró, los datos para la recuperación no son correctos o la cuenta no existe. Por favor vuelve a intentar el proceso. Si el problema persiste, contacta a soporte para solicitar ayuda.'], 500);

			$socio->password = Hash::make($request->password);
			$socio->token = Str::random(10);
			$socio->save();

			return response(['success' => true, 'socio' => $socio, 'message' => 'Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.'], 200);
		} catch (\Throwable $th) {
			return response(['success' => false, 'message' => 'Lo sentimos, se presentó un error. Por favor vuelve a intentar más tarde. Si el problema persiste, contacta a soporte para solicitar ayuda.'], 500);
		}
	}

	public function pdfGenerate(String $folio)
	{
		$imagePath = public_path('img/logo.png');
		$image = "data:image/png;base64," . base64_encode(file_get_contents($imagePath));

		$reservacion = Reservacion::where('folio', $folio)->first();
		$orden = Orden::where('reservacion_id', $reservacion->id)->first();
		$movimiento = Movimientos::where('orden_id', $orden->id)->first();

		$data = [
			'nombre' => $reservacion->nombre_completo,
			'folio' => $reservacion->folio,
			'fechaCompra' => Helpers::dateSpanishComplete($reservacion->created_at),
			'fechaReservacion' => Helpers::dateSpanishComplete($reservacion->fecha_reservacion),
			'adultos' =>  $reservacion->pay_adultos ? $reservacion->p_adultos - $reservacion->pay_adultos :  $reservacion->p_adultos,
			'ninos' => $reservacion->pay_ninos ? $reservacion->p_ninos - $reservacion->pay_ninos : $reservacion->p_ninos,
			'ninosMenores' => $reservacion->p_ninos_menores,
			'payAdultos' => $reservacion->pay_adultos,
			'payNinos' => $reservacion->pay_ninos,
			'precioAdultos' => $movimiento->precio_adulto,
			'precioNinos' => $movimiento->precio_ninio,
			'precioNinosMenores' => $movimiento->precio_ninio_menor,
			'total' => $orden->total,
			'isSocio' => $reservacion->socio_id ? true : false,
			'metodoPago' => $orden->pago_metodo,
			'referencia' => $orden->pago_referencia,
			"logo" => $image
		];
		return Pdf::setOptions(['isHtml5ParserEnabled' => true, 'isRemoteEnabled' => true])->loadView('pdf.compra', $data)->stream('reservacion.pdf');
	}
}
