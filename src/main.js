import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { useVuelidate } from '@vuelidate/core'
import { loadFonts } from './plugins/webfontloader'

import Loading from '@/modules/core/components/Loading.vue'

loadFonts()

window.$vue = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('loading', Loading)
  .mount('#app')

window.$vue.$v = useVuelidate()
