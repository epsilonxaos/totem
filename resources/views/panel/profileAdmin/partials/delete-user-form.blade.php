<section class="space-y-6">
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('Eliminar cuenta') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600">
            {{ __('Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán de forma permanente. Antes de eliminar su cuenta, descargue cualquier dato o información que desee conservar.') }}
        </p>
    </header>

    @can(PermissionKey::Admin['permissions']['destroy']['name'])
        <x-danger-button x-data="" x-on:click.prevent="$dispatch('open-modal', 'confirm-user-deletion')">
            {{ __('Eliminar cuenta') }}</x-danger-button>
    @endcan

    <x-modal name="confirm-user-deletion" :show="$errors->userDeletion->isNotEmpty()" focusable>
        @can(PermissionKey::Admin['permissions']['destroy']['name'])
            @if ($profile)
                <form method="post" action="{{ route('panel.profile.destroy') }}" class="p-6">
                @else
                    <form method="post" action="{{ route('panel.usuarios.destroy', ['id' => $user->id]) }}" class="p-6">
            @endif
            @csrf
            @method('delete')
            @elsecan
            <form>
            @endcan

            <h2 class="text-lg font-medium text-gray-900">
                {{ __('¿Estás seguro de que quieres eliminar tu cuenta?') }}
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                {{ __('Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán de forma permanente. Ingrese su contraseña para confirmar que desea eliminar su cuenta de forma permanente.') }}
            </p>

            <div class="mt-6">
                <x-input-label for="password" value="{{ __('Password') }}" class="sr-only" />

                <x-text-input id="password" name="password" type="password" class="mt-1 block w-3/4"
                    placeholder="{{ __('Contraseña') }}" />

                <x-input-error :messages="$errors->userDeletion->get('password')" class="mt-2" />
            </div>

            <div class="mt-6 flex justify-end">
                <x-secondary-button x-on:click="$dispatch('close')">
                    {{ __('Cancelar') }}
                </x-secondary-button>

                @can(PermissionKey::Admin['permissions']['destroy']['name'])
                    <x-danger-button class="ml-3">
                        {{ __('Eliminar cuenta') }}
                    </x-danger-button>
                @endcan
            </div>
        </form>
    </x-modal>
</section>
