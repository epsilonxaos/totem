<?php

namespace App\Http\Controllers;

use App\DataTables\ReservacionesDataTable;
use App\Models\Daypass;
use App\Models\Movimientos;
use App\Models\Orden;
use App\Models\Reservacion;
use App\Models\Socios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservacionController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index2()
	{
		return view('panel.reservacion.index', [
			"title" => "Reservaciones",
			"breadcrumb" => [
				[
					'title' => 'Ordenes',
					'active' => true,
				]
			],
			'data' => Reservacion::orderBy('created_at', 'desc')->paginate(10)
		]);
	}

	public function index(ReservacionesDataTable $dataTable)
	{
		return $dataTable->render('panel.reservacion.index', [
			"title" => "Reservaciones",
			"breadcrumb" => [
				[
					'title' => 'Reservaciones',
					'active' => true,
				]
			]
		]);
	}

	/**
	 * Display a listing of the resource.
	 */
	public function calendar()
	{
		$daypass = Daypass::find(1);
		$daypass->fechas_excluidas = json_decode($daypass->fechas_excluidas);

		$fechasReservaciones = Reservacion::select(
			'fecha_reservacion',
			DB::raw('COUNT(id) as total_reservaciones'),
			DB::raw('SUM(IFNULL(`p_adultos`, 0) + IFNULL(`p_ninos`, 0) + IFNULL(`pay_adultos`, 0)+ IFNULL(`pay_ninos`, 0)) AS total_personas')
		)->groupBy('fecha_reservacion')->orderBy('fecha_reservacion', 'desc')->get();

		$fechasRev = $fechasReservaciones->toArray();

		foreach ($fechasRev as $key => $fecha) {
			$count = Movimientos::where([
				['daypass_id', '=', $daypass->id],
				['fecha_reservacion', '=', $fecha['fecha_reservacion']]
			]);

			$total = $count->sum('cantidad');

			if ($total >= $daypass->limite_total) {
				$fechasRev[$key]['disponibilidad'] = false;
				$fechasRev[$key]['cupo_disponible'] = 'Sin cupo';
			} else {
				$now = date('Y-m-d');
				if ($fecha['fecha_reservacion'] < $now) {
					$fechasRev[$key]['disponibilidad'] = false;
					$fechasRev[$key]['cupo_disponible'] = 'Fecha expirada';
				} else {
					$fechasRev[$key]['disponibilidad'] = true;
					$fechasRev[$key]['cupo_disponible'] = $daypass->limite_total - $total;
				}
			}
		}

		return view('panel.reservacion.calendar', [
			"title" => "Calendario Reservaciones",
			"breadcrumb" => [
				[
					'title' => 'Calendario Reservaciones',
					'active' => true,
				]
			],
			'fechasExcluidas' => $daypass->fechas_excluidas,
			'fechasReservaciones' => $fechasRev
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function list(Request $request)
	{
		$reservacionesSocios = Reservacion::where('fecha_reservacion',  $request->fecha_reservacion)->whereNotNull('socio_id')->get();
		$reservacionesPublico = Reservacion::where('fecha_reservacion',  $request->fecha_reservacion)->whereNull('socio_id')->get();
		return response(['list_socios' => $reservacionesSocios, 'list_publico' => $reservacionesPublico], 200);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function changeAsistencia(Request $request)
	{
		$reservacion = Reservacion::where('folio', $request->folio)->first();

		$reservacion->asistencia = $request->asistencia;
		$reservacion->save();
		return response(['success' => true], 200);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		return view('panel.reservacion.create', [
			"title" => "Nueva reservación",
			"breadcrumb" => [
				[
					'title' => 'Reservaciones',
					'route' => 'panel.reservacion.index',
					'active' => false,
				],
				[
					'title' => 'Nueva reservación',
					'active' => true
				]
			],
			'socios' => Socios::where('fecha_finalizacion', '>=', now())->get(),
			'daypass' => Daypass::find(1)
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function createSocio()
	{
		return view('panel.reservacion.createSocio', [
			"title" => "Nueva reservación",
			"breadcrumb" => [
				[
					'title' => 'Reservaciones',
					'route' => 'panel.reservacion.index',
					'active' => false,
				],
				[
					'title' => 'Nueva reservación',
					'active' => true
				]
			],
			'socios' => Socios::where('fecha_finalizacion', '>=', now())->get(),
			'daypass' => Daypass::find(1)
		]);
	}


	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Int $id)
	{
		$r = Reservacion::find($id);
		$o = Orden::where('reservacion_id', $id)->first();
		$m = Movimientos::where('orden_id', $o->id)->first();

		return view('panel.reservacion.show', [
			"title" => "Informacion de reservación",
			"breadcrumb" => [
				[
					'title' => 'Reservaciones',
					'route' => 'panel.reservacion.index',
					'active' => false,
				],
				[
					'title' => 'Información',
					'active' => true
				]
			],
			'data' => $r,
			'orden' => $o,
			'movimiento' => $m
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Int $id)
	{
		$r = Reservacion::find($id);
		$o = Orden::where('reservacion_id', $id)->first();
		$m = Movimientos::where('orden_id', $o->id)->first();

		return view('panel.reservacion.edit', [
			"title" => "Informacion de reservación",
			"breadcrumb" => [
				[
					'title' => 'Reservaciones',
					'route' => 'panel.reservacion.index',
					'active' => false,
				],
				[
					'title' => 'Información',
					'active' => true
				]
			],
			'data' => $r,
			'orden' => $o,
			'movimiento' => $m
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Int $id)
	{
		try {
			$reservacion = Reservacion::find($id);
			$reservacion->fecha_reservacion = $request->fecha_reservacion;
			$reservacion->save();

			$o = Orden::where('reservacion_id', $id)->first();

			$movi = Movimientos::where('orden_id', $o->id)->first();
			$movi->fecha_reservacion = $reservacion->fecha_reservacion;
			$movi->save();

			return route('panel.reservacion.show', ['id' => $reservacion->id]);
		} catch (\Throwable $th) {
			return response(["status" => 'error', 'error' => 'Hubo un problema en el proceso', 'er' => $th], 500);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Reservacion $reservacion)
	{
		//
	}
}
