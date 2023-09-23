<?php

namespace Database\Seeders;

use App\Models\Websites;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WebsiteSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		Websites::truncate();
		Websites::create([
			'menu' => "",
		]);
	}
}
