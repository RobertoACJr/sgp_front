export default {
  namespaced: true,
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
      if (to.meta?.permition) {
        return Boolean(Object.keys(getters.getPermitions?.length)) &&
          getters.getPermitions[to.meta.mainModule] &&
          Boolean(getters.getPermitions[to.meta.mainModule].includes(to.meta.permition))
      }
      return true;
    },
  },
}
