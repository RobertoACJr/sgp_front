export default {
  namespaced: true,
  state: {
    projects: [],
    currentProject: {},
    currentPage: 1,
    lenghtOfPages: 1,
  },
  getters: {
    getProjects: state => state.projects,
    getCurrentProject: state => state.currentProject,
    getCurrentPage: state => state.currentPage,
    getLenghtOfPages: state => state.lenghtOfPages,
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
    setCurrentPage (state, currentPage) {
      state.currentPage = currentPage;
    },
    setLenghtOfPages (state, lenghtOfPages) {
      state.lenghtOfPages = lenghtOfPages;
    },
  },
  actions: {
  },
}
