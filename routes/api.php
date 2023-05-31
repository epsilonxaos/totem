<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\ConektaController;
use App\Http\Controllers\MovimientosController;
use App\Http\Controllers\SociosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
	return $request->user();
});
Route::get('/webhook', [ConektaController::class, 'webhook']);
Route::post('/webhook', [ConektaController::class, 'webhook']);

Route::get('/inicial', [AppController::class, 'documentoInicial']);
Route::post('/disponibilidad/daypass', [MovimientosController::class, 'verificarDisponibilidad']);
Route::post('/pago', [CompraController::class, 'compraConekta']);
Route::post('/resumen', [AppController::class, 'obtenerOrden']);
Route::post('/socio', [SociosController::class, 'getSocio']);
Route::post('/socio/login', [AppController::class, 'validarSocio']);
Route::post('/socio/recuperarPassword', [AppController::class, 'recuperarPasswordSocio']);
Route::post('/socio/reservacion', [CompraController::class, 'compraSocios']);
Route::post('/admin/reservacion', [CompraController::class, 'compraAdmin']);
