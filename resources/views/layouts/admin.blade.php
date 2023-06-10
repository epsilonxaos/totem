<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('css/admin/app.css') }}">
    @livewireStyles
    @stack('style')
</head>

<body class="font-sans text-gray-900 bg-slate-100 antialiased">

    {{-- //* Navbar --}}
    @include('layouts.includes.navbar')

    {{-- //* Sidebar --}}
    @include('layouts.includes.sidebar')

    <div class="p-4 sm:ml-64">
        @include('layouts.includes.breadcrumb')

        <div class="p-4 border-2 border-white bg-white shadow rounded-lg dark:border-gray-700 mt-2 pb-12">
            @yield('content')
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/luxon/3.3.0/luxon.min.js"
        integrity="sha512-KKbQg5o92MwtJKR9sfm/HkREzfyzNMiKPIQ7i7SZOxwEdiNCm4Svayn2DBq7MKEdrqPJUOSIpy1v6PpFlCQ0YA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        var DateTime = luxon.DateTime;
    </script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    @stack('script')
    @livewireScripts
</body>

</html>
