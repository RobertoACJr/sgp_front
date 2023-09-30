import { createRouter, createWebHistory } from 'vue-router'
import evaluationsRouter from '@/modules/evaluations/router'
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
  ...evaluationsRouter,
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
    if (to.meta.onlyForAdmin && !window.$vue.$store.getters['permissions/getIsAdmin']) {
      next({ name: to.meta?.hasPreviousView || 'listEvents' })
    } else if (await window.$vue.$store.dispatch('permissions/verifyPermission', to)) {
      window.$vue.$store.dispatch('setNavBarConfig', to);
      next();
    }
  } else {
    window.$vue.$store.dispatch("setToastConfig", {
      status: "error",
      title: "Usuário não autenticado",
      text: "Por favor, faça login novamente!"
    })
    next({ name: 'login' });
  }
})

export default router
