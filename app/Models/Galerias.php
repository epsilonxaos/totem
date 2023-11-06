<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galerias extends Model
{
	use HasFactory;
	protected $table = 'galerias';
	protected $primaryKey = 'id';
	protected $fillable = [
		'uid',
		'cover',
		'order',
		'status',
	];
}
