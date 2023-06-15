@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-6 px-1">

        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
                <a href="{{ route('panel.reservacion.index') }}"
                    class="px-2 py-1 mr-2 bg-slate-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 inline-block mr-1" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 14l-4 -4l4 -4"></path>
                        <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
                    </svg>
                    Regresar
                </a>
                @can(PermissionKey::Reservaciones['permissions']['update']['name'])
                    <a href="{{ route('panel.reservacion.edit', ['id' => $data->id]) }}"
                        class="px-2 py-1 mr-2 bg-emerald-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 inline-block mr-1" width="24" height="24"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                            <path d="M16 5l3 3"></path>
                        </svg>
                        Editar
                    </a>
                @endcan
            </div>

            <h3 class="font-bold text-lg text-center uppercase mb-6 pt-6">Informacion general</h3>
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="col-span-1">
                    <p class="font-semibold text-blue-900 mb-1">Nombre:</p>
                    <p class="mb-6">{{ $data->nombre_completo }}</p>

                    <p class="font-semibold text-blue-900 mb-1">Correo eelctronico:</p>
                    <p class="mb-6">{{ $data->correo }}</p>

                    <p class="font-semibold text-blue-900 mb-1">Telefono:</p>
                    <p class="mb-6">{{ $data->telefono }}</p>
                </div>
                <div class="col-span-1">
                    <p class="font-semibold text-blue-900 mb-1">Folio:</p>
                    <p class="mb-6 tracking-widest font-bold">{{ $data->folio }}</p>

                    <p class="font-semibold text-blue-900 mb-1">Fecha de reservación:</p>
                    <p class="mb-6">{{ \App\Helpers\Helpers::dateSpanishComplete($data->fecha_reservacion) }}</p>
                </div>
            </div>

            <h3 class="font-bold text-lg text-center uppercase mb-4">Datos de compra</h3>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Pases
                            </th>
                            <th scope="col" class="px-6 py-3">
                                No. personas
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" class="px-6 py-3">
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
                            <td class="px-6 py-4">
                                {{ $data->p_adultos - $data->pay_adultos }}{{ $data->pay_adultos > 0 ? ' (+ ' . $data->pay_adultos . ' extras)' : '' }}
                            </td>
                            <td class="px-6 py-4">
                                $ {{ $movimiento->precio_adulto }}MXN
                            </td>
                            @if ($data->is_socio)
                                <td style="padding: 0 0 0 15px;">
                                    ${{ $data->pay_adultos > 0 ? $data->pay_adultos * $movimiento->precio_adulto : 0 }}
                                    MXN</td>
                            @else
                                <td style="padding: 0 0 0 15px;">
                                    ${{ $data->p_adultos * $movimiento->precio_adulto }} MXN</td>
                            @endif
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Menores(+6)
                            </th>
                            <td class="px-6 py-4">
                                {{ $data->p_ninos - $data->pay_ninos }}{{ $data->pay_ninos > 0 ? ' (+ ' . $data->pay_ninos . ' extras)' : '' }}
                            </td>
                            <td class="px-6 py-4">
                                $ {{ $movimiento->precio_ninio }}MXN
                            </td>
                            @if ($data->is_socio)
                                <td style="padding: 0 0 0 15px;">
                                    ${{ $data->pay_ninos > 0 ? $data->pay_ninos * $movimiento->precio_ninio : 0 }}
                                    MXN</td>
                            @else
                                <td style="padding: 0 0 0 15px;">
                                    ${{ $data->p_ninos * $movimiento->precio_ninio }} MXN</td>
                            @endif
                        </tr>
                        <tr class="bg-white dark:bg-gray-800">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Infantes(-6)
                            </th>
                            <td class="px-6 py-4">
                                {{ $data->p_ninos_menores }}
                            </td>
                            <td class="px-6 py-4">
                                ${{ $movimiento->precio_ninio_menores ?? '0' }}MXN
                            </td>
                            <td class="px-6 py-4">
                                $ {{ $data->p_ninos_menores * $movimiento->precio_ninio_menores }}MXN
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                TOTAL
                            </th>
                            <th scope="col" class="px-6 py-3">

                            </th>
                            <th scope="col" class="px-6 py-3">

                            </th>
                            <th scope="col" class="px-6 py-3">
                                @if ($data->is_socio)
                                    <p class="tracking-widest font-bold">
                                        {{ $orden->total > 0 ? '$' . $orden->total . ' MXN' : 'MEMBRESÍA CLUB' }}</p>
                                @else
                                    <p class="font-bold text-sm">${{ $orden->total }}MXN</p>
                                @endif
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="flex items-center justify-center pt-10">
                <a href="{{ route('panel.reservacion.show.pdf', ['folio' => $data->folio]) }}" target="_blank"
                    class="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-pdf w-[20px] inline-block mr-1" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z"></path>
                        <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8"></path>
                        <path d="M17 12h3"></path>
                        <path d="M21 8h-4v8"></path>
                    </svg>
                    DESCARGAR
                </a>
            </div>

        </div>
    </div>
@endsection
