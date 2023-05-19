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
		Schema::create('orden', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('socio_id')->nullable();
			$table->unsignedBigInteger('daypass_id')->nullable();
			// $table->integer('socio_id')->unsigned();
			// $table->enum('compra', ['daypass'])->default('daypass');
			$table->string('folio');
			$table->string('nombre')->nullable();
			$table->string('apellido_paterno')->nullable();
			$table->string('apellido_materno')->nullable();
			$table->string('nombre_completo');
			$table->string('correo');
			$table->string('telefono', 12);
			$table->date('fecha_reservacion');
			$table->integer('p_adultos')->nullable();
			$table->integer('p_ninos')->nullable();
			$table->integer('p_ninos_menores')->nullable();
			$table->decimal('total')->nullable();
			$table->boolean('is_socio')->default(false);
			$table->enum('pago_metodo', ['incluido', 'tarjeta', 'efectivo'])->default('tarjeta');
			$table->enum('pago_realizado', ['website', 'club'])->default('website');
			$table->string('pago_referencia')->nullable();
			$table->tinyInteger('status');
			$table->timestamps();

			$table->foreign('socio_id')
				->references('id')
				->on('socios');
			$table->foreign('daypass_id')
				->references('id')
				->on('daypass');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('orden');
	}
};
