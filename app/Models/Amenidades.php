<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amenidades extends Model
{
	use HasFactory;
	protected $table = 'amenidades';
	protected $primaryKey = 'id';
	protected $fillable = [
		'uid',
		'cover',
		'title',
		'order',
		'status',
	];
}
