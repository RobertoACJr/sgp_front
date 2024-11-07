const defaultState = () => ({
  projects: [],
  currentProject: {},
  currentPage: 1,
  lengthOfPages: 1,
  fetchProject: true,
  fetchProjectsList: true,
  currentProjectEvaluationIndex: null,
  categoryFilter: null,
  teachingLevelFilter: null,
  knowledgeAreaFilter: null,
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getProjects: state => state.projects,
    getCurrentProject: state => state.currentProject,
    getCurrentPage: state => state.currentPage,
    getLengthOfPages: state => state.lengthOfPages,
    getCurrentProjectEvaluationIndex: state => state.currentProjectEvaluationIndex,
    getFetchProject: state => state.fetchProject,
    getFetchProjectsList: state => state.fetchProjectsList,
    getCurrentEvaluation: state => state.currentProject?.evaluations
      ? state.currentProject?.evaluations[state.currentProjectEvaluationIndex]
      : {},
    getCategoryFilter: state => state.categoryFilter,
    getTeachingLevelFilter: state => state.teachingLevelFilter,
    getKnowledgeAreaFilter: state => state.knowledgeAreaFilter,
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
    setLengthOfPages (state, lengthOfPages) {
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
    setCategoryFilter(state, category) {
      state.categoryFilter = category;
    },
    setTeachingLevelFilter(state, teachingLevel) {
      state.teachingLevelFilter = teachingLevel;
    },
    setKnowledgeAreaFilter(state, knowledgeArea) {
      state.knowledgeAreaFilter = knowledgeArea;
    },
    setFilters(state, { category, teachingLevel, knowledgeArea }) {
      state.categoryFilter = category;
      state.teachingLevelFilter = teachingLevel;
      state.knowledgeAreaFilter = knowledgeArea;
    },
    resetFilters(state) {
      state.categoryFilter = null;
      state.teachingLevelFilter = null;
      state.knowledgeAreaFilter = null;
    },
  },
  actions: {
  },
}
