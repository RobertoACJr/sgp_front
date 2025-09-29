// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import colors from 'vuetify/lib/util/colors'
import { pt } from 'vuetify/lib/locale'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  locale: {
    locale: 'pt',
    messages: { pt },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.green.darken2,
          'primary-darken-1': colors.green.darken4,
          light_primary: colors.green.lighten4,
          secondary: colors.blue.darken3,
          tertiary: colors.red.darken3,
          light_gray: colors.grey.lighten2,
          warning: colors.orange.darken2,
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.green.darken2,
          'primary-darken-1': colors.green.darken4,
          light_primary: colors.green.lighten4,
          secondary: colors.blue.darken3,
          tertiary: colors.red.darken3,
          light_gray: colors.grey.lighten2,
          warning: colors.orange.darken2,
        }
      },
    },
  },
})
