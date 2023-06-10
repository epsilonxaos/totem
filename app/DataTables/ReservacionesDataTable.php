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

				return
					'<a title="Ver info" href="' . route("panel.reservacion.show", ["id" => $reservacion->id]) . '" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-2 py-1 mr-2 inline-flex items-center justify-center" style="width: 36px">
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-info w-[20px] inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
						<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
						<path d="M11 14h1v4h1"></path>
						<path d="M12 11h.01"></path>
					</svg>
				</a>
				<a title="Editar" href="' . route("panel.reservacion.edit", ["id" => $reservacion->id]) . '" class="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-xs px-2 py-1 mr-2 inline-flex items-center justify-center" style="width: 36px">
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit w-[20px] inline" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
						<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
						<path d="M16 5l3 3"></path>
					</svg>
				</a>';
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
			->orderBy(1)
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
