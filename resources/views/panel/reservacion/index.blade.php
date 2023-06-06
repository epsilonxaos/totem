@extends('layouts.admin')

@section('content')
    <div class="relative overflow-x-auto pt-2">
        <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900 mb-3">
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
                <svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Nueva reservación socios
            </a>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 text-center">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-center">
                        Socio
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Folio
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Fecha reservacion
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Acciones
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
                        <th class="px-6 py-4 text-center text-gray-800 flex items-center justify-center">
                            @if ($item->socio_id)
                                <a title="Ver info" href="{{route('panel.reservacion.show', ['id' => $item -> id])}}" class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-xs px-2 py-1 mr-2">
                                    <svg class="icon icon-tabler icon-tabler-user-search w-[20px] mx-auto" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h1.5"></path>
                                        <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                        <path d="M20.2 20.2l1.8 1.8"></path>
                                    </svg>
                                </a>
                            @endif
                        </th>
                        <td class="px-6 py-4 ">
                            <p class="font-semibold text-emerald-700">{{ $item->folio }} </p>
                        </td>
                        <td class="px-6 py-4 ">
                            <p class="font-normal text-gray-500">{{ $item->nombre_completo }}</p>
                        </td>
                        <td class="px-6 py-4 ">
                            <p class="font-normal text-gray-500">{{ \App\Helpers\Helpers::dateSpanishShort($item->fecha_reservacion) }}</p>
                        </td>
                        <td class="px-6 py-4 flex items-center justify-center">
                            <a title="Ver info" href="{{route('panel.reservacion.show', ['id' => $item -> id])}}" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-2 py-1 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-info w-[20px]" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                    <path d="M11 14h1v4h1"></path>
                                    <path d="M12 11h.01"></path>
                                </svg>
                            </a>
                            <a title="Editar" href="{{route('panel.reservacion.edit', ['id' => $item -> id])}}" class="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-xs px-2 py-1 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit w-[20px]" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                    <path d="M16 5l3 3"></path>
                                </svg>
                            </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{ $data->links() }}
    </div>
@endsection
