import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.needsAuthentication) {
    const isSigned = await window.$vue.$store.dispatch('auth/isSigned')
    if (!isSigned) next({ name: 'login' });
  }
  if (await window.$vue.$store.dispatch('permitions/verifyPermition', to)) {
    next();
  } else {
    // TODO lançar toast de aviso
    next({ name: 'login' });
  }
})

export default router
