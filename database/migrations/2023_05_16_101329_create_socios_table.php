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
		Schema::create('socios', function (Blueprint $table) {
			$table->id();
			$table->string('nombre');
			$table->string('apellido_paterno');
			$table->string('apellido_materno')->nullable();
			$table->string('nombre_completo');
			$table->string('correo')->unique();
			$table->string('telefono', 20);
			$table->text('token_access');
			$table->date('fecha_inicio');
			$table->date('fecha_finalizacion');
			$table->tinyInteger('status')->default(1);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('socios');
	}
};
