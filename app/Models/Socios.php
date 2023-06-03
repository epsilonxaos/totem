<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socios extends Model
{
	use HasFactory;

	protected $table = 'socios';
	protected $primaryKey = 'id';
	protected $fillable = [
		'nombre',
		'apellido_paterno',
		'apellido_materno',
		'nombre_completo',
		'correo',
		'telefono',
		'password',
		'fecha_inicio',
		'token',
		'fecha_finalizacion',
		'status'
	];
}
