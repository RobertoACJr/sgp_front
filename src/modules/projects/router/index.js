import ListProjects from "@/modules/projects/List.vue"
import ShowProject from "@/modules/projects/Show.vue"
import RateProject from "@/modules/projects/Rate.vue"
import CreateProject from "@/modules/projects/Create.vue"

export default [
  {
    path: "/projects",
    name: "listProjects",
    component: ListProjects,
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
    component: ShowProject,
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
    component: RateProject,
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
    component: CreateProject,
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
    component: CreateProject,
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
