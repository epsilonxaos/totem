<?php

namespace App\Http\Controllers;

use App\DataTables\SociosDataTable;
use App\Helpers\Helpers;
use App\Mail\MailNewSocio;
use App\Models\Socios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class SociosController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(SociosDataTable $dataTable)
	{
		return $dataTable->render('panel.socios.index', [
			"title" => "Socios",
			"breadcrumb" => [
				[
					'title' => 'Socios',
					'active' => true,
				]
			],
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		return view('panel.socios.create', [
			"title" => "Nuevo socio",
			"breadcrumb" => [
				[
					'title' => 'Socios',
					'route' => 'panel.socios.index',
					'active' => false,
				],
				[
					'title' => 'Nuevo socio',
					'active' => true
				]
			]
		]);
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
			'contrasenia' => 'required|min:6|confirmed',
			'fecha_inicio' => 'required|date|after_or_equal:today',
			'fecha_finalizacion' => 'required|date|after_or_equal:today'
		]);

		$socio = Socios::create([
			'nombre' => $request->nombre,
			'apellido_paterno' => $request->apellido_paterno,
			'apellido_materno' => $request->apellido_materno,
			'nombre_completo' => $request->nombre . ' ' . $request->apellido_paterno . ' ' . $request->apellido_materno,
			'correo' => $request->correo,
			'telefono' => $request->telefono,
			'password' => Hash::make($request->contrasenia),
			'fecha_inicio' => $request->fecha_inicio,
			'fecha_finalizacion' => $request->fecha_finalizacion,
			'token' => Str::random(10),
			'status' => 1
		]);

		$data = [
			'nombre' => $socio->nombre,
			'nombreCompleto' => $socio->nombre_completo,
			'correo' => $socio->correo,
			'password' => $request->password,
			'fechaRegistro' => Helpers::dateSpanishComplete($socio->fecha_inicio),
			'fechaVencimiento' => Helpers::dateSpanishComplete($socio->fecha_finalizacion),
		];

		Mail::to($socio->correo)->send(new MailNewSocio($data));

		return redirect()->back()->with('success', 'Socio registrado correctamente!');
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

		return view('panel.socios.edit', [
			"title" => "Editar socio",
			"breadcrumb" => [
				[
					'title' => 'Socios',
					'route' => 'panel.socios.index',
					'active' => false,
				],
				[
					'title' => 'Editar socio',
					'active' => true
				]
			],
			'data' => $source
		]);
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

		$source = Socios::find($id);

		if ($request->has('actualizar_correo')) {
			if ($request->actualizar_correo) {
				$request->validate([
					'correo' => 'required|email|unique:socios,correo',
				]);

				$source->correo = $request->correo;
				$source->save();
			}
		}
		if ($request->has('contrasenia')) {
			if ($request->contrasenia) {
				$request->validate([
					'contrasenia' => 'required|min:6|confirmed',
				]);

				$source->password = $request->contrasenia;
				$source->save();
			}
		}

		$source->nombre = $request->nombre;
		$source->apellido_paterno = $request->apellido_paterno;
		$source->apellido_materno = $request->apellido_materno;
		$source->nombre_completo = $request->nombre . ' ' . $request->apellido_paterno . ' ' . $request->apellido_materno;
		$source->telefono = $request->telefono;
		$source->fecha_inicio = $request->fecha_inicio;
		$source->fecha_finalizacion = $request->fecha_finalizacion;
		$source->save();

		return redirect()->back()->with('success', 'Datos actualizados correctamente!');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Int $id)
	{
		Socios::find($id)->delete();

		return redirect()->back()->with('success', 'Datos eliminado correctamente!');
	}

	public function getSocio(Request $request)
	{
		$data = Socios::find($request->id);

		return response(['socio' => $data], 200);
	}


	/**
	 * Remove the specified resource from storage.
	 */
	public function changeStatus(Request $request)
	{
		//
	}
}
