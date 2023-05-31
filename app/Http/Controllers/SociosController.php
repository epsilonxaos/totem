<?php

namespace App\Http\Controllers;

use App\Models\Socios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SociosController extends Controller
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
			'correo' => 'required|email|unique:socios,correo',
			'telefono' => 'required|min:10|max:12',
			'fecha_inicio' => 'required|date|after_or_equal:today',
			'fecha_finalizacion' => 'required|date|after_or_equal:today'
		]);

		Socios::create([
			'nombre' => $request->nombre,
			'apellido_paterno' => $request->apellido_paterno,
			'apellido_materno' => $request->apellido_materno,
			'nombre_completo' => $request->nombre . ' ' . $request->apellido_paterno . ' ' . $request->apellido_materno,
			'correo' => $request->correo,
			'telefono' => $request->telefono,
			'password' => Hash::make($request->password),
			'fecha_inicio' => $request->fecha_inicio,
			'fecha_finalizacion' => $request->fecha_finalizacion,
			'status' => 1
		]);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Socios $socios)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Int $id)
	{
		$source = Socios::find($id);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Int $id, Request $request)
	{
		$request->validate([
			'nombre' => 'required',
			'apellido_paterno' => 'required',
			'telefono' => 'required|min:10|max:12',
			'fecha_inicio' => 'required|date',
			'fecha_finalizacion' => 'required|date'
		]);

		$source = Socios::find(1);
		$source->nombre = $request->nombre;
		$source->apellido_paterno = $request->apellido_paterno;
		$source->apellido_materno = $request->apellido_materno;
		$source->nombre_completo = $request->nombre_completo;
		$source->telefono = $request->telefono;
		$source->fecha_inicio = $request->fecha_inicio;
		$source->fecha_finalizacion = $request->fecha_finalizacion;
		$source->status = $request->status;
		$source->save();
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Int $id)
	{
		Socios::find($id)->delete();
	}

	public function getSocio(Request $request)
	{
		$data = Socios::find($request->id);

		return response(['socio' => $data], 200);
	}
}
