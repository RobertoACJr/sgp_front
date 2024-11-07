import { createRouter, createWebHistory } from "vue-router"
import evaluationsRouter from "@/modules/evaluations/router"
import eventsRouter from "@/modules/events/router"
import knowledgeAreaRouter from "@/modules/knowledgeArea/router"
import projectsRouter from "@/modules/projects/router"
import evaluatorRouter from "@/modules/evaluator/router"

import Login from "@/modules/auth/Login.vue"
import SignUp from "@/modules/auth/SignUp.vue"

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      needsAuthentication: false
    }
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp,
    meta: {
      needsAuthentication: false
    }
  },
  ...evaluationsRouter,
  ...eventsRouter,
  ...knowledgeAreaRouter,
  ...projectsRouter,
  ...evaluatorRouter,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const setToast = (title, text, status = "error") => {
  window.$vue.$store.dispatch("setToastConfig", { status, title, text })
}

const handleNext = (next, to) => {
  window.$vue.$store.dispatch("setNavBarConfig", to);
  next();
}

const handleRouteNotAllowed = () => {
  setToast("Acesso não permitido")
}

const handleForceNextToOtherPage = (next, name) => {
  handleRouteNotAllowed()
  next({ name })
}

const isOnlyForAdmin = (to, next) => {
  const PREVIOUS_PAGE = to.meta?.hasPreviousView || "listEvents"
  const isAdmin = window.$vue.$store.getters["permissions/getIsAdmin"]
  if (!isAdmin && to.meta?.onlyForAdmin) {
    handleForceNextToOtherPage(next, PREVIOUS_PAGE)
    return true
  }
  return false
}

const isSigned = () => {
  return window.$vue.$store.dispatch("auth/isSigned")
}

const hasPermission = async (to) => {
  return await window.$vue.$store.dispatch("permissions/verifyRoutePermission", to)
}

router.beforeEach(async (to, from, next) => {
  try {
    if (isSigned()) {
      if (isOnlyForAdmin(to, next)) return

      const HAS_PERMISSION = await hasPermission(to)
      if (!HAS_PERMISSION) return handleForceNextToOtherPage(next, "listEvents")

      handleNext(next, to)
    } else if (!to.needsAuthentication) {
      handleNext(next, to)
    } else {
      handleForceNextToOtherPage(next, "login")
    }
  } catch (error) {
    console.log(error)
    handleForceNextToOtherPage(next, "listEvents")
  }
})

export default router
