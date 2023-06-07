<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;

class Helpers
{
	/**
	 * Return fecha en español - 01 de Marzo del 2021
	 * @param string Required date  $fecha
	 * @return string New Date
	 */
	public static function dateSpanishComplete($fecha)
	{
		$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

		$fecha = Carbon::parse($fecha);
		$mes = $meses[($fecha->format('n')) - 1];
		return $fecha->format('d') . ' de ' . $mes . ' del ' . $fecha->format('Y');
	}

	/**
	 * Return fecha en español corto - 01/Mar/2021
	 * @param string Required date  $fecha
	 * @return string New Date
	 */
	public static function dateSpanishShort($fecha)
	{
		$meses = array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");

		$fecha = Carbon::parse($fecha);
		$mes = $meses[($fecha->format('n')) - 1];
		return $fecha->format('d') . '/' . $mes . '/' . $fecha->format('Y');
	}

	public static function leyendaStatusOrden($status)
	{
		switch ($status) {
			case '1':
				return ['estado' => 'En proceso', 'color' => 'yellow'];
				break;
			case '2':
				return ['estado' => 'Pago completado', 'color' => 'green'];
				break;
			case '3':
				return ['estado' => 'Fallido', 'color' => 'orange'];
				break;
			case '4':
				return ['estado' => 'Error al pagar', 'color' => 'red'];
				break;
			case '6':
				return ['estado' => 'Club socio', 'color' => 'indigo'];
				break;

			default:
				# code...
				break;
		}
	}
}
