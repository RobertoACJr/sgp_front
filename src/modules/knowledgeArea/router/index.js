import CreateKnowledgeArea from '@/modules/knowledgeArea/Create.vue'
import ListKnowledgeAreas from '@/modules/knowledgeArea/List.vue'

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
      hasPreviousView: 'showEvent',
    }
  },
  {
    path: '/knowledge-area/list',
    name: 'listKnowledgeAreas',
    component: ListKnowledgeAreas,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      mainModule: "knowledge-areas",
      permission: "list",
      hasPreviousView: 'showEvent',
    }
  }
]
