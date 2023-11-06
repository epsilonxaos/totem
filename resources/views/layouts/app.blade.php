<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Tótem Beach Club') }}</title>

    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('img/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('img/favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('img/favicon/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('img/favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <meta name="description"
        content="Hemos creado un incre&iacute;ble espacio para gozar el maravilloso espect&aacute;culo de la costa con total comodidad." />
    <meta name="author" content="{{ config('app.name', 'Tótem Beach Club') }}" />
    <meta property="og:type" content="es_MX" />
    <meta property="og:locale" content="website" />
    <meta property="og:site_name" content="{{ config('app.name', 'Tótem Beach Club') }}" />
    <meta property="og:title" content="{{ config('app.name', 'Tótem Beach Club') }}" />
    <meta property="og:url" content="{{ config('app.url') }}" />
    <meta property="og:description"
        content="Hemos creado un incre&iacute;ble espacio para gozar el maravilloso espect&aacute;culo de la costa con total comodidad." />
    <meta property="og:image" content="{{ asset('img/fb.png') }}" />


    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <script type='text/javascript' src='https://www.covermanager.com/js/iframeResizer.min.js'></script>

    <!-- Scripts -->
    {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
	@viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/react/main.jsx'])
</head>

<body class="antialiased font-inter">
    @yield('content')
</body>

</html>
