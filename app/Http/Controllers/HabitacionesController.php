<?php

namespace App\Http\Controllers;

use App\DataTables\HabitacionesDataTable;
use App\Helpers\Helpers;
use App\Models\Amenidades;
use App\Models\Galerias;
use App\Models\Habitaciones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class HabitacionesController extends Controller

{
	protected $dirGaleria = "public/galerias";
	protected $dirAmenidades = "public/amenidades";
	/**
	 * Display a listing of the resource.
	 */
	public function index(HabitacionesDataTable $dataTable)
	{
		return $dataTable->render('panel.habitaciones.index', [
			"title" => "Habitaciones",
			"breadcrumb" => [
				[
					'title' => 'Habitaciones',
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
		return view('panel.habitaciones.create', [
			"title" => "Nueva habitación",
			"breadcrumb" => [
				[
					'title' => 'Habitaciones',
					'route' => 'panel.habitaciones.index',
					'active' => false,
				],
				[
					'title' => 'Nueva habitación',
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
		$room = Habitaciones::create([
			'title' => $request->title,
			'description' => $request->description,
			'link' => $request->link,
		]);

		$room->uid = Str::uuid()->toString();
		$room->save();

		return redirect()->route('panel.habitaciones.galeria.acciones', ['accion' => 'create', 'id' => $room->uid])->with('success', 'Registro creado correctamente!');
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function createGallery(String $accion, String $id)
	{
		if ($accion === 'edit') {
			$nameProduct = Habitaciones::select('title')->where('uid', $id)->first();
		}

		$info = [
			'title' => 'Galeria',
			'breadcrumb' => [
				[
					'title' => 'Habitaciones',
					'route' => 'panel.habitaciones.index',
					'active' => false
				],
				[
					'title' => ($accion === 'edit') ? 'Editar recursos - ' . $nameProduct->nombre : 'Nuevos recursos',
					'route' => ($accion === 'edit') ? 'panel.habitaciones.edit' : 'panel.habitaciones.create',
					'active' => false,
					'params' => ($accion === 'edit') ? ['id' => $id] : ''
				],
				[
					'title' => 'Recursos',
					'route' => 'panel.habitaciones.galeria.acciones',
					'active' => true,
					'params' => [
						'accion' => $accion,
						'id' => $id
					]
				]
			],
			'galeria' => Galerias::where('uid', $id)->orderBy('order', 'asc')->get(),
			'amenidades' => Amenidades::where('uid', $id)->orderBy('order', 'asc')->get(),
			'id' => $id,
			'accion' => $accion
		];
		return view('panel.habitaciones.galeria.index', $info);
	}

	public function storeGaleria(Request $request)
	{
		$input = $request->all();
		$rules = [
			'file' => 'mimes:jpeg,jpg,png|max:1024'
		];

		$validation = Validator::make($input, $rules);

		if ($validation->fails()) {
			return Response::json('Limite de peso excedido', 400);
		}

		$file = $request->file('file');
		$cover = Helpers::addFileStorage($file, $this->dirGaleria);
		$add = new Galerias();
		$add->cover = $cover;
		$add->uid = $request->id;
		$add->save();
		$add->order = $add->id;
		$add->save();

		return Response::json('success', 200);
	}
	public function storeAmenidades(Request $request)
	{
		$input = $request->all();
		$rules = [
			'file' => 'mimes:jpeg,jpg,png,svg|max:500'
		];

		$validation = Validator::make($input, $rules);

		if ($validation->fails()) {
			return Response::json('Limite de peso excedido', 400);
		}

		$file = $request->file('file');
		$cover = Helpers::addFileStorage($file, $this->dirAmenidades);
		$add = new Amenidades();
		$add->cover = $cover;
		$add->title = $request->title;
		$add->uid = $request->id;
		$add->save();
		$add->order = $add->id;
		$add->save();

		return Response::json('success', 200);
	}

	public function deleteOnlyImgGallery(Request $request)
	{
		Helpers::deleteFileStorage('galerias', 'cover', $request->id);
		Galerias::where('id', $request->id)->delete();

		return 'true';
	}

	/**
	 * Reording files gallery
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function ordenamientoGaleria(Request $request)
	{
		$orden = $request->toArray();
		foreach ($orden as $key => $val) {
			$gal = Galerias::find($val['id']);
			$gal->order = $val['orden'];
			$gal->save();
		}

		return 'true';
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Habitaciones $habitaciones)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Int $id)
	{
		$source = Habitaciones::find($id);

		return view('panel.habitaciones.edit', [
			"title" => "Editar habitación",
			"breadcrumb" => [
				[
					'title' => 'Habitaciones',
					'route' => 'panel.habitaciones.index',
					'active' => false,
				],
				[
					'title' => 'Editar habitación',
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
		$source = Habitaciones::find($id);

		$source->title = $request->title;
		$source->description = $request->description;
		$source->link = $request->link;
		$source->save();
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Int $id)
	{
		$source = Habitaciones::find($id);
		$galerias = Galerias::where('uid', $source->uid)->get();
		$amenidades = Amenidades::where('uid', $source->uid)->get();
		foreach ($galerias as $key => $g) {
			Helpers::deleteFileStorage('galerias', 'img', $g->id);
			$g->delete();
		}
		foreach ($amenidades as $key => $a) {
			Helpers::deleteFileStorage('amenidades', 'img', $a->id);
			$a->delete();
		}
		$source->delete();

		return redirect()->back()->with('success', 'Los datos se han eliminado correctamente');
	}
}
