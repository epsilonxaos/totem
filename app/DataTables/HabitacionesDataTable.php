<?php

namespace App\DataTables;

use App\Models\Habitaciones;
use App\Providers\PermissionKey;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class HabitacionesDataTable extends DataTable
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
			->addColumn('acciones', function (Habitaciones $habitaciones) {

				$acciones = '<div class="flex items-start justify-center mx-auto" style="min-width: 100px">';

				if (auth()->user()->hasPermissionTo(PermissionKey::Habitaciones['permissions']['update']['name'])) {


					$acciones .= '
						<a  href="' . route("panel.habitaciones.edit", ["id" => $habitaciones->id]) . '" class="font-medium text-emerald-600 dark:text-emerald-500 mr-2" title="Editar">
							<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
								<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
								<path d="M16 5l3 3"></path>
							</svg>
						</a>';

					$acciones .= '
						<a  href="' . route("panel.habitaciones.galeria.acciones", ['accion' => 'edit', 'id' => $habitaciones->uid]) . '" class="font-medium text-emerald-600 dark:text-emerald-500 mr-2" title="Editar recursos">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#65a30d" d="m22.7 14.3l-1 1l-2-2l1-1c.1-.1.2-.2.4-.2c.1 0 .3.1.4.2l1.3 1.3c.1.2.1.5-.1.7M13 19.9V22h2.1l6.1-6.1l-2-2l-6.2 6m-1.79-4.07l-1.96-2.36L6.5 17h6.62l2.54-2.45l-1.7-2.26l-2.75 3.54M11 19.9v-.85l.05-.05H5V5h14v6.31l2-1.93V5a2 2 0 0 0-2-2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h6v-1.1Z"/></svg>
						</a>';
				}

				if (auth()->user()->hasPermissionTo(PermissionKey::Socios['permissions']['destroy']['name'])) {
					$acciones .= '
						<form action="' . route("panel.habitaciones.destroy", ["id" => $habitaciones->id]) . '" method="post" class="inline delete-form-' . $habitaciones->id . '">
							<input type="hidden" name="_token" value="' . csrf_token() . '" />
							<input type="hidden" name="_method" value="DELETE">
							<button title="Eliminar" type="button" onclick="deleteSubmitForm(' . $habitaciones->id . ')" class="font-medium text-pink-600 dark:text-pink-500">
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
			->rawColumns(['acciones', 'membresia']);
	}

	/**
	 * Get the query source of dataTable.
	 */
	public function query(Habitaciones $model): QueryBuilder
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
			Column::make('title'),
			Column::computed('acciones')
				->exportable(false)
				->printable(false)
				->width(150)
				->addClass('text-center')
		];
	}

	/**
	 * Get the filename for export.
	 */
	protected function filename(): string
	{
		return 'Habitaciones_' . date('YmdHis');
	}
}
