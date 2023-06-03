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
		Schema::create('reservacions', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('socio_id')->nullable();
			$table->string('folio');
			$table->string('nombre')->nullable();
			$table->string('apellido_paterno')->nullable();
			$table->string('apellido_materno')->nullable();
			$table->string('nombre_completo');
			$table->string('correo');
			$table->string('telefono', 20);
			$table->date('fecha_reservacion');
			$table->integer('p_adultos')->nullable();
			$table->integer('p_ninos')->nullable();
			$table->integer('p_ninos_menores')->nullable();
			$table->integer('pay_adultos')->nullable();
			$table->integer('pay_ninos')->nullable();
			$table->boolean('is_socio')->default(false);
			$table->timestamps();

			$table->foreign('socio_id')
				->references('id')
				->on('socios');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('reservacions');
	}
};
