import List from "@/modules/projects/List.vue"
import Show from "@/modules/projects/Show.vue"
import Rate from "@/modules/projects/Rate.vue"
import Form from "@/modules/projects/Form.vue"

export default [
  {
    path: "/projects",
    name: "listProjects",
    component: List,
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      hasNavBar: true,
      hasPreviousView: "showEvent",
    }
  },
  {
    path: "/projects/info",
    name: "showProject",
    component: Show,
    props: route => ({
      continueEvaluation: !!route.query.continueEvaluation
    }),
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      hasNavBar: true,
      hasPreviousView: 'listProjects',
    }
  },
  {
    path: "/projects/rate",
    name: "rateProject",
    component: Rate,
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      hasNavBar: true,
      hasPreviousView: 'showProject',
    }
  },
  {
    path: "/projects/create",
    name: "createProject",
    component: Form,
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      hasNavBar: true,
      hasPreviousView: 'listProjects',
    }
  },
  {
    path: "/projects/edit",
    name: "editProject",
    component: Form,
    props: route => ({
      isEditing: !!route.query.isEditing
    }),
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      hasNavBar: true,
      hasPreviousView: 'listProjects',
    }
  }
]
