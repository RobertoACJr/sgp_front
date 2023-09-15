import { createStore } from 'vuex'
import auth from '@/modules/core/store/auth.store.js';
import events from '@/modules/events/store/events.store.js';
import permissions from '@/modules/core/store/permissions.store.js';
import projects from '@/modules/projects/store/projects.store.js';

export default createStore({
  state: {
    showNavBar: false,
    hasViewToGoBack: false,
  },
  getters: {
    getShowNavBar: state => state.showNavBar,
    getHasViewToGoBack: state => state.hasViewToGoBack,
  },
  mutations: {
    setShowNavBar (state, showNavBar) {
      state.showNavBar = showNavBar;
    },
    setHasViewToGoBack (state, hasViewToGoBack) {
      state.hasViewToGoBack = hasViewToGoBack;
    },
  },
  actions: {
    setNavBarConfig({ commit }, to) {
      commit('setShowNavBar', Boolean(to.meta.hasNavBar));
      commit('setHasViewToGoBack', to.meta.hasPreviousView || '');
    }
  },
  modules: {
    auth,
    events,
    permissions,
    projects,
  }
})
