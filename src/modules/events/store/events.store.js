export default {
  namespaced: true,
  state: {
    currentEvent: {},
  },
  getters: {
    getCurrentEvent: state => state.currentEvent,
  },
  mutations: {
    setCurrentEvent({ state }, event) {
      state.currentEvent = event;
    }
  },
  actions: {
  },
}
