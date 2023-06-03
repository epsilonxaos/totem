<?php

namespace Database\Factories;

use App\Models\Socios;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Socios>
 */
class SociosFactory extends Factory
{

	protected $model = Socios::class;
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'nombre' => fake()->name(),
			'apellido_paterno' => fake()->firstName(),
			'apellido_materno' => fake()->lastName(),
			'nombre_completo' => fake()->name(),
			'correo' => fake()->unique()->safeEmail(),
			'telefono' => fake()->phoneNumber(),
			'password' => Hash::make('password'),
			'fecha_inicio' => now(),
			'token' => Str::random(10),
			'fecha_finalizacion' => '2023-12-12',
			'status' => 1
		];
	}
}
