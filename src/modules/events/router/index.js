import Show from '@/modules/events/Show.vue'
import List from '@/modules/events/List.vue'
import Form from '@/modules/events/Form.vue'

export default [
  {
    path: '/',
    name: 'listEvents',
    component: List,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
    }
  },
  {
    path: '/event',
    name: 'showEvent',
    component: Show,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      hasPreviousView: 'listEvents',
    }
  },
  {
    path: '/event/create',
    name: 'createEvent',
    component: Form,
    meta: {
      needsAuthentication: true,
      hasNavBar: true,
      hasPreviousView: 'listEvents',
      mainModule: "events",
      permission: "create",
    }
  },
    {
      path: "/event/edit",
      name: "editEvent",
      component: Form,
      props: route => ({
        isEditing: !!route.query.isEditing
      }),
      meta: {
        needsAuthentication: true,
        mainModule: "event",
        hasNavBar: true,
        hasPreviousView: 'listEvents',
      }
    }
]
