const defaultState = () => ({
    projects: [],
    currentProject: {},
    currentPage: 1,
    lengthOfPages: 1,
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getProjects: state => state.projects,
    getCurrentProject: state => state.currentProject,
    getCurrentPage: state => state.currentPage,
    getLenghtOfPages: state => state.lengthOfPages,
  },
  mutations: {
    reset(state) {
      Object.keys(state).forEach(k => state[k] = defaultState()[k]);
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
    setCurrentPage (state, currentPage) {
      state.currentPage = currentPage;
    },
    setLenghtOfPages (state, lengthOfPages) {
      state.lengthOfPages = lengthOfPages;
    },
  },
  actions: {
  },
}
