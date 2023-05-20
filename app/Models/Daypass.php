<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Daypass extends Model
{
	use HasFactory;
	protected $table = 'daypass';
	protected $primaryKey = 'id';
	protected $fillable = [
		'limite_total',
		'limite_publico',
		'limite_socios',
		'precio_adultos',
		'precio_ninos',
		'precio_ninos_menores',
		'moneda',
		'limite_compra_personas',
		'maximo_pago_tarjeta'
	];
}
