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
		'reservacion_id',
		'daypass_id',
		'total',
		'pago_metodo',
		'pago_realizado',
		'pago_referencia',
		'status'
	];
}
