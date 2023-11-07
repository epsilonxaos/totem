@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            @can(PermissionKey::Habitaciones['permissions']['update']['name'])
                <form action="{{ route('panel.socios.update', ['id' => $data->id]) }}" method="POST">
                    @csrf
                    @method('PUT')
                    @elsecan
                    <form>
                    @endcan

                    @canany([PermissionKey::Habitaciones['permissions']['update']['name']])
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
							<div class=" mb-6">
								<h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">Información general</h2>
								<div class="grid grid-cols-1 gap-5 mb-6">
									<div class="col-span-1">
										<label for="title"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
												class="text-red-800">*</span> Habitación</label>
										<input id="title" name="title" required autocomplete="off" value="{{ old('title') ? old('title') : $data->title }}"
											class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
									</div>
									<div class="col-span-1">
										<label for="description"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
										<textarea name="description" id="description" class="trumbowyg-panel" cols="30" rows="10">{{ old('description') ? old('description') : $data->description }}</textarea>
									</div>
									<div class="col-span-1">
										<label for="link"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
										<input id="link" name="link" value="{{ old('link') ? old('link') : $data->link }}"
											autocomplete="off"
											class="mb-4 disabled:opacity-50 disabled:pointer-events-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
									</div>
								</div>
							</div>
						</div>

                    @endcanany

                    @can(PermissionKey::Habitaciones['permissions']['update']['name'])
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
