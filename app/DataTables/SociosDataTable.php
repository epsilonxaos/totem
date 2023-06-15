<?php

namespace App\DataTables;

use App\Helpers\Helpers;
use App\Models\Socios;
use App\Providers\PermissionKey;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class SociosDataTable extends DataTable
{
	/**
	 * Build the DataTable class.
	 *
	 * @param QueryBuilder $query Results from query() method.
	 */
	public function dataTable(QueryBuilder $query): EloquentDataTable
	{
		return (new EloquentDataTable($query))
			->setRowId('id')
			->addColumn('acciones', function (Socios $socio) {

				$acciones = '<div class="flex items-start justify-center mx-auto" style="min-width: 100px">';

				if (auth()->user()->hasAllPermissions([PermissionKey::Socios['permissions']['edit']['name'], PermissionKey::Socios['permissions']['update']['name']])) {
					$acciones .= '
						<a  href="' . route("panel.socios.edit", ["id" => $socio->id]) . '" class="font-medium text-emerald-600 dark:text-emerald-500 mr-2" title="Editar">
							<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
								<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
								<path d="M16 5l3 3"></path>
							</svg>
						</a>';
				} else {
					if (auth()->user()->hasPermissionTo(PermissionKey::Socios['permissions']['edit']['name'])) {
						$acciones .= '
							<a href="' . route("panel.socios.edit", ["id" => $socio->id]) . '" class="font-medium text-blue-600 dark:text-blue-500 mr-2" title="Ver detalle">
								<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
									<path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
									<path d="M3 6l0 13"></path>
									<path d="M12 6l0 13"></path>
									<path d="M21 6l0 13"></path>
								</svg>
							</a>';
					}
				}

				if (auth()->user()->hasPermissionTo(PermissionKey::Socios['permissions']['destroy']['name'])) {
					$acciones .= '
						<form action="' . route("panel.socios.destroy", ["id" => $socio->id]) . '" method="post" class="inline delete-form-' . $socio->id . '">
							<input type="hidden" name="_token" value="' . csrf_token() . '" />
							<input type="hidden" name="_method" value="DELETE">
							<button title="Eliminar" type="button" onclick="deleteSubmitForm(' . $socio->id . ')" class="font-medium text-pink-600 dark:text-pink-500">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M4 7l16 0"></path>
									<path d="M10 11l0 6"></path>
									<path d="M14 11l0 6"></path>
									<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
									<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
								</svg>
							</button>
						</form>';
				}

				$acciones .= '</div>';

				return $acciones;
			})
			->addColumn('fecha_inicio', function (Socios $socios) {
				return Helpers::dateSpanishShort($socios->fecha_inicio);
			})
			->addColumn('fecha_finalizacion', function (Socios $socios) {
				return Helpers::dateSpanishShort($socios->fecha_finalizacion);
			})
			->addColumn('membresia', function (Socios $socios) {
				if ($socios->fecha_finalizacion >= now()) {
					return '<span
					class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Activo</span>';
				} else {
					return '<span
					class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Expirada</span>';
				}
			})
			->rawColumns(['acciones', 'membresia']);
	}

	/**
	 * Get the query source of dataTable.
	 */
	public function query(Socios $model): QueryBuilder
	{
		return $model->newQuery();
	}

	/**
	 * Optional method if you want to use the html builder.
	 */
	public function html(): HtmlBuilder
	{
		return $this->builder()
			->columns($this->getColumns())
			->minifiedAjax()
			->parameters([
				'info' => true,
				"lengthMenu" => [10, 25, 50, 75, 100],
				'language' => [
					'url' => url('/plugins/es-ES.json')
				],
			])
			->orderBy(0) //Indice de las colunmas -> 0 = ID
			->selectStyleSingle()
			->buttons([
				// Button::make('excel'),
				// Button::make('csv'),
				// Button::make('pdf'),
				// Button::make('print'),
				// Button::make('reset'),
				// Button::make('reload')
			]);
	}

	/**
	 * Get the dataTable columns definition.
	 */
	public function getColumns(): array
	{
		return [
			Column::make('id'),
			Column::make('nombre_completo'),
			// Column::make('correo'),
			Column::make('fecha_inicio'),
			Column::make('fecha_finalizacion'),
			Column::computed('membresia')
				->exportable(false)
				->printable(false)
				->addClass('text-center'),
			Column::computed('acciones')
				->exportable(false)
				->printable(false)
				->width(150)
				->addClass('text-center'),
		];
	}

	/**
	 * Get the filename for export.
	 */
	protected function filename(): string
	{
		return 'Socios_' . date('YmdHis');
	}
}
