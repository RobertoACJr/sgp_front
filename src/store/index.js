import { createStore } from 'vuex'
import auth from '@/modules/core/store/auth.store.js';
import events from '@/modules/events/store/events.store.js';
import permitions from '@/modules/core/store/permitions.store.js';
import projects from '@/modules/projects/store/projects.store.js';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    events,
    permitions,
    projects,
  }
})
