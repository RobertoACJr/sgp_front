// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import colors from 'vuetify/lib/util/colors'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.green.darken4,
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
          primary: colors.green.darken4,
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
