<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimientos extends Model
{
    use HasFactory;
    protected $table = 'movimientos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'daypass_id',
        'orden_id',
        'socio_id',
        'fecha_reservacion',
        'precio_adulto',
        'precio_ninio',
        'precio_ninio_menor',
        'cantidad',
    ];
}
