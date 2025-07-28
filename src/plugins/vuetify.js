// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { VFileUpload } from 'vuetify/labs/VFileUpload';
export const vuetify = createVuetify({
    components: {
        ...components,
        VFileUpload,
    },
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#d32f2f', // Red primary color
                    secondary: '#f44336', // Red secondary
                    accent: '#ff1744', // Red accent
                    error: '#f44336',
                    warning: '#ff9800',
                    info: '#2196f3',
                    success: '#4caf50',
                    background: '#ffffff',
                    surface: '#ffffff',
                },
            },
            dark: {
                colors: {
                    primary: '#f44336', // Red primary for dark theme
                    secondary: '#e57373', // Light red secondary
                    accent: '#ff5722', // Red-orange accent
                    error: '#f44336',
                    warning: '#ff9800',
                    info: '#2196f3',
                    success: '#4caf50',
                    background: '#121212',
                    surface: '#1e1e1e',
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});
