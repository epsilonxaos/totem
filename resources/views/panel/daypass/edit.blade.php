@extends('layouts.admin')

@push('style')
    <style>
        @media (max-width: 640px) {
            .flatpickr-calendar {
                transform: scale(0.9);
            }
        }
    </style>
@endpush

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            @can(PermissionKey::Daypass['permissions']['update']['name'])
                <form action="{{ route('panel.daypass.update') }}" method="POST">
                    @csrf
                    @method('PUT')
                    @elsecan
                    <form>
                    @endcan

                    @canany([PermissionKey::Daypass['permissions']['edit']['name'],
                        PermissionKey::Daypass['permissions']['update']['name']])
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
                            <div class="">
                                <h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">- Información general</h2>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                                    <div class="col-span-1">
                                        <label for="limite_total"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span> Cupo de personas por día</label>
                                        <input id="limite_total" name="limite_total" required autocomplete="off" type="number"
                                            min="0"
                                            value="{{ old('limite_total') ? old('limite_total') : $data->limite_total }}"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="limite_compra_personas"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span> Límite de compra para público general</label>
                                        <input id="limite_compra_personas" name="limite_compra_personas" required
                                            autocomplete="off" type="number" min="0"
                                            value="{{ old('limite_compra_personas') ? old('limite_compra_personas') : $data->limite_compra_personas }}"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="limite_invitados_socios"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span> Límite de invitados incluidos en la membresía
                                            (incluyendo titular)
                                        </label>
                                        <input id="limite_invitados_socios" name="limite_invitados_socios" required
                                            autocomplete="off"
                                            value="{{ old('limite_invitados_socios') ? old('limite_invitados_socios') : $data->limite_invitados_socios }}"
                                            type="number" min="0"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="precio_adultos"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span> Precio pase adultos</label>
                                        <input id="precio_adultos" name="precio_adultos"
                                            value="{{ old('precio_adultos') ? old('precio_adultos') : $data->precio_adultos }}"
                                            required autocomplete="off" type="number" min="0"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="precio_ninos"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                                class="text-red-800">*</span>Precio pase
                                            menores(+6)</label>
                                        <input id="precio_ninos" name="precio_ninos" required
                                            value="{{ old('precio_ninos') ? old('precio_ninos') : $data->precio_ninos }}"
                                            autocomplete="off" type="number" min="0"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                    <div class="col-span-1">
                                        <label for="precio_ninos_menores"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio pase
                                            infantes(-5)</label>
                                        <input id="precio_ninos_menores" name="precio_ninos_menores"
                                            value="{{ old('precio_ninos_menores') ? old('precio_ninos_menores') : $data->precio_ninos_menores }}"
                                            autocomplete="off" type="number" min="0"
                                            class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">- Restricción de fechas</h2>
                            <div class="grid grid-cols-1 gap-5 mb-6">
                                <div class="col-span-1">
                                    <label for="fechas_excluidas"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Fechas excluidas
                                    </label>
                                    <input type="text" id="fechas_excluidas" name="fechas_excluidas" value=""
                                        class="bg-white border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </div>
                        </div>
                    @endcanany

                    @can(PermissionKey::Daypass['permissions']['update']['name'])
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
        const _FE = @json(old('fechas_excluidas') ? old('fechas_excluidas') : $data->fechas_excluidas);
        flatpickr('#fechas_excluidas', {
            mode: "multiple",
            inline: true,
            defaultDate: _FE
        })
    </script>
@endpush
