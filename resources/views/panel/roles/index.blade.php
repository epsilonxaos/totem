@extends('layouts.admin')

@section('content')
<div class="relative overflow-x-auto">

	<div class="flex items-center justify-end pb-4 bg-white dark:bg-gray-900 mb-3">
		@can(PermissionKey::Role['permissions']['create']['name'])
		<a href="{{ route('panel.roles.create') }}" class="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center">
			<svg class="w-5 inline-block mr-1" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 6v12m6-6H6" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
			Nuevo rol
		</a>
		@endcan
	</div>

	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3">
					Nombre
				</th>
				<th scope="col" class="px-6 py-3 text-center w-52">
					Acciones
				</th>
			</tr>
		</thead>
		<tbody>
			@foreach ($data as $item)
			<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-600">

				<td class="px-6 py-4">
					<p class="font-normal text-gray-500">{{ $item->name }}</p>
				</td>
				<td class="px-6 py-4 text-center flex items-center justify-center">
					@can([PermissionKey::Role['permissions']['edit']['name'], PermissionKey::Role['permissions']['update']['name']])
						<a href="{{ route('panel.roles.edit', ['id' => $item->id]) }}" class="font-medium text-orange-600 dark:text-orange-500 " title
							='Editar'>
							<svg class="w-5 inline" aria-hidden="true"
								fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
						</a>
					@elsecan(PermissionKey::Role['permissions']['edit']['name'])
						<a href="{{ route('panel.roles.edit', ['id' => $item->id]) }}" class="font-medium text-blue-600 dark:text-blue-500 " title
							="Ver detalle">
							<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
								<path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
								<path d="M3 6l0 13"></path>
								<path d="M12 6l0 13"></path>
								<path d="M21 6l0 13"></path>
							</svg>
						</a>
					@endcan
					@can(PermissionKey::Role['permissions']['destroy']['name'])
					<form action="{{ route('panel.roles.destroy', ['id' => $item->id]) }}" method="post" class="inline delete-form-{{ $item->id }}">
						@csrf
						@method('DELETE')
						<button title="Eliminar" type="button" onclick="deleteSubmitForm({{ $item->id }})" class="font-medium text-red-600 dark:text-red-500">
							<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M4 7l16 0"></path>
								<path d="M10 11l0 6"></path>
								<path d="M14 11l0 6"></path>
								<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
								<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
							</svg>
						</button>
					</form>
					@endcan
				</td>
			</tr>
			@endforeach
		</tbody>
	</table>
</div>
@endsection