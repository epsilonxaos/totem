import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/plugins/datepicker.css',
                'resources/js/admin/reservaciones/app.js',
            ],
            refresh: [
                'resources/css/**',
                'resources/js/**',
                'routes/**',
                'resources/views/**',
            ],
        }),
    ],
});
