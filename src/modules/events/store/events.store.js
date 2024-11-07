export default {
  namespaced: true,
  state: {
    listEvents: [],
    currentEvent: {},
  },
  getters: {
    getListEvents: state => state.listEvents,
    getCurrentEvent: state => state.currentEvent,
  },
  mutations: {
    setListEvents(state, events) {
      state.listEvents = events;
    },
    setCurrentEvent(state, event) {
      state.currentEvent = event;
    }
  },
  actions: {
  },
}
