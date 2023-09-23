<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Websites extends Model
{
	use HasFactory;

	protected $table = 'websites';
	protected $primaryKey = 'id';
	protected $fillable = ['menu'];
}
