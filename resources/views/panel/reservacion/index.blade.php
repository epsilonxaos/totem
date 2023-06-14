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

        {{ $dataTable->table() }}
    </div>
@endsection

@push('script')
    {{ $dataTable->scripts(attributes: ['type' => 'module']) }}
@endpush
