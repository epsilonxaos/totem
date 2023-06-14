<?php

namespace App\DataTables;

use App\Helpers\Helpers;
use App\Models\Reservacion;
use App\Models\Reservacione;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class ReservacionesDataTable extends DataTable
{
	/**
	 * Build the DataTable class.
	 *
	 * @param QueryBuilder $query Results from query() method.
	 */
	public function dataTable(QueryBuilder $query): EloquentDataTable
	{
		return (new EloquentDataTable($query))
			->setRowId('ID')
			->addColumn('socio', function (Reservacion $reservacion) {
				if ($reservacion->socio_id) {
					return '<a title="Ver info" href="' . route("panel.reservacion.show", ["id" => $reservacion->id]) . '" class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-xs px-2 py-1 mr-2 inline-flex items-center justify-center" style="width: 36px">
						<svg class="icon icon-tabler icon-tabler-user-search w-[20px] mx-auto inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
							<path d="M6 21v-2a4 4 0 0 1 4 -4h1.5"></path>
							<path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
							<path d="M20.2 20.2l1.8 1.8"></path>
						</svg>
					</a>';
				}
			})
			->addColumn('fecha_reservacion', function (Reservacion $reservacion) {
				return Helpers::dateSpanishComplete($reservacion->fecha_reservacion);
			})
			->addColumn('acciones', function (Reservacion $reservacion) {
				$acciones = '';

				if (auth()->user()->hasDirectPermission(PermissionKey::Socios['permissions']['show']['name'])) {
					$acciones .= '
						<a href="' . route("panel.reservacion.show", ["id" => $reservacion->id]) . '" class="font-medium text-blue-600 dark:text-blue-500 " title="Ver detalle">
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

				if (auth()->user()->hasDirectPermission(PermissionKey::Socios['permissions']['update']['name'])) {
					$acciones .= '
						<a href="' . route("panel.reservacion.edit", ["id" => $reservacion->id]) . '" class="font-medium text-orange-600 dark:text-orange-500 " title="Editar">
							<svg class="w-5 inline" aria-hidden="true"
								fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
						</a>';
				}

				return $acciones;
			})
			->rawColumns(['socio', 'acciones']);
	}

	/**
	 * Get the query source of dataTable.
	 */
	public function query(Reservacion $model): QueryBuilder
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
			->orderBy(0)
			->parameters([
				'info' => true,
				"lengthMenu" => [10, 25, 50, 75, 100],
				'language' => [
					'url' => url('/plugins/es-ES.json')
				],
			])
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

			Column::make('id')->searchable(true),
			Column::computed('socio')->searchable(false)
				->exportable(false)
				->printable(false)
				->addClass('text-center'),
			Column::make('folio'),
			Column::make('nombre_completo')->searchable(true),
			Column::make('fecha_reservacion')->searchable(true)->data('fecha_reservacion')->name('fecha_reservacion'),
			Column::computed('acciones')->searchable(false)
				->exportable(false)
				->printable(false)
				->addClass('text-center'),
		];
	}

	/**
	 * Get the filename for export.
	 */
	protected function filename(): string
	{
		return 'Reservaciones_' . date('YmdHis');
	}
}
