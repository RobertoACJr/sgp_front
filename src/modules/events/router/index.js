import ShowEvent from '@/modules/events/Show.vue'
import ListEvents from '@/modules/events/List.vue'
import CreateEvents from '@/modules/events/Create.vue'

export default [
  {
    path: '/',
    name: 'listEvents',
    component: ListEvents,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
    }
  },
  {
    path: '/event',
    name: 'showEvent',
    component: ShowEvent,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      hasPreviousView: 'listEvents',
    }
  },
  {
    path: '/event/create',
    name: 'createEvent',
    component: CreateEvents,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      hasPreviousView: 'listEvents',
      mainModule: "events",
      permission: "create",
    }
  }
]
