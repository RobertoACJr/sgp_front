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
      // permition: "list",
    }
  },
  {
    path: "/projects/info",
    name: "showProject",
    component: ShowProject,
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      // permition: "view",
    }
  },
  {
    path: "/projects/rate",
    name: "rateProject",
    component: RateProject,
    meta: {
      needsAuthentication: true,
      mainModule: "projects",
      // permition: "rate",
    }
  }
]
