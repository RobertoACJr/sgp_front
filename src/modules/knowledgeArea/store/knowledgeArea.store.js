import * as knowledgeAreaService from '@/modules/knowledgeArea/services/knowledgeArea.service.js';

const defaultState = () => ({
  knowledgeArea: [],
})

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getKnowledgeAreas: state => state.knowledgeArea,
  },
  mutations: {
    reset(state) {
      Object.keys(state).forEach(k => state[k] = defaultState()[k]);
    },
    setKnowledgeAreas(state, knowledgeArea) {
      state.knowledgeArea = knowledgeArea;
    },
  },
  actions: {
    async fetchKnowledgeAreaOptionsIfNecessary ({ getters, commit }) {
      try {
        if (getters.getKnowledgeAreas.length) return
        const options = await knowledgeAreaService.listOptions();
        commit("setKnowledgeAreas", options);
      } catch (erro) {
        console.log(erro)
        commit("setKnowledgeAreas", [])
      }
    },
  },
}
