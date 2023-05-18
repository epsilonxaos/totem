<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('daypass', function (Blueprint $table) {
			$table->id();
			$table->integer('limite_total')->default(50);
			$table->integer('limite_publico')->default(0);
			$table->integer('limite_socios')->default(0);
			$table->decimal('precio_adultos');
			$table->decimal('precio_ninos');
			$table->decimal('precio_ninos_menores');
			$table->string('moneda')->default('MXN');
			$table->decimal('maximo_pago_tarjeta')->default(8000);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('daypass');
	}
};
