<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use App\Models\Socios;
use Illuminate\Http\Request;

class OrdenController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		$request->validate([
			'nombre' => 'required',
			'apellido_paterno' => 'required',
			'correo' => 'required|email',
			'telefono' => 'required|min:10|max:12|numeric',
			'p_adultos' => 'required|integer',
			'fecha_reservacion' => 'required|date|after_or_equal:today',
		]);

		$isSocio = $request->is_socio;
		$socio = null;
		if ($isSocio) {
			$socio = Socios::find($request->socio_id);
		}

		$source = new Orden();
		$source->socio_id = $request->socio_id;
		$source->compra = $request->compra;
		$source->folio = $request->folio;
		$source->nombre = $isSocio ? $socio->nombre : $request->nombre;
		$source->apellido_paterno = $isSocio ? $socio->apellido_paterno : $request->apellido_paterno;
		$source->apellido_materno = $isSocio ? $socio->apellido_materno : $request->apellido_materno;
		$source->nombre_completo = $isSocio ? $socio->nombre_completo : $request->nombre . ' ' . $request->apellido_paterno . ' ' . $request->apellido_materno;
		$source->correo = $isSocio ? $socio->correo : $request->correo;
		$source->telefono = $isSocio ? $socio->telefono : $request->telefono;
		$source->p_adultos = $request->p_adultos;
		$source->p_ninos = $request->p_ninos;
		$source->p_ninos_menores = $request->p_ninos_menores;
		$source->total = $request->total;
		$source->is_socio = $request->is_socio;
		$source->pago_metodo = $request->pago_metodo;
		$source->pago_realizado = 'club';
		// $source->pago_referencia = $request->pago_referencia;
		$source->fecha_reservacion = $request->fecha_reservacion;

		//todo Establecer los estados una vez que se complete el front
		$source->status = '1';

		$source->save();
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Orden $orden)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Int $id)
	{
		$source = Orden::find($id);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Int $id, Request $request)
	{
		$source = Orden::find($id);
		$request->validate([
			'fecha_reservacion' => 'required|date|after_or_equal:today',
		]);

		$source->fecha_reservacion = $request->fecha_reservacion;
		$source->save();
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Orden $orden)
	{
		//
	}
}
