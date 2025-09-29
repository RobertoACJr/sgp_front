import createEvaluator from '@/modules/evaluator/Create.vue'
import listEvaluators from '@/modules/evaluator/List.vue'
import showEvaluator from '@/modules/evaluator/Show.vue'

export default [
  {
    path: '/evaluator/create',
    name: 'createEvaluator',
    component: createEvaluator,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "users",
      permission: "create",
      hasPreviousView: 'listEvaluators',
    }
  },
  {
    path: '/evaluator/list',
    name: 'listEvaluators',
    component: listEvaluators,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "users",
      permission: "list",
      hasPreviousView: 'showEvent',
    }
  },
  {
    path: '/evaluator/info',
    name: 'showEvaluator',
    component: showEvaluator,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "users",
      permission: "list", // TODO show
      hasPreviousView: 'listEvaluators',
    }
  }
]
