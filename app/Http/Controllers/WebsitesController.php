<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use App\Models\Websites;
use Illuminate\Http\Request;

class WebsitesController extends Controller
{
	protected $directorio = "public/website";
	/**
	 * Show the form for editing the specified resource.
	 */
	public function index()
	{
		$params = [
			'title' => "Configuración general",
			'breadcrumb' => [
				[
					'title' => "Configuración general",
					'active' => true,
				]
			],
			'data' => Websites::find(1)
		];

		return view('panel.website.inicio', $params);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request)
	{
		$id = 1;
		$upd = Websites::find($id);

		if ($request->hasFile('menu')) {
			Helpers::deleteFileStorage('websites', 'menu', $id);
			$menu = Helpers::addFileStorage($request->file('menu'), $this->directorio);
			$upd->menu = $menu;
			$upd->save();
		}

		$upd->save();

		return redirect()->back()->with('success', 'El registro se ha actualizado correctamente');
	}
}
