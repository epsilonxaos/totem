@extends('layouts.admin')

@push('style')
    <style>
        .bg {
            width: 100%;
            height: 120px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .bg img {
            width: 100%;
            opacity: 0;
        }
    </style>
@endpush

@section('content')
<div class="relative overflow-x-auto pt-6 px-1">

	<div class="max-w-7xl mx-auto">
		<div class="flex items-center md:justify-between mb-8">
			<div class="w-full md:w-auto">
				<h2 class="mb-2 font-semibold uppercase text-gray-900 text-base">Galeria de imágenes (Ópcional)</h2>
			</div>
			<div class="w-full md:w-auto">
				@if ($accion === 'edit')
					<a href="{{route('panel.habitaciones.index')}}"
						class="px-2 py-1  bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
						<svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
							stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
							<path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
							<path d="M14 4l0 4l-6 0l0 -4"></path>
						</svg> Guardar y regresar
					</a>
				@else
					<a href="{{route('panel.habitaciones.create')}}" class="px-2 py-1 max-w-max bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
						<svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
							stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
							<path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
							<path d="M14 4l0 4l-6 0l0 -4"></path>
						</svg> Guardar y finalizar</a>
				@endif
				{{-- @can(PermissionKey::habitaciones['permissions']['create']['name'])
				@endcan --}}
			</div>
		</div>
		<div class="bg-white pt-4">
			<p class="mb-1 text-base">Solo se permite subir un <span class="text-yellow-500 font-semibold">máximo de 20 imágenes por lote</span>. agregar más imágenes, simplemente haga clic en el botón "<span class="text-green-700 font-semibold">Guardar imagenes</span>" y podrá seguir subiendo. Si no desea incluir más imágenes, pulse el botón <span class="text-blue-800 font-semibold">"Guardar y finalizar"</span>.</p>
			<ul class="text-sm">
				<li>* Las medidas <span class="text-blue-800 font-semibold">recomendadas</span> son 670 x 396 px</li>
				<li>* Solo se aceptan los formatos <span class="text-blue-800 font-semibold">.jpg, .jpeg y .png</span></li>
				<li>* Maximo de peso de <span class="text-yellow-500 font-semibold">1MiB</span>.</li>
			</ul>
			<form action="{{route('panel.habitaciones.galeria.store')}}" method="POST" enctype="multipart/form-data" id="my-dropzone" class="dropzone mt-3" style="border: 2px dashed #d6d6d6;">
				@csrf
				<input type="hidden" name="id" value="{{$id}}">
				<div class="dz-message">
					Suelta tus archivos aquí
				</div>
			</form>
			<div class=" pt-3">
				<a href="{{route('panel.habitaciones.galeria.acciones', ['accion' => $accion, 'id' => $id])}}" class="px-2 py-1 max-w-max bg-green-800 border border-transparent rounded-md mx-auto font-semibold text-xs text-white uppercase tracking-wide transition ease-in-out duration-150 flex items-center">
					<svg class="w-5 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
						stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
						<path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
						<path d="M14 4l0 4l-6 0l0 -4"></path>
					</svg> Guardar imágenes</a>
			</div>
			<div class="container">
				@if (count($galeria) > 0)
				<div class="row">
					<div class="w-full py-4"> <hr> </div>
					<div class="w-full">
						<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" id="sortable-items" data-url="{{route('panel.habitaciones.galeria.ordenamiento')}}">
								@foreach ($galeria as $item)
									<div class="mb-3 relative sort px-2" data-orden="{{$item -> order}}" data-idx="{{$item -> id}}">
										<div class="absolute z-10 top-0 right-0 flex items-center justify-content-end pr-3">
											<div class="item drag bg-blue-900 text-white cursor-pointer" title="Mover">
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#ffffff" d="M10 2a.75.75 0 0 1 .53.22l1.5 1.5a.75.75 0 0 1-1.06 1.06l-.22-.22v1.69a.75.75 0 0 1-1.5 0V4.56l-.22.22a.75.75 0 0 1-1.06-1.06l1.5-1.5A.75.75 0 0 1 10 2Zm2 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm-9.78-.53a.75.75 0 0 0 0 1.06l1.5 1.5a.75.75 0 0 0 1.06-1.06l-.22-.22h1.69a.75.75 0 0 0 0-1.5H4.56l.22-.22a.75.75 0 0 0-1.06-1.06l-1.5 1.5ZM10 18a.75.75 0 0 0 .53-.22l1.5-1.5a.75.75 0 1 0-1.06-1.06l-.22.22v-1.69a.75.75 0 0 0-1.5 0v1.69l-.22-.22a.75.75 0 0 0-1.06 1.06l1.5 1.5c.14.141.331.22.53.22Zm7.78-8.53a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 1 1-1.06-1.06l.22-.22h-1.69a.75.75 0 0 1 0-1.5h1.69l-.22-.22a.75.75 0 0 1 1.06-1.06l1.5 1.5Z"/></svg>
											</div>
											<div class="item bg-red-800 text-white delete delete-axios cursor-pointer" data-url="{{route('panel.habitaciones.galeria.destroy')}}" data-idx="{{$item -> id}}" title="Eliminar">
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="m20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37l3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/></svg>
											</div>
										</div>
										<div class="bg" style="background-image: url({{asset($item -> cover)}})">
											<img src="{{asset('panel/img/blank.gif')}}" alt="Base" class="w-100">
										</div>
									</div>
								@endforeach
							</div>
						</div>
					</div>
				</div>
				@endif
		</div>
	</div>
</div>

    <!-- Page content -->
    <div class="container-fluid mt--6">
        <div class="row">
            <div class="col">
                {{-- <form action="{{route('panel.habitaciones.store')}}" method="POST" enctype="multipart/form-data" class="form-submit-alert-wait">
                    @csrf
                    @method('PUT') --}}
                    
                {{-- </form> --}}
			</div>
        </div>
    </div>
@endsection

@push('script')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.2/dropzone.min.css" integrity="sha512-jU/7UFiaW5UBGODEopEqnbIAHOI8fO6T99m7Tsmqs2gkdujByJfkCbbfPSN4Wlqlb9TGnsuC0YgUgWkRBK7B9A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.2/min/dropzone.min.js" integrity="sha512-VQQXLthlZQO00P+uEu4mJ4G4OAgqTtKG1hri56kQY1DtdLeIqhKUp9W/lllDDu3uN3SnUNawpW7lBda8+dSi7w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/javascript">
        Dropzone.options.myDropzone = {
            paramName: 'file',
            maxFiles: 20,
            maxFilesize: 2,
            maxThumbnailFilesize: 2,
            autoProcessQueue: true,
            acceptedFiles: ".png,.jpg,.jpeg",
            init: function() {
                this.on("error", function (file, errorMessage) {
                    // this.removeFile(file);
                    console.log(errorMessage);

                    let msg = document.querySelector('.messages-alerts');
                    msg.innerHTML = `<div class="alert alert-danger" role="alert"> <small> ${errorMessage}</small>  </div>`;

                    setTimeout(() => {
                        msg.innerHTML = '';
                    }, 4000);
                });
                // this.on("queuecomplete", function(file) {
                //     setTimeout(() => {
                //         this.removeAllFiles();
                //     }, 4000);
                // });
                // this.on("success",
                //     this.processQueue.bind(this)
                // );
            }
        };
    </script>
@endpush
