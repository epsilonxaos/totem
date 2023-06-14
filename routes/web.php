<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\DaypassController;
use App\Http\Controllers\OrdenController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservacionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SociosController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::view('/', 'welcome')->where('path', '.*');
Route::view('/restaurante', 'welcome')->where('path', '.*');
Route::view('/membresia', 'welcome')->where('path', '.*');
Route::view('/politicas', 'welcome')->where('path', '.*');
Route::view('/daypass', 'welcome')->where('path', '.*');
Route::view('/daypass/orden', 'welcome')->where('path', '.*');
Route::view('/daypass/socio', 'welcome')->where('path', '.*');
Route::view('/resumen/{folio}', 'welcome')->where('path', '.*');
Route::view('/membresia/passwordRecovery/{correo}/{token}', 'welcome')->where('path', '.*');

Route::get('/daypass/reservacion/pdf/{folio}', [AppController::class, 'pdfGenerate']);

Route::get('/dashboard', function () {
	return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('guest')->prefix('/admin')->group(function () {
	Route::get('/', [AdminController::class, 'iniciarSesionView'])->name('panel.access');
	Route::post('/login', [AdminController::class, 'login'])->name('panel.login');
	Route::get('/register', [AdminController::class, 'registrarAdmin'])->name('panel.register');
});

Route::middleware(['auth:admin', 'verified'])->prefix('/admin')->group(function () {
	Route::post('/logout', [AdminController::class, 'logout'])->name('panel.logout');
	Route::get('/dashboard', [AdminController::class, 'dashboardAdmin'])->name('panel.dashboard');

	//Roles
	Route::prefix('/roles')->group(function () {
		Route::get('/', [RoleController::class, 'index'])->name('panel.roles.index');
		Route::get('/nuevo', [RoleController::class, 'create'])->name('panel.roles.create');
		Route::get('/editar/{id}', [RoleController::class, 'edit'])->name('panel.roles.edit');
		Route::post('/store', [RoleController::class, 'store'])->name('panel.roles.store');
		Route::put('/update/{id}', [RoleController::class, 'update'])->name('panel.roles.update');
		Route::delete('/destroy/{id}', [RoleController::class, 'destroy'])->name('panel.roles.destroy');
	});


	Route::prefix('/perfil')->group(function () {
		Route::get('/', [AdminController::class, 'editProfile'])->name('panel.profile.edit');
		Route::patch('/update', [AdminController::class, 'updateProfile'])->name('panel.profile.update');
		Route::put('/update/password', [AdminController::class, 'updateProfilePassword'])->name('panel.profile.update.password');
		Route::delete('/destroy', [AdminController::class, 'destroyProfile'])->name('panel.profile.destroy');
	});

	Route::prefix('/usuarios')->group(function () {
		Route::get('/', [AdminController::class, 'index'])->name('panel.usuarios.index');
		Route::get('/create', [AdminController::class, 'create'])->name('panel.usuarios.create');
		Route::post('/store', [AdminController::class, 'store'])->name('panel.usuarios.store');
		Route::get('/edit/{id?}', [AdminController::class, 'editProfileId'])->name('panel.usuarios.edit');
		Route::patch('/update/{id?}', [AdminController::class, 'updateProfile'])->name('panel.usuarios.update');
		Route::put('/update/{id?}/password', [AdminController::class, 'updateProfilePassword'])->name('panel.usuarios.update.password');
		Route::delete('/destroy/{id?}', [AdminController::class, 'destroyProfile'])->name('panel.usuarios.destroy');
	});

	// Ordenes
	Route::prefix('/ordenes')->group(function () {
		Route::get('/', [OrdenController::class, 'index'])->name('panel.orden.index');
	});

	// Reservaciones
	Route::prefix('/reservaciones')->group(function () {
		Route::get('/', [ReservacionController::class, 'index'])->name('panel.reservacion.index');
		Route::get('/calendar', [ReservacionController::class, 'calendar'])->name('panel.reservacion.calendar');
		Route::get('/create', [ReservacionController::class, 'create'])->name('panel.reservacion.create');
		Route::get('/create/socio', [ReservacionController::class, 'createSocio'])->name('panel.reservacion.create_socio');
		Route::get('/show/{id}', [ReservacionController::class, 'show'])->name('panel.reservacion.show');
		Route::post('/list', [ReservacionController::class, 'list'])->name('panel.reservacion.list');
		Route::post('/asistencia', [ReservacionController::class, 'changeAsistencia'])->name('panel.reservacion.asistencia');
		Route::get('/show/pdf/{folio}', [AppController::class, 'pdfGenerate'])->name('panel.reservacion.show.pdf');
		Route::get('/edit/{id}', [ReservacionController::class, 'edit'])->name('panel.reservacion.edit');
		Route::post('/update/{id}', [ReservacionController::class, 'update'])->name('panel.reservacion.update');
	});

	// Socios
	Route::prefix('/socios')->group(function () {
		Route::get('/', [SociosController::class, 'index'])->name('panel.socios.index');
		Route::get('/create', [SociosController::class, 'create'])->name('panel.socios.create');
		Route::post('/create/store', [SociosController::class, 'store'])->name('panel.socios.store');
		Route::get('/edit/{id}', [SociosController::class, 'edit'])->name('panel.socios.edit');
		Route::put('/update/{id}', [SociosController::class, 'update'])->name('panel.socios.update');
		Route::delete('/destroy/{id}', [SociosController::class, 'destroy'])->name('panel.socios.destroy');
		Route::post('/change/status', [SociosController::class, 'changeStatus'])->name('panel.socios.changeStatus');
	});

	// Daypass
	Route::prefix('/daypass')->group(function () {
		Route::get('/edit', [DaypassController::class, 'edit'])->name('panel.daypass.edit');
		Route::put('/update', [DaypassController::class, 'update'])->name('panel.daypass.update');
	});
});

require __DIR__ . '/auth.php';
