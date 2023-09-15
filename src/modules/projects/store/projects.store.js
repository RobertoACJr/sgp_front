export default {
  namespaced: true,
  state: {
    projects: [],
    currentProject: {},
  },
  getters: {
    getProjects: state => state.projects,
    getCurrentProject: state => state.currentProject,
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
  },
  actions: {
  },
}
