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
		Schema::create('habitaciones', function (Blueprint $table) {
			$table->id();
			$table->string('uid')->nullable();
			$table->string('title');
			$table->longText('description');
			$table->string('link')->nullable();
			$table->timestamps();
		});

		Schema::create('galerias', function (Blueprint $table) {
			$table->id();
			$table->string('uid');
			$table->string('cover');
			$table->string('order')->nullable();
			$table->string('status')->default(1);
			$table->timestamps();
		});

		Schema::create('amenidades', function (Blueprint $table) {
			$table->id();
			$table->string('uid');
			$table->string('cover');
			$table->string('title')->nullable();
			$table->string('order')->nullable();
			$table->string('status')->default(1);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('habitaciones');
		Schema::dropIfExists('galerias');
		Schema::dropIfExists('amenidades');
	}
};
