@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            @can(PermissionKey::Reservaciones['permissions']['create']['name'])
                <form action="{{ route('panel.usuarios.store') }}" method="POST" id="saveReservacion">
                    @csrf

                    <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
                        <button type="submit"
                            class="px-2 py-1 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                            <svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M14 4l0 4l-6 0l0 -4"></path>
                            </svg>
                            Guardar
                        </button>
                    </div>

                    <div class="w-full">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                            <div class="col-span-1">
                                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                        class="text-red-800">*</span> Nombre
                                    completo</label>
                                <input id="nombre" name="nombre" required autocomplete="off"
                                    class="mb-6 disabled:opacity-50 disabled:pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                        class="text-red-800">*</span> Correo
                                    electrónico</label>
                                <input type="email" id="email" name="email" required autocomplete="off"
                                    class="mb-6 disabled:opacity-50 disabled:pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="correo@prueba.com">

                                <label for="telefono" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                        class="text-red-800">*</span> Teléfono</label>
                                <input type="text" id="telefono" name="telefono" required autocomplete="off"
                                    class="mb-6 disabled:opacity-50 disabled:pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="col-span-1">
                                <label for="fecha_reservacion"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <span class="text-red-800">*</span> Fecha de reservacion
                                </label>
                                <input type="text" id="fecha_reservacion"
                                    class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <button type="button" id="validarDisponibilidad"
                                    class="px-4 py-2 bg-emerald-800 mb-6 mx-auto border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-900 focus:outline-none transition ease-in-out duration-150 flex items-center">
                                    Validar disponibilidad
                                </button>
                                <p class="hidden text-center" id="messageSuccess">Hay <span id="espacios_disponibles"
                                        class="text-emerald-700 font-bold">98</span> espacios disponibles</p>
                                <p class="hidden text-center text-red-700 font-medium" id="messageError">No hay disponibilidad
                                </p>
                            </div>
                        </div>
                    </div>



                    <div class="relative overflow-x-auto">
                        <span class="text-xs mb-2 block"><span class="text-yellow-800">*</span> El límite recomendado por
                            personas en un
                            Day Pass
                            es de
                            <span class="font-semibold text-emerald-800">{{ $daypass->limite_compra_personas }}</span></span>
                        <p id="errorMessage" class="text-pink-600"></p>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Pases
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Precio
                                    </th>
                                    <th scope="col" class="px-6 py-3 w-[180px]">
                                        Cantidad
                                    </th>
                                    <th scope="col" class="px-6 py-3 w-[180px]">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Adultos(+12)
                                    </th>
                                    <td class="px-6 py-4 text-emerald-700 font-semibold">
                                        ${{ $daypass->precio_adultos }} MXN
                                    </td>
                                    <td class="px-6 py-4">
                                        <input type="number" id="adultos" name="adultos"
                                            class="mb-6 disabled:opacity-50 disabled:pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            min="0" max="100">
                                    </td>
                                    <td class="px-6 py-4">
                                        $<span id="subtotal_adultos">0</span> MXN
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Menores(+6)
                                    </th>
                                    <td class="px-6 py-4 text-emerald-700 font-semibold">
                                        ${{ $daypass->precio_ninos }} MXN
                                    </td>
                                    <td class="px-6 py-4">
                                        <input type="number" id="ninos" name="ninos"
                                            class="mb-6 disabled:opacity-50 disabled:pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            min="0" max="100">
                                    </td>
                                    <td class="px-6 py-4">
                                        $<span id="subtotal_ninos">0</span> MXN
                                    </td>
                                </tr>
                                <tr class="bg-white dark:bg-gray-800">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Infantes(-6)
                                    </th>
                                    <td class="px-6 py-4 text-emerald-700 font-semibold">
                                        ${{ $daypass->precio_ninos_menores }} MXN
                                    </td>
                                    <td class="px-6 py-4">
                                        <input type="number" id="ninos_menores" name="ninos_menores"
                                            class="mb-6 disabled:opacity-50 disabled:pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            min="0" max="100">
                                    </td>
                                    <td class="px-6 py-4">
                                        $<span id="subtotal_ninos_menores">0</span> MXN
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="col" class="px-6 py-3">

                                    </th>
                                    <th scope="col" class="px-6 py-3">

                                    </th>
                                    <th scope="col" class="px-6 py-3 w-[180px] text-emerald-900 font-semibol">
                                        TOTAL
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        $<span id="total">0</span> MXN
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="w-full">
                        <label for="pago_metodo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <span
                                class="text-red-800">*</span> Metodo
                            de pago</label>
                        <select id="pago_metodo"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="tarjeta">Tarjeta Debito / Credito</option>
                            <option value="efectivo">Efectivo</option>
                        </select>
                    </div>


                    <div class="text-center pt-8 mt-16">
                        <button type="submit"
                            class="px-2 py-1 mx-auto bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                            <svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M14 4l0 4l-6 0l0 -4"></path>
                            </svg>
                            Guardar
                        </button>
                    </div>
                </form>
            @endcan
        </div>
    </div>
@endsection

@can(PermissionKey::Reservaciones['permissions']['create']['name'])
    @push('script')
        <script type="text/javascript">
            const daypass = @json($daypass);
            const MODE = 'Create';
        </script>
        @vite(['resources/css/plugins/datepicker.css', 'resources/js/admin/reservaciones/app.js'])
    @endpush
@endcan
