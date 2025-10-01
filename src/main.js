// gambiarra, remover
window.addEventListener('error', (event) => {
  const msg = event?.message || '';
  if (msg.includes('ResizeObserver loop') || msg.includes('ResizeObserver loop limit exceeded')) {
    event.stopImmediatePropagation();
  }
});
// gambiarra, remover
window.addEventListener('unhandledrejection', (event) => {
  const msg = event?.reason?.message || '';
  if (msg.includes('ResizeObserver loop') || msg.includes('ResizeObserver loop limit exceeded')) {
    event.stopImmediatePropagation();
  }
});

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import Loading from '@/modules/core/components/Loading.vue'

loadFonts()

window.$vue = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('loading', Loading)
  .mount('#app')


// gambiarra, remover
const removeOverlay = () => {
  const overlay = document.getElementById('webpack-dev-server-client-overlay');
  if (overlay) {
    overlay.remove();
  }

  const iframe = document.querySelector('iframe[src*="webpack-dev-server"]');
  if (iframe) {
    iframe.remove();
  }
};

// gambiarra, remover
const interval = setInterval(() => {
  removeOverlay();
}, 100);

// gambiarra, remover
setTimeout(() => clearInterval(interval), 10000);