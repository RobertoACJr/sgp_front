export default {
  state: {
    permitions: {}
  },
  getters: {
    getPermitions: state => state.permitions,
  },
  mutations: {
    setPermitions(state, permitions) {
      state.permitions = permitions;
    },
  },
  actions: {
    verifyPermition({ getters }, to) {
      return to.meta?.permition
        ? Boolean(getters.getPermitions[to.meta.mainModule].includes(to.meta.permition))
        : true;
    },
  },
}
