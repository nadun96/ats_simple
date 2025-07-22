import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

export const vuetify = createVuetify({
  components:{
    ...components,
    VFileUpload,
  },
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#d32f2f',
          secondary: '#f44336',
          accent: '#ff1744',
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
          primary: '#f44336',
          secondary: '#e57373',
          accent: '#ff5722',
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
    sets: { mdi },
  },
})

export default vuetify
