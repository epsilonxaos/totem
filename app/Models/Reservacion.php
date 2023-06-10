<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservacion extends Model
{
	use HasFactory;

	protected $table = 'reservacions';
	protected $primaryKey = 'id';
	protected $fillable = [
		'socio_id',
		'folio',
		'nombre',
		'apellido_paterno',
		'apellido_materno',
		'nombre_completo',
		'correo',
		'telefono',
		'fecha_reservacion',
		'p_adultos',
		'p_ninos',
		'p_ninos_menores',
		'pay_adultos',
		'pay_ninos',
		'is_socio',
		'asistencia',
	];
}
