<?php

use App\Http\Controllers\CompraController;
use App\Http\Controllers\ConektaController;
use App\Http\Controllers\MovimientosController;
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
Route::post('/disponibilidad/daypass', [MovimientosController::class, 'verificarDisponibilidad']);
Route::post('/pago', [CompraController::class, 'compraConekta']);
Route::get('/webhook', [ConektaController::class, 'webhook']);
Route::post('/webhook', [ConektaController::class, 'webhook']);
