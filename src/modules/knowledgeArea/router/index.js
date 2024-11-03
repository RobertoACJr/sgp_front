import CreateKnowledgeArea from '@/modules/knowledgeArea/Create.vue'

export default [
  {
    path: '/knowledge-area/create',
    name: 'createKnowledgeArea',
    component: CreateKnowledgeArea,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "knowledge-areas",
      permission: "create",
      hasPreviousView: 'listEvents',
    }
  }
]
