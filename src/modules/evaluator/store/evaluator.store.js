const defaultState = () => ({
  evaluators: [],
  currentEvaluator: {},
  currentPage: 1,
  lengthOfPages: 1,
  fetchEvaluator: true,
  fetchEvaluatorsList: true,
  currentEvaluatorEvaluationIndex: null,
  filter: {
    isApproved: {
      value: null,
      name: 'Usuários: ',
      displayValue: null,
      kind: 'string',
      searchable: 'is_approved',
    },
    email: {
      value: null,
      name: 'E-mail: ',
      displayValue: null,
      kind: 'string',
      searchable: 'email'
    },
    knowledgeAreas: {
      value: null,
      name: 'Área do Conhecimento: ',
      displayValue: null, 
      kind: 'array',
      searchable: 'knowledge_areas'
    },
  }
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getEvaluators: state => state.evaluators,
    getCurrentEvaluator: state => state.currentEvaluator,
    getCurrentPage: state => state.currentPage,
    getLengthOfPages: state => state.lengthOfPages,
    getCurrentEvaluatorEvaluationIndex: state => state.currentEvaluatorEvaluationIndex,
    getFetchEvaluator: state => state.fetchEvaluator,
    getFetchEvaluatorsList: state => state.fetchEvaluatorsList,
    getCurrentEvaluation: state => state.currentEvaluator?.evaluations
      ? state.currentEvaluator?.evaluations[state.currentEvaluatorEvaluationIndex]
      : {},
    getFilters: state => state.filter,
    getDisplayFilterFormatted: state => (key, value) => {
      const { name, displayValue, kind, searchable } = state.filter[key];
      return {
        title: `${name}${displayValue || value?.title || value}`,
        value,
        key,
        kind,
        searchable
      } 
    },
    getFiltersToDisplayByFilterKey: (state, getters) => (key) => {
      const { kind, value } = state.filter[key]
      if (kind == 'array') {
        return value?.length
          ? value.map(v => getters.getDisplayFilterFormatted(key, v))
          : []
      }
      return value ? [getters.getDisplayFilterFormatted(key, value)] : []
    },
    getDisplayFilters: (state, getters) => {
      const FILTERS_KEYS = Object.keys(state.filter)
      const FILTERS = []
      FILTERS_KEYS.forEach(key => FILTERS.push(...getters.getFiltersToDisplayByFilterKey(key)))
      return FILTERS
    },
    getFiltersToFetch: state => {
      const PARAMS = []
      if (state.filter.isApproved.value != null) PARAMS.is_approved = !state.filter.isApproved.value
      if (state.filter.email.value) PARAMS.email = state.filter.email.value
      if (state.filter.knowledgeAreas.value?.length) {
        PARAMS.knowledgeAreas = state.filter.knowledgeAreas.value.map(value => value.value || value)
      }

      return PARAMS
    },
    getFilterIsApproved: state => state.filter?.isApproved.value,
    getFilterEmail: state => state.filter?.email.value,
    getFilterKnowledgeAreas: state => state.filter?.knowledgeAreas.value,
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
    setLengthOfPages (state, lengthOfPages) {
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
    setFilterIsApproved(state, isApproved) {
      state.filter.isApproved.value = isApproved;
      state.filter.isApproved.displayValue = isApproved ? 'Aprovados' : 'Restringidos'
    },
    setFilterEmail(state, email) {
      state.filter.email.value = email;
    },
    setFilterKnowledgeAreas(state, knowledgeAreas) {
      state.filter.knowledgeAreas.value = knowledgeAreas;
    },
    resetFilters(state) {
      state.isApproved = null;
      state.email = null;
      state.knowledgeAreas = null;
    },
    removeFilter(state, { key, value, kind }) {
      if (kind == 'string') {
        state.filter[key].value = null
      }
      if (kind == 'array') {
        state.filter[key].value = state.filter[key].value.filter(v => v != value)
      }
    }
  },
  actions: {
    setFilters({ commit }, { isApproved, email, knowledgeAreas }) {
      commit("setFilterIsApproved", isApproved)
      commit("setFilterEmail", email)
      commit("setFilterKnowledgeAreas", knowledgeAreas)
    },
  },
}
