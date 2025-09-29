import Form from '@/modules/evaluator/Form.vue'
import List from '@/modules/evaluator/List.vue'
import Show from '@/modules/evaluator/Show.vue'

export default [
  {
    path: '/evaluator/create',
    name: 'createEvaluator',
    component: Form,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "users",
      permission: "create",
      hasPreviousView: 'listEvaluators',
    }
  },
  {
    path: '/evaluator/edit',
    name: 'editEvaluator',
    component: Form,
    props: route => ({
      isEditing: !!route.query.isEditing
    }),
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "users",
      permission: "create",
      hasPreviousView: 'showEvaluator',
    }
  },
  {
    path: '/evaluator/list',
    name: 'listEvaluators',
    component: List,
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
    component: Show,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "users",
      permission: "list", // TODO show
      hasPreviousView: 'listEvaluators',
    }
  }
]
