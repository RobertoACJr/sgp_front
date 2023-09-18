import ShowEvaluation from "@/modules/evaluations/Show.vue"

export default [
  {
    path: "/evaluations/info",
    name: "showEvaluation",
    component: ShowEvaluation,
    props: true,
    meta: {
      needsAuthentication: true,
      onlyForAdmin: true,
      mainModule: "evaluations",
      hasNavBar: true,
      hasPreviousView: 'showProject',
    }
  },
]
