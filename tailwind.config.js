import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Ubuntu', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#fff1f0',
                    100: '#ffe0de',
                    200: '#ffc5c2',
                    300: '#ffa09b',
                    400: '#ff6b63',
                    500: '#ff4328',
                    600: '#e63519',
                    700: '#bf2a12',
                    800: '#992310',
                    900: '#7a1f10',
                    950: '#420c05',
                },
            },
            boxShadow: {
                'crm': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
                'crm-md': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
                'crm-lg': '0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
            },
        },
    },

    plugins: [forms],
};
