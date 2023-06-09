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
		'fechas_excluidas',
		'precio_adultos',
		'precio_ninos',
		'precio_ninos_menores',
		'moneda',
		'limite_compra_personas',
		'limite_invitados_socios',
		'maximo_pago_tarjeta',
	];
}
