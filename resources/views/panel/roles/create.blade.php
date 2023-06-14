@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            <form action="{{ route('panel.roles.store') }}" method="POST">
                @csrf

                <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
                    <button type="submit"
                        class="px-4 py-2 bg-slate-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
                        <svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor"
                            stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        Guardar
                    </button>
                </div>

                <div class="w-full">
                    <div class="">
                        <h2 class="mb-5 font-semibold uppercase text-gray-900 text-base">Creación de rol</h2>
                        <div class="grid grid-cols-1 mb-6">
                            <div class="col-span-1">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                        class="text-red-800">*</span> Nombre del rol</label>
                                <input id="name" name="name" required autocomplete="off" type="text"
                                    value="{{ old('name') }}" placeholder="Ejemplo: Diseño"
                                    class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>

                        <h3 class="mb-5 font-semibold uppercase text-gray-900">Asignación de permisos</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-6">
                            @if (count(PermissionKey::getConstants()) > 0)
                                @foreach (PermissionKey::getConstants() as $modulo)
                                    <div class="col-span-1">
                                        <h3 class="mb-3">{{ $modulo['name'] }}</h3>
                                        @if (isset($modulo['permissions']) && count($modulo['permissions']) > 0)
                                            @foreach ($modulo['permissions'] as $permission)
                                                <div class="block">
                                                    <label class="relative inline-flex items-center mb-1 cursor-pointer">
                                                        <input type="checkbox" id="{{ $permission['name'] }}"
                                                            name="permission[{{ $permission['name'] }}]" value=""
                                                            class="sr-only peer">
                                                        <div
                                                            class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                                        </div>
                                                        <span
                                                            class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                            for="{{ $permission['name'] }}">{{ $permission['display_name'] }}</span>
                                                    </label>
                                                </div>
                                            @endforeach
                                        @endif
                                    </div>
                                @endforeach
                            @endif
                        </div>
                    </div>
                </div>
        </div>



        <div class="text-center pt-6 mt-16">
            <button type="submit"
                class="px-4 py-2 bg-slates-800 mx-auto border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
                <svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor"
                    stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Guardar
            </button>
        </div>
        </form>
    </div>
    </div>
@endsection
