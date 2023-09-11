import ShowEvent from '@/modules/events/Show.vue'
import ListEvents from '@/modules/events/List.vue'

export default [
  {
    path: '/',
    name: 'listEvents',
    component: ListEvents,
    meta: {
      needsAuthentication: true,
    }
  },
  {
    path: '/event',
    name: 'showEvent',
    component: ShowEvent,
    meta: {
      needsAuthentication: true,
      mainModule: "events",
      permition: "show",
    }
  }
]
