const defaultState = () => ({
    projects: [],
    currentProject: {},
    currentPage: 1,
    lengthOfPages: 1,
  fetchProject: true,
  fetchProjectsList: true,
    currentProjectEvaluationIndex: null,
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getProjects: state => state.projects,
    getCurrentProject: state => state.currentProject,
    getCurrentPage: state => state.currentPage,
    getLenghtOfPages: state => state.lengthOfPages,
    getCurrentProjectEvaluationIndex: state => state.currentProjectEvaluationIndex,
    getFetchProject: state => state.fetchProject,
    getFetchProjectsList: state => state.fetchProjectsList,
    getCurrentEvaluation: state => state.currentProject?.evaluations
      ? state.currentProject?.evaluations[state.currentProjectEvaluationIndex]
      : {},
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
    setFetchProject(state, fetch) {
      state.fetchProject = fetch;
    },
    setFetchProjectsList(state, fetch) {
      state.fetchProjectsList = fetch;
    },
    setCurrentProjectEvaluationIndex(state, index) {
      state.currentProjectEvaluationIndex = index;
    },
  },
  actions: {
  },
}
