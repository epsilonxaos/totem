@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            <form action="{{ route('panel.usuarios.store') }}" method="POST" id="saveReservacion">
                @csrf

                <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
                    <button type="submit"
                        class="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
                        <svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor"
                            stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        Guardar
                    </button>
                </div>

                <div class="w-full">
                    <div class="w-full flex items-center mb-6">
                        <div class="w-[90px]">
                            <label class="mb-3 text-sm font-medium text-gray-900 dark:text-gray-300 block">Es
                                socio</label>
                            <label class="relative inline-flex items-center cursor-pointer ">
                                <input type="checkbox" value="" class="sr-only peer" id="isSocio" name="is_socio">
                                <div
                                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                            </label>
                        </div>
                        <div class="w-full">
                            <label for="socios"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Socios</label>
                            <select id="socios"
                                disabled
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                <option selected>Selecciones una opcion</option>
                                @foreach ($socios as $item)
                                    <option value="{{ $item->id }}">{{ $item->nombre_completo }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                        <div class="col-span-1">
                            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                                    class="text-red-800">*</span> Nombre
                                completo</label>
                            <input id="nombre" name="nombre" required
                                autocomplete="off"
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
                            <label for="fecha_reservacion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span class="text-red-800">*</span> Fecha de reservacion
                            </label>
                            <input type="text" id="fecha_reservacion" class="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <button type="button" id="validarDisponibilidad" class="px-4 py-2 bg-emerald-800 mb-6 mx-auto border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 focus:bg-emerald-700 active:bg-emerald-900 focus:outline-none transition ease-in-out duration-150 flex items-center">
                                Validar disponibilidad
                            </button>
                            <p class="hidden text-center" id="messageSuccess">Hay <span id="espacios_disponibles" class="text-emerald-700 font-bold">98</span> espacios disponibles</p>
                            <p class="hidden text-center text-red-700 font-medium" id="messageError">No hay disponibilidad</p>
                        </div>
                    </div>
                </div>


                <span class="text-xs mb-2 block"><span class="text-red-800">*</span> El limite maximo por personas en un
                    Daypass
                    es de
                    <span class="font-semibold text-emerald-800">{{ $daypass->limite_compra_personas }}</span></span>
                <div class="relative overflow-x-auto">
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
                                    <select id="adultos"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Selecciones la cantidad</option>
                                        @for ($i = 1; $i <= 10; $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                        @endfor
                                    </select>
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
                                    <select id="ninos"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Selecciones la cantidad</option>
                                        @for ($i = 1; $i <= 10; $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                        @endfor
                                    </select>
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
                                    <select id="ninos_menores"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Selecciones la cantidad</option>
                                        @for ($i = 1; $i <= 10; $i++)
                                            <option value="{{ $i }}">{{ $i }}</option>
                                        @endfor
                                    </select>
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
                        class="px-4 py-2 bg-gray-800 mx-auto border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
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

@push('script')
    <script>
        const daypass = @json($daypass)
        const MODE = 'Create'
    </script>
    @vite(['resources/css/plugins/datepicker.css', 'resources/js/admin/reservaciones/app.js'])
@endpush
