@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 text-center">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        Reservacion
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Total
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Metodo de pago
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Pago realizado
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Pago Referencia
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Estado
                    </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $item)
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-600">

                        <th class="px-6 py-4 text-center">
                            <p class="font-normal text-gray-500">{{ $item->id }}</p>
                        </th>
                        <th class="px-6 py-4 text-center flex items-center justify-center">
                            <a title="Ver info" href="{{route('panel.reservacion.show', ['id' => $item -> reservacion_id])}}" class="text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-lg text-xs px-2 pl-1 py-1 mr-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-small w-[20px] inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" stroke-width="0" fill="currentColor"></path>
                                 </svg>
                                Ver
                            </a>
                        </th>
                        <td class="px-6 py-4 ">
                            <p class="font-normal text-gray-500">{{ $item->total > 0 ? '$' . $item->total . 'MXN' : '--' }}
                            </p>
                        </td>
                        <td class="px-6 py-4 ">
                            <p class="font-normal text-gray-500">
                                {{ $item->pago_metodo === 'incluido' ? 'Club Socio' : ucfirst($item->pago_metodo) }}</p>
                        </td>
                        <td class="px-6 py-4 ">
                            <p class="font-normal text-gray-500">{{ ucfirst($item->pago_realizado) }}</p>
                        </td>
                        <td class="px-6 py-4 ">
                            <p class="font-normal text-gray-500">{{ $item->pago_referencia }}</p>
                        </td>
                        <td class="px-6 py-4 ">
                            @php
                                $leyenda = \App\Helpers\Helpers::leyendaStatusOrden($item->status);
                            @endphp
                            @switch($leyenda['color'])
                                @case('yellow')
                                    <span
                                        class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{{ $leyenda['estado'] }}</span>
                                @break

                                @case('green')
                                    <span
                                        class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{{ $leyenda['estado'] }}</span>
                                @break

                                @case('orange')
                                    <span
                                        class="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{{ $leyenda['estado'] }}</span>
                                @break

                                @case('red')
                                    <span
                                        class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{{ $leyenda['estado'] }}</span>
                                @break

                                @case('indigo')
                                    <span
                                        class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{{ $leyenda['estado'] }}</span>
                                @break

                                @default
                                    {{ $leyenda['estado'] }}
                            @endswitch
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{ $data->links() }}
    </div>
@endsection
