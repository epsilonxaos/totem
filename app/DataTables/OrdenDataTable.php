<?php

namespace App\DataTables;

use App\Helpers\Helpers;
use App\Models\Orden;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class OrdenDataTable extends DataTable
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
			->addColumn('reservacion', function (Orden $orden) {
				if ($orden->reservacion_id) {
					return '<a title="Ver info"
						href="' . route("panel.reservacion.show", ["id" => $orden->reservacion_id]) . '"
						class="text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-lg text-xs px-2 pl-1 py-1 mr-2 inline-flex items-center justify-center" style="width: 60px">
						<svg xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-info-small w-[20px] inline-block mr-1"
							width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
							fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path
								d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
								stroke-width="0" fill="currentColor"></path>
						</svg>
						Ver
					</a>';
				}
			})
			->addColumn('total', function (Orden $orden) {
				return $orden->total > 0 ? '$' . $orden->total . 'MXN' : '--';
			})
			->addColumn('metodo_pago', function (Orden $orden) {
				return $orden->pago_metodo === 'incluido' ? 'Membresía Club' : ucfirst($orden->pago_metodo);
			})
			->addColumn('pago_realizado', function (Orden $orden) {
				return ucfirst($orden->pago_realizado);
			})
			->addColumn('estado', function (Orden $orden) {
				$leyenda = Helpers::leyendaStatusOrden($orden->status);

				$tag = '';

				switch ($leyenda["color"]) {
					case 'yellow':
						$tag = '<span
							class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">' . $leyenda["estado"] . '</span>';
						break;

					case 'green':
						$tag = '<span
							class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">' . $leyenda["estado"] . '</span>';
						break;

					case 'orange':
						$tag = '<span
							class="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">' . $leyenda["estado"] . '</span>';
						break;

					case 'red':
						$tag = '<span
							class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">' . $leyenda["estado"] . '</span>';
						break;

					case 'indigo':
						$tag = '<span
							class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">' . $leyenda["estado"] . '</span>';
						break;
				}

				return $tag;
			})
			->rawColumns(['reservacion', 'total', 'metodo_pago', 'pago_realizado', 'estado']);
	}

	/**
	 * Get the query source of dataTable.
	 */
	public function query(Orden $model): QueryBuilder
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
			Column::make('id'),
			Column::computed('reservacion')
				->exportable(false)
				->printable(false),
			Column::computed('total')
				->exportable(false)
				->printable(false),
			Column::computed('metodo_pago')
				->exportable(false)
				->printable(false),
			Column::computed('pago_realizado')
				->exportable(false)
				->printable(false),
			Column::make('pago_referencia'),
			Column::computed('estado')
				->exportable(false)
				->printable(false),
		];
	}

	/**
	 * Get the filename for export.
	 */
	protected function filename(): string
	{
		return 'Orden_' . date('YmdHis');
	}
}
