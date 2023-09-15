import ShowEvent from '@/modules/events/Show.vue'
import ListEvents from '@/modules/events/List.vue'

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
  }
]
