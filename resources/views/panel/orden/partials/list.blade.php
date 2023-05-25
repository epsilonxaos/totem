<div class="relative overflow-x-auto">
    <div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
        <a href=""
            class="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
            <svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Nuevo usuario
        </a>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 text-center">
                    ID
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Reservacion ID
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
                <th scope="col" class="px-6 py-3 text-center">
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
                    <th class="px-6 py-4 text-center">
                        <p class="font-normal text-gray-500">{{ $item->reservacion_id }}</p>
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
                        <p class="font-normal text-gray-500">
                            {{ \App\Helpers\Helpers::leyendaStatusOrden($item->status) }}
                        </p>
                    </td>
                    <td class="flex items-center justify-center">
                        <button class="bg-red-500 text-white flex items-center px-2 py-1 rounded gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-script-x"
                                width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M14 20h-8a3 3 0 0 1 0 -6h11a3 3 0 0 0 -3 3m7 -3v-8a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v8">
                                </path>
                                <path d="M17 17l4 4m0 -4l-4 4"></path>
                            </svg>
                            Cancelar
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $data->links() }}
</div>
