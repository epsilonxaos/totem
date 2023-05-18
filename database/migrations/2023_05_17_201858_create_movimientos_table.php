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
        Schema::create('movimientos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('daypass_id');
            $table->unsignedBigInteger('orden_id');
            $table->unsignedBigInteger('socio_id')->nullable();
            $table->date('fecha_reservacion');
            $table->decimal('precio_adulto')->nullable();
            $table->decimal('precio_ninio')->nullable();
            $table->decimal('precio_ninio_menor')->nullable();
            $table->integer('cantidad');
            $table->timestamps();

            $table->foreign('daypass_id')
                ->references('id')
                ->on('daypass');
            $table->foreign('orden_id')
                ->references('id')
                ->on('orden');
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
        Schema::dropIfExists('movimientos');
    }
};
