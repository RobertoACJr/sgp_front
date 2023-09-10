export default {
  state: {
    projects: [],
  },
  getters: {
    getProjects: state => state.projects,
  },
  mutations: {
    setProjects({ state }, event) {
      state.projects = event;
    }
  },
  actions: {
  },
}
