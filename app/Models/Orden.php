<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orden extends Model
{
	use HasFactory;

	protected $table = 'orden';
	protected $primaryKey = 'id';
	protected $fillable = [
		'socio_id',
		'compra',
		'folio',
		'nombre',
		'apellido_paterno',
		'apellido_materno',
		'nombre_completo',
		'correo',
		'telefono',
		'p_adultos',
		'p_ninos',
		'p_ninos_menores',
		'total',
		'is_socio',
		'pago_metodo',
		'pago_realizado',
		'pago_referencia',
		'fecha_reservacion',
		'status'
	];
}
