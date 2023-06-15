@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            @can(PermissionKey::Socios['permissions']['update']['name'])
                <form action="{{ route('panel.socios.update', ['id' => $data->id]) }}" method="POST">
                    @csrf
                    @method('PUT')
                    @elsecan
                    <form>
                    @endcan

                    @canany([PermissionKey::Socios['permissions']['edit']['name'],
                        PermissionKey::Socios['permissions']['update']['name']])
                        <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
                            <button type="submit"
                                class="px-2 py-1 bg-orange-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                                <svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24"
                                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                                    <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M14 4l0 4l-6 0l0 -4"></path>
                                </svg>
                                Actualizar
                            </button>
                        </div>

                        <div class="w-full">
                            <div class="bg-slate-50 p-4 rounded-md shadow-sm mb-6">
                                <h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">Información general</h2>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                                    <div class="col-span-1">
                                        <label for="nombre"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span> Nombre</label>
                                        <input id="nombre" name="nombre" required autocomplete="off"
                                            value="{{ old('nombre') ? old('nombre') : $data->nombre }}"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="apellido_paterno"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span> Apellido paterno</label>
                                        <input id="apellido_paterno" name="apellido_paterno"
                                            value="{{ old('apellido_paterno') ? old('apellido_paterno') : $data->apellido_paterno }}"
                                            required autocomplete="off"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="apellido_materno"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido
                                            materno</label>
                                        <input id="apellido_materno" name="apellido_materno"
                                            value="{{ old('apellido_materno') ? old('apellido_materno') : $data->apellido_materno }}"
                                            autocomplete="off"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo
                                            electrónico</label>
                                        <input type="email" id="email" name="correo" required disabled
                                            value="{{ old('correo') ? old('correo') : $data->correo }}" autocomplete="off"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="correo@prueba.com">

                                        <label class="relative inline-flex items-center mb-4 sm:mb-0 cursor-pointer">
                                            <input name="actualizar_correo" type="checkbox" value="false" class="sr-only peer">
                                            <div
                                                class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                            </div>
                                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Actualizar
                                                correo electrónico</span>
                                        </label>
                                    </div>
                                    <div class="col-span-1">
                                        <label for="telefono"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span> Teléfono</label>
                                        <input type="text" id="telefono" name="telefono"
                                            value="{{ old('telefono') ? old('telefono') : $data->telefono }}" required
                                            autocomplete="off"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-md shadow-sm mb-6">
                            <h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">Datos de Membresía</h2>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                                <div class="col-span-1">
                                    <label for="fecha_inicio"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        <span class="text-red-800">*</span> Inicio de membresía
                                    </label>
                                    <input type="text" id="fecha_inicio" name="fecha_inicio"
                                        value="{{ old('fecha_inicio') ? old('fecha_inicio') : $data->fecha_inicio }}"
                                        class="bg-white border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="col-span-1">
                                    <label for="fecha_finalizacion"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        <span class="text-red-800">*</span> Finalización de membresía
                                    </label>
                                    <input type="text" id="fecha_finalizacion" name="fecha_finalizacion"
                                        value="{{ old('fecha_finalizacion') ? old('fecha_finalizacion') : $data->fecha_finalizacion }}"
                                        class="bg-white border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>

                            </div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-md shadow-sm mb-6">
                            <h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">Acceso de cuenta</h2>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                                <div class="col-span-1">
                                    <label for="contrasenia"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                            class="text-red-800">*</span> Contraseña</label>
                                    <input type="password" id="contrasenia" name="contrasenia" autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="col-span-1">
                                    <label for="contrasenia_confirmation"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                            class="text-red-800">*</span> Confirmar Contraseña</label>
                                    <input type="password" id="contrasenia_confirmation" name="contrasenia_confirmation"
                                        autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </div>
                        </div>
                    @endcanany

                    @can(PermissionKey::Socios['permissions']['update']['name'])
                        <div class="text-center pt-6 mt-16">
                            <button type="submit"
                                class="px-2 py-1 mx-auto bg-orange-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                                <svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24"
                                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                                    <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M14 4l0 4l-6 0l0 -4"></path>
                                </svg>
                                Actualizar
                            </button>
                        </div>
                    @endcan
                </form>
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

        document.querySelector('[name="actualizar_correo"]').addEventListener('change', function(ev) {
            if (ev.target.checked) {
                ev.target.value = true
                document.querySelector('[name="correo"]').removeAttribute('disabled')
                document.querySelector('[name="correo"]').setAttribute('required', true)
            } else {
                ev.target.value = false
                document.querySelector('[name="correo"]').setAttribute('disabled', 'disabled')
                document.querySelector('[name="correo"]').removeAttribute('required')
            }
        })
    </script>
@endpush
