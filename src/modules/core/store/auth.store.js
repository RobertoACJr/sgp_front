const defaultState = () => ({
  token: '',
  user: {},
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getToken: state => state.token,
    getUser: state => state?.user,
    getUserUuid: state => state?.user?.uuid,
  },
  mutations: {
    reset (state) {
      Object.keys(state).forEach(k => state[k] = defaultState()[k]);
    },
    setToken (state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    isSigned({ getters }) {
      return Boolean(getters.getToken);
    }
  },
}
