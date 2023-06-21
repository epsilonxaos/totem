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
    <link rel="stylesheet" href="{{ asset('plugins/flatpicker/flatpickr.min.css') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="{{ asset('plugins/flatpicker/bootstrap-icons.css') }}">
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

    <script src="{{ asset('plugins/luxon/luxon.min.js') }}"></script>
    <script src="{{ asset('plugins/sweetalert/sweetalert2@11.js') }}"></script>
    <script>
        var DateTime = luxon.DateTime;

        function deleteSubmitForm(id) {
            Swal.fire({
                title: "¿Finalizar eliminación?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Eliminado!', '', 'success')
                    document.querySelector('.delete-form-' + id).submit();
                }
            });
        }
    </script>
    <script src="{{ asset('plugins/flatpicker/flatpickr.js') }}"></script>
    <script src="{{ asset('plugins/flatpicker/es.min.js') }}"></script>
    <script src="{{ asset('plugins/imask/imask.js') }}"></script>
    <script>
        flatpickr.localize(flatpickr.l10ns.es);
        if (document.getElementById('telefono')) {

            var element = document.getElementById('telefono');
            var maskOptions = {
                mask: '0000000000'
            };
            var mask = IMask(element, maskOptions);
        }
    </script>
    @stack('script')
    @livewireScripts
</body>

</html>
