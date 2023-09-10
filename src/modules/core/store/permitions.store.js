export default {
  state: {
    permitions: {
      events: ["list", "show", "create", "update"],
      projects: ["list", "show", "rate"],
    }
  },
  getters: {
    getPermitions: state => state.permitions,
  },
  mutations: {
  },
  actions: {
    verifyPermition({ getters }, to) {
      return to.meta?.permition
        ? Boolean(getters.getPermitions[to.meta.mainModule].includes(to.meta.permition))
        : true;
    },
  },
}
