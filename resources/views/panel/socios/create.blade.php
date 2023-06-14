@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">

			@can(PermissionKey::Socios['permissions']['create']['name'])
				<form action="{{ route('panel.socios.store') }}" method="POST">
					@csrf

					<div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
						<button type="submit"
							class="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
							<svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor"
								stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
							Guardar
						</button>
					</div>

					<div class="w-full">
						<div class="bg-slate-50 p-4 rounded-md shadow-sm mb-6">
							<h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">- Información general</h2>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
								<div class="col-span-1">
									<label for="nombre"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
											class="text-red-800">*</span> Nombre</label>
									<input id="nombre" name="nombre" required autocomplete="off" value="{{ old('nombre') }}"
										class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>
								<div class="col-span-1">
									<label for="apellido_paterno"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
											class="text-red-800">*</span> Apellido paterno</label>
									<input id="apellido_paterno" name="apellido_paterno" value="{{ old('apellido_paterno') }}"
										required autocomplete="off"
										class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>
								<div class="col-span-1">
									<label for="apellido_materno"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido
										materno</label>
									<input id="apellido_materno" name="apellido_materno" value="{{ old('apellido_materno') }}"
										autocomplete="off"
										class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>
								<div class="col-span-1">
									<label for="email"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
											class="text-red-800">*</span> Correo
										electrónico</label>
									<input type="email" id="email" name="correo" required value="{{ old('correo') }}"
										autocomplete="off"
										class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="correo@prueba.com">
								</div>
								<div class="col-span-1">
									<label for="telefono"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
											class="text-red-800">*</span> Teléfono</label>
									<input type="text" id="telefono" name="telefono" value="{{ old('telefono') }}" required
										autocomplete="off"
										class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>
							</div>
						</div>

						<div class="bg-slate-50 p-4 rounded-md shadow-sm mb-6">
							<h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">- Datos de Membresía</h2>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
								<div class="col-span-1">
									<label for="fecha_inicio"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										<span class="text-red-800">*</span> Inicio de membresía
									</label>
									<input type="text" id="fecha_inicio" name="fecha_inicio"
										value="{{ old('fecha_inicio') }}"
										class="bg-white border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>
								<div class="col-span-1">
									<label for="fecha_finalizacion"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										<span class="text-red-800">*</span> Finalización de membresía
									</label>
									<input type="text" id="fecha_finalizacion" name="fecha_finalizacion"
										value="{{ old('fecha_finalizacion') }}"
										class="bg-white border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>

							</div>
						</div>

						<div class="bg-slate-50 p-4 rounded-md shadow-sm mb-6">
							<h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">- Acceso de cuenta</h2>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
								<div class="col-span-1">
									<label for="contrasenia"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
											class="text-red-800">*</span> Contraseña</label>
									<input type="password" id="contrasenia" name="contrasenia" required autocomplete="off"
										class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>
								<div class="col-span-1">
									<label for="contrasenia_confirmation"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
											class="text-red-800">*</span> Confirmar Contraseña</label>
									<input type="password" id="contrasenia_confirmation" name="contrasenia_confirmation"
										required autocomplete="off"
										class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								</div>
							</div>
						</div>
					</div>



					<div class="text-center pt-6 mt-16">
						<button type="submit"
							class="px-4 py-2 bg-gray-800 mx-auto border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
							<svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor"
								stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
							Guardar
						</button>
					</div>
				</form>
			@endcan
        </div>
    </div>
@endsection

@push('script')
    @vite(['resources/css/plugins/datepicker.css'])
    <script>
        flatpickr('#fecha_inicio', {
            minDate: DateTime.now().setZone('America/Merida').plus({
                days: 1
            }).toFormat('yyyy-MM-dd'),
        })
        flatpickr('#fecha_finalizacion', {
            minDate: DateTime.now().setZone('America/Merida').plus({
                days: 1
            }).toFormat('yyyy-MM-dd'),
        })
    </script>
@endpush
