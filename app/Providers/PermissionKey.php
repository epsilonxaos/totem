<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * ConstantExport Trait implementa el método getConstants() el cual nos permite
 * regresar las constantes de la clase como un array asociativo
 */
trait ConstantExport
{
	/**
	 * @return [const_name => 'value', ...]
	 */
	static function getConstants()
	{
		$refl = new \ReflectionClass(__CLASS__);
		return $refl->getConstants();
	}
}

class PermissionKey extends ServiceProvider
{
	use ConstantExport;

	const Admin = [
		'name' => 'Módulo administradores',
		'permissions' => [
			'index' => [
				'display_name' => 'Ver modulo',
				'name' => 'admins.index'
			],
			'create' => [
				'display_name' => 'Creación',
				'name' => 'admins.create'
			],
			'edit' => [
				'display_name' => 'Ver detalles',
				'name' => 'admins.edit'
			],
			'update' => [
				'display_name' => 'Modificar',
				'name' => 'admins.update'
			],
			'destroy' => [
				'display_name' => 'Eliminar',
				'name' => 'admins.destroy'
			],
		]
	];

	const Role = [
		'name' => 'Módulo roles',
		'permissions' => [
			'index' => [
				'display_name' => 'Ver modulo',
				'name' => 'roles.index'
			],
			'create' => [
				'display_name' => 'Creación',
				'name' => 'roles.create'
			],
			'edit' => [
				'display_name' => 'Ver detalles',
				'name' => 'roles.edit'
			],
			'update' => [
				'display_name' => 'Modificar',
				'name' => 'roles.update'
			],
			'destroy' => [
				'display_name' => 'Eliminar',
				'name' => 'roles.destroy'
			],
		]
	];

	const Socios = [
		'name' => 'Módulo Socios',
		'permissions' => [
			'index' => [
				'display_name' => 'Ver modulo',
				'name' => 'socios.index'
			],
			'create' => [
				'display_name' => 'Creación',
				'name' => 'socios.create'
			],
			'edit' => [
				'display_name' => 'Ver detalles',
				'name' => 'socios.edit'
			],
			'update' => [
				'display_name' => 'Modificar',
				'name' => 'socios.update'
			],
			'destroy' => [
				'display_name' => 'Eliminar',
				'name' => 'socios.destroy'
			],
		]
	];

	const Daypass = [
		'name' => 'Módulo Daypass',
		'permissions' => [
			'index' => [
				'display_name' => 'Ver modulo',
				'name' => 'daypass.index'
			],
			'edit' => [
				'display_name' => 'Ver detalles',
				'name' => 'daypass.edit'
			],
			'update' => [
				'display_name' => 'Modificar',
				'name' => 'daypass.update'
			],
		]
	];

	const Ordenes = [
		'name' => 'Módulo Ordenes',
		'permissions' => [
			'index' => [
				'display_name' => 'Ver modulo',
				'name' => 'ordenes.index'
			]
		]
	];

	const Reservaciones = [
		'name' => 'Módulo Reservaciones',
		'permissions' => [
			'index' => [
				'display_name' => 'Ver modulo',
				'name' => 'reservacion.index'
			],
			'create' => [
				'display_name' => 'Creación',
				'name' => 'reservacion.create'
			],
			'show' => [
				'display_name' => 'Ver detalles',
				'name' => 'reservacion.edit'
			],
			'update' => [
				'display_name' => 'Modificar',
				'name' => 'reservacion.update'
			]
			// 'cancelation' => [
			// 	'display_name' => 'Cancelación',
			// 	'name' => 'reservacion.cancelation'
			// ]
		]
	];

	const Calendario = [
		'name' => 'Módulo Calendario',
		'permissions' => [
			'index' => [
				'display_name' => 'Ver modulo',
				'name' => 'calendario.index'
			],
			'asistencia' => [
				'display_name' => 'Ver Asistencia',
				'name' => 'calendario.asistencia'
			],
			'update' => [
				'display_name' => 'Modificar',
				'name' => 'calendario.update'
			]
		]
	];
}
