const INITIAL_STATE = {
  listEvents: [],
  currentEvent: {},
  shouldFetchEventPermissions: true
}

export default {
  namespaced: true,
  state: JSON.parse(JSON.stringify(INITIAL_STATE)),
  getters: {
    getListEvents: state => state.listEvents,
    getCurrentEvent: state => state.currentEvent,
    getShouldFetchEventPermissions: state => state.shouldFetchEventPermissions,
  },
  mutations: {
    setListEvents(state, eventsList) {
      state.listEvents = eventsList;
    },
    setCurrentEvent(state, eventObj) {
      state.currentEvent = eventObj;
    },
    setShouldFetchEventPermissions(state, boolean) {
      state.shouldFetchEventPermissions = boolean
    },
    reset(state) {
      Object.assign(state, JSON.parse(JSON.stringify(INITIAL_STATE)))
    },
  },
  actions: {},
}
