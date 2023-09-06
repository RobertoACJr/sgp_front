import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { useVuelidate } from '@vuelidate/core'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

window.$vue = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

window.$vue.$v = useVuelidate()
