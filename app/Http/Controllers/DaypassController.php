<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use Illuminate\Http\Request;

class DaypassController extends Controller
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
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Daypass $daypass)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit()
	{
		$source = Daypass::find(1);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Daypass $daypass)
	{
		$source = Daypass::find(1);
		$source->limite_total = $request->limite_total;
		$source->limite_publico = $request->limite_publico;
		$source->limite_socios = $request->limite_socios;
		$source->precio_adultos = $request->precio_adultos;
		$source->precio_ninos = $request->precio_ninos;
		$source->precio_ninos_menores = $request->precio_ninos_menores;
		$source->moneda = $request->moneda;
		$source->maximo_pago_tarjeta = $request->maximo_pago_tarjeta;
		$source->save();
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Daypass $daypass)
	{
		//
	}
}
