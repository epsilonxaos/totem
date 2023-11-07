@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto">

        <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900 mb-3">
            @can(PermissionKey::Habitaciones['permissions']['create']['name'])
                <a href="{{ route('panel.habitaciones.create') }}"
                    class="px-2 py-1 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                    <svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Nueva habitación
                </a>
            @endcan

            <div class="hidden text-blue-600 dark:text-blue-500"></div>
            <div class="hidden text-emerald-600 dark:text-emerald-500"></div>
            <div class="hidden text-pink-600 dark:text-pink-500"></div>
        </div>

        {{ $dataTable->table() }}
    </div>
@endsection

@push('script')
    {{ $dataTable->scripts(attributes: ['type' => 'module']) }}
@endpush
