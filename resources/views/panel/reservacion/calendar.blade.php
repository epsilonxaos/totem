@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-2">
        <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900 mb-3">
			@can(PermissionKey::Reservaciones['permissions']['create']['name'])
				<a href="{{ route('panel.reservacion.create') }}"
					class="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
					<svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"
						viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
					Nueva reservación
				</a>
				<a href="{{ route('panel.reservacion.create_socio') }}"
					class="px-4 py-2 bg-gray-800 ml-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
					<svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor"
						stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
					Nueva reservación socios
				</a>
			@endcan
        </div>

        <div id="calendar" style="height: 600px;"></div>

        <!-- Main modal -->
		@can(PermissionKey::Calendario['permissions']['asistencia']['name'])
			<div id="modalListReservaciones" tabindex="-1"
				class="fixed top-0 left-0 right-0 z-50 w-full hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center bg-black bg-opacity-40">
				<div class="relative w-full max-w-2xl max-h-full">
					<!-- Modal content -->
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<!-- Modal header -->
						<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
								Asistencia
							</h3>
							<button type="button"
								class="closeModal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
								<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"></path>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>
						<!-- Modal body -->
						<div class="p-6 space-y-6">

							<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
								<ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab"
									data-tabs-toggle="#myTabContent" role="tablist">
									<li class="mr-2" role="presentation">
										<button class="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab"
											data-tabs-target="#profile" type="button" role="tab" aria-controls="profile"
											aria-selected="false">Socios</button>
									</li>
									<li class="mr-2" role="presentation">
										<button class="inline-block p-4 border-b-2 rounded-t-lg" id="dashboard-tab"
											data-tabs-target="#dashboard" type="button" role="tab"
											aria-controls="dashboard" aria-selected="false">Publico General</button>
									</li>

								</ul>
							</div>
							<div id="myTabContent">
								<div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel"
									aria-labelledby="profile-tab">
									<ul id="list-socios">

									</ul>
								</div>
								<div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel"
									aria-labelledby="dashboard-tab">
									<ul id="list-publico"></ul>
								</div>

							</div>

						</div>
						<!-- Modal footer -->
						<div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button type="button"
								class="closeModal text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cerrar</button>
						</div>
					</div>
				</div>
			</div>
		@endcan
    </div>
@endsection

@push('script')
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js'></script>
    <link rel="stylesheet" href="https://unpkg.com/tippy.js@6.3.7/themes/light.css">
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>


    {{-- <link rel="stylesheet" href="{{ asset('plugins/toastr/toastr.min.css') }}">
    <script src="{{ asset('plugins/toastr/toastr.js') }}"></script> --}}
    <!-- CDN -->
    <script>
        const fechasExcluidas = @json($fechasExcluidas);
        const fechasReservaciones = @json($fechasReservaciones);
        const fechasRed = []
    </script>

    @vite(['resources/js/admin/calendario/app.js'])
@endpush
