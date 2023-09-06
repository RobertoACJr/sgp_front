import { createRouter, createWebHashHistory } from 'vue-router'
import ListEvents from '@/modules/events/ListEvents.vue'
import Login from '@/modules/login/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      needsAuthentication: false
    }
  },
  {
    path: '/',
    name: 'eventsList',
    component: ListEvents,
    meta: {
      needsAuthentication: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
