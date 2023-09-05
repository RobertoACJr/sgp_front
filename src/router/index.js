import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      needsAuthentication: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
