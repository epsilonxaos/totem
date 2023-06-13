<?php

namespace Database\Seeders;

use App\Models\Socios;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SociosSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		Socios::factory(5)->create();
	}
}
