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
  const isSigned = await window.$vue.$store.dispatch('auth/isSigned')
  if (isSigned || to.name == 'login') {
    if (await window.$vue.$store.dispatch('permissions/verifyPermission', to)) {
      window.$vue.$store.dispatch('setNavBarConfig', to);
      next();
    }
  } else {
    next({ name: 'login' });
  }
})

export default router
