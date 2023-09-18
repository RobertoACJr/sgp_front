import ListProjects from "@/modules/projects/List.vue"
import ShowProject from "@/modules/projects/Show.vue"
import RateProject from "@/modules/projects/Rate.vue"

export default [
  {
    path: "/projects",
    name: "listProjects",
    component: ListProjects,
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      hasNavBar: true,
      hasPreviousView: 'listEvents',
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
  }
]
