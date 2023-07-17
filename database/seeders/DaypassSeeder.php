<?php

namespace Database\Seeders;

use App\Models\Daypass;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DaypassSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$fechasExcluidas = []; // Ejemplo de fechas excluidas

		Daypass::create([
			'limite_total' => 100,
			'precio_adultos' => 300,
			'precio_ninos' => 150,
			'precio_ninos_menores' => 0,
			'moneda' => 'MXN',
			'maximo_pago_tarjeta' => 5000,
			'fechas_excluidas' => json_encode($fechasExcluidas)
		]);
	}
}
