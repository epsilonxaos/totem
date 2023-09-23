@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            {{-- @can(PermissionKey::Socios['permissions']['update']['name']) --}}
            <form action="{{ route('panel.website.update') }}" enctype="multipart/form-data" class="form-submit-alert-wait"
                method="POST">
                @csrf
                @method('PUT')
                {{-- @elsecan
                    <form> --}}
                {{-- @endcan --}}

                {{-- @canany([PermissionKey::Socios['permissions']['edit']['name'], PermissionKey::Socios['permissions']['update']['name']]) --}}
                <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
                    <button type="submit"
                        class="px-2 py-1 bg-orange-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                        <svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                            <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                            <path d="M14 4l0 4l-6 0l0 -4"></path>
                        </svg>
                        Actualizar
                    </button>
                </div>

                <div class="w-full">
                    <div class=" mb-6">
                        @if (false)
                            <h2 class="mb-2 font-semibold text-gray-900 text-base">Portada de secciones</h2>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-3">
                                <div class="col-span-1">
                                    <div class="mb-3">
                                        <label for="cover_home"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Portada
                                            inicio</label>
                                        <input type="file" name="cover_home" class="dropify" data-height="150"
                                            data-max-file-size="1M" data-allowed-file-extensions="jpg jpeg png"
                                            data-default-file="{{ asset($data->cover_home) }}" />
                                        <small>Las medidas recomendadas son 950 x 650 px, solo se aceptan .jpg, .jpeg y .png
                                            con un máximo de peso de 1MB.</small>
                                    </div>
                                </div>
                                <div class="col-span-1">
                                    <div class="mb-3">
                                        <label for="cover_contact"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Portada
                                            contacto</label>
                                        <input type="file" name="cover_contact" class="dropify" data-height="150"
                                            data-max-file-size="1M" data-allowed-file-extensions="jpg jpeg png"
                                            data-default-file="{{ asset($data->cover_contact) }}" />
                                        <small>Las medidas recomendadas son 950 x 650 px, solo se aceptan .jpg, .jpeg y .png
                                            con un máximo de peso de 1MB.</small>
                                    </div>
                                </div>
                                <div class="col-span-1">
                                    <div class="mb-3">
                                        <label for="cover_map"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Portada
                                            maps</label>
                                        <input type="file" name="cover_map" class="dropify" data-height="150"
                                            data-max-file-size="1M" data-allowed-file-extensions="jpg jpeg png"
                                            data-default-file="{{ asset($data->cover_map) }}" />
                                        <small>Las medidas recomendadas son 950 x 650 px, solo se aceptan .jpg, .jpeg y .png
                                            con un máximo de peso de 1MB.</small>
                                    </div>
                                </div>

                            </div>

                            <h2 class="mb-2 font-semibold text-gray-900 text-base">Contacto y Redes sociales</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="url_map">URL Google Maps</label>
                                    <input id="url_map" name="url_map" value="{{ $data->url_map }}" autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="url_in">URL Instagram</label>
                                    <input id="url_in" name="url_in" value="{{ $data->url_in }}" autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="url_fb">URL Facebook</label>
                                    <input id="url_fb" name="url_fb" value="{{ $data->url_fb }}" autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="url_yt">URL Youtube</label>
                                    <input id="url_yt" name="url_yt" value="{{ $data->url_yt }}" autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="correo">Correo electrónico</label>
                                    <input id="correo" name="correo" value="{{ $data->correo }}" autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="telefono">Teléfono</label>
                                    <input id="telefono" name="telefono" value="{{ $data->telefono }}"
                                        autocomplete="off"
                                        class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </div>

                            <h2 class="mb-2 font-semibold text-gray-900 text-base">Información legal</h2>
                            <div class="grid md:grid-cols-2 gap-5 mb-3">
                                <div>
                                    <div class="mb-3">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            for="aviso">Aviso de privacidad</label>
                                        <input
                                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="file_input_help" name="aviso" id="aviso"
                                            type="file">
                                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Solo
                                            se aceptan archivos PDF</p>

                                    </div>
                                </div>
                                <div class="mb-3">
                                    @if ($data->aviso)
                                        <iframe src="{{ asset($data->aviso) }}" width="100%" height="300px"
                                            frameborder="0"></iframe>
                                    @endif
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 gap-5 mb-3">
                                <div>
                                    <div class="mb-3">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            for="terminos">Terminos y Condiciones</label>
                                        <input
                                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="file_input_help" name="terminos" id="terminos"
                                            type="file">
                                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Solo
                                            se aceptan archivos PDF</p>

                                    </div>
                                </div>
                                <div class="mb-3">
                                    @if ($data->terminos)
                                        <iframe src="{{ asset($data->terminos) }}" width="100%" height="300px"
                                            frameborder="0"></iframe>
                                    @endif
                                </div>
                            </div>
                        @endif

                        <h2 class="mb-2 font-semibold text-gray-900 text-base">Archivos generales</h2>
                        <div class="grid md:grid-cols-2 gap-5 mb-3">
                            <div>
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        for="menu"> Menú</label>
                                    <input
                                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        aria-describedby="file_input_help" name="menu" id="menu" type="file">
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Solo se
                                        aceptan archivos PDF</p>

                                </div>
                            </div>
                            <div class="mb-3">
                                @if ($data->menu)
                                    <iframe src="{{ asset($data->menu) }}" width="100%" height="300px"
                                        frameborder="0"></iframe>
                                @endif
                            </div>
                        </div>
                    </div>

                </div>
                {{-- @endcanany

                    @can(PermissionKey::Socios['permissions']['update']['name']) --}}
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
                {{-- @endcan --}}
            </form>
        </div>
    </div>
@endsection
