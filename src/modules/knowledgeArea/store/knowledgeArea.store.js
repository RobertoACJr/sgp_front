import * as knowledgeAreaService from '@/modules/knowledgeArea/services/knowledgeArea.service.js';

const defaultState = () => ({
  knowledgeAreasOptions: [],
  knowledgeAreasList: [],
  knowledgeArea: {},
  currentPage: 1,
  lengthOfPages: 1,
  fetchKnowledgeArea: true,
  fetchKnowledgeAreasList: true
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getKnowledgeAreas: state => state.knowledgeAreasList,
    getKnowledgeAreasOptions: state => state.knowledgeAreasOptions,
    getCurrentPage: state => state.currentPage,
    getLengthOfPages: state => state.lengthOfPages,
    getFetchKnowledgeArea: state => state.fetchKnowledgeArea,
    getFetchKnowledgeAreasList: state => state.fetchKnowledgeAreasList,
  },
  mutations: {
    reset(state) {
      Object.keys(state).forEach(k => state[k] = defaultState()[k]);
    },
    setKnowledgeAreas(state, knowledgeAreas) {
      state.knowledgeAreasList = knowledgeAreas;
    },
    setKnowledgeAreasOptions(state, knowledgeAreasOptions) {
      state.knowledgeAreasOptions = knowledgeAreasOptions;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setLengthOfPages(state, lengthOfPages) {
      state.lengthOfPages = lengthOfPages;
    },
    setFetchKnowledgeArea(state, boolean) {
      state.fetchKnowledgeArea = boolean;
    },
    setFetchKnowledgeAreasList(state, boolean) {
      state.fetchKnowledgeAreasList = boolean;
    },
  },
  actions: {
    async fetchKnowledgeAreaOptionsIfNecessary ({ getters, commit }) {
      try {
        if (getters.getKnowledgeAreasOptions.length) return
        const options = await knowledgeAreaService.listOptions();
        commit("setKnowledgeAreasOptions", options);
      } catch (erro) {
        console.log(erro)
        commit("setKnowledgeAreasOptions", [])
      }
    },
  },
}
