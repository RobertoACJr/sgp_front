const defaultState = () => ({
  evaluators: [],
  currentEvaluator: {},
  currentPage: 1,
  lengthOfPages: 1,
  fetchEvaluator: true,
  fetchEvaluatorsList: true,
  currentEvaluatorEvaluationIndex: null,
  categoryFilter: null,
  teachingLevelFilter: null,
  knowledgeAreaFilter: null,
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getEvaluators: state => state.evaluators,
    getCurrentEvaluator: state => state.currentEvaluator,
    getCurrentPage: state => state.currentPage,
    getLenghtOfPages: state => state.lengthOfPages,
    getCurrentEvaluatorEvaluationIndex: state => state.currentEvaluatorEvaluationIndex,
    getFetchEvaluator: state => state.fetchEvaluator,
    getFetchEvaluatorsList: state => state.fetchEvaluatorsList,
    getCurrentEvaluation: state => state.currentEvaluator?.evaluations
      ? state.currentEvaluator?.evaluations[state.currentEvaluatorEvaluationIndex]
      : {},
    getCategoryFilter: state => state.categoryFilter,
    getTeachingLevelFilter: state => state.teachingLevelFilter,
    getKnowledgeAreaFilter: state => state.knowledgeAreaFilter,
  },
  mutations: {
    reset(state) {
      Object.keys(state).forEach(k => state[k] = defaultState()[k]);
    },
    setEvaluators(state, evaluators) {
      state.evaluators = evaluators;
    },
    setCurrentEvaluator(state, evaluator) {
      state.currentEvaluator = evaluator;
    },
    setCurrentPage (state, currentPage) {
      state.currentPage = currentPage;
    },
    setLenghtOfPages (state, lengthOfPages) {
      state.lengthOfPages = lengthOfPages;
    },
    setFetchEvaluator(state, fetch) {
      state.fetchEvaluator = fetch;
    },
    setFetchEvaluatorsList(state, fetch) {
      state.fetchEvaluatorsList = fetch;
    },
    setCurrentEvaluatorEvaluationIndex(state, index) {
      state.currentEvaluatorEvaluationIndex = index;
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
