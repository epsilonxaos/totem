<?php

namespace Database\Seeders;

use App\Models\Socios;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SociosSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$socios = [
			[
				"nombre" => "Mary Francis",
				"nombre_completo" => "Mary Francis Reyes Garduño",
				"apellido_paterno" => "Reyes",
				"apellido_materno" => "Garduño",
				"correo" => "maryfrancisreyes@yahoo.com",
				"telefono" => "525516799165",
				"password" => " LT-3231MFRG",
				"token" => "",
				"fecha_inicio" => "2023-04-22",
				"fecha_finalizacion" => "2024-04-22",
				"lote" => "LT-3231",
			],
			[
				"nombre" => "Israel Iván",
				"nombre_completo" => "Israel Iván Mendoza Schiebeck",
				"apellido_paterno" => "Mendoza",
				"apellido_materno" => "Schiebeck",
				"correo" => "iivanmendozas@outlook.com",
				"telefono" => "526141823813",
				"password" => "LT-1590IIMS",
				"token" => "",
				"fecha_inicio" => "2023-04-22",
				"fecha_finalizacion" => "2023-05-22",
				"lote" => "LT-1590",
			],
			[
				"nombre" => "Cristina Isaura",
				"nombre_completo" => "Cristina Isaura Ramírez Vargas",
				"apellido_paterno" => "Ramírez",
				"apellido_materno" => "Vargas",
				"correo" => "cirvrava@outlook.es",
				"telefono" => "525538837542",
				"password" => "LT-2614CIRV",
				"token" => "",
				"fecha_inicio" => "2023-04-22",
				"fecha_finalizacion" => "2024-04-22",
				"lote" => "LT-2614",
			],
			[
				"nombre" => "Adriana Karen",
				"nombre_completo" => "Adriana Karen Gutiérrez Ramírez",
				"apellido_paterno" => "Gutiérrez",
				"apellido_materno" => "Ramírez",
				"correo" => "adri5_5@hotmail.com",
				"telefono" => "525539041680",
				"password" => "LT-2499AKGR",
				"token" => "",
				"fecha_inicio" => "2023-04-22",
				"fecha_finalizacion" => "2024-04-22",
				"lote" => "LT-2499",
			],
			[
				"nombre" => "Kryzia Sue",
				"nombre_completo" => "Kryzia Sue Chico Arzave",
				"apellido_paterno" => "Chico",
				"apellido_materno" => "Arzave",
				"correo" => "ksue989@hotmail.com",
				"telefono" => "525540793146",
				"password" => "LT-2642KSCA",
				"token" => "",
				"fecha_inicio" => "2023-04-22",
				"fecha_finalizacion" => "2024-04-22",
				"lote" => "LT-2642",
			],
			[
				"nombre" => "Mary",
				"nombre_completo" => "Mary Cruz Solís",
				"apellido_paterno" => "Cruz",
				"apellido_materno" => "Solís",
				"correo" => "mary.solis07@hotmail.com",
				"telefono" => "525576668833",
				"password" => "LT-2636MCS",
				"token" => "",
				"fecha_inicio" => "2023-04-04",
				"fecha_finalizacion" => "2024-04-22",
				"lote" => "LT-2636",
			],
			[
				"nombre" => "Andrés",
				"nombre_completo" => "Andrés López Castro",
				"apellido_paterno" => "López ",
				"apellido_materno" => "Castro ",
				"correo" => "andylopez07@hotmail.com",
				"telefono" => "528117630291",
				"password" => "LT-2508ALC",
				"token" => "",
				"fecha_inicio" => "2023-05-19",
				"fecha_finalizacion" => "2024-05-19",
				"lote" => "LT-2508",
			],
			[
				"nombre" => "Diana Laura",
				"nombre_completo" => "Diana Laura Castro Franco",
				"apellido_paterno" => "Castro ",
				"apellido_materno" => "Franco",
				"correo" => "diany029@gmail.com",
				"telefono" => "528182100801",
				"password" => "LT-3082DLCF",
				"token" => "",
				"fecha_inicio" => "2023-05-31",
				"fecha_finalizacion" => "2024-05-31",
				"lote" => "LT-3082",
			],
			[
				"nombre" => "Juan José",
				"nombre_completo" => "Juan José Córdova Aldana",
				"apellido_paterno" => "Córdova ",
				"apellido_materno" => "Aldana",
				"correo" => "ahau_dj@outlook.com",
				"telefono" => "529992416614",
				"password" => "LT-2580JJCA",
				"token" => "",
				"fecha_inicio" => "2023-07-12",
				"fecha_finalizacion" => "2024-07-12",
				"lote" => "LT-2580",
			]
		];

		foreach ($socios as $key => $s) {
			Socios::create([
				"nombre" => $s['nombre'],
				"apellido_paterno" => $s['apellido_paterno'],
				"apellido_materno" => $s['apellido_materno'],
				"nombre_completo" => $s['nombre_completo'],
				"correo" => $s['correo'],
				"telefono" => $s['telefono'],
				"password" => Hash::make($s['password']),
				"fecha_inicio" => $s['fecha_inicio'],
				"fecha_finalizacion" => $s['fecha_finalizacion'],
				'token' => Str::random(10),
				'status' => 1
			]);
		}
	}
}
