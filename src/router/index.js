import { createRouter, createWebHashHistory } from 'vue-router'
import eventsRouter from '@/modules/events/router'
import projectsRouter from '@/modules/projects/router'
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
  ...eventsRouter,
  ...projectsRouter,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (await window.$vue.$store.dispatch('verifyPermition', to.name)) {
    next();
  } else {
    // TODO lançar toast de aviso
    next({ name: 'login' });
  }
})

export default router
