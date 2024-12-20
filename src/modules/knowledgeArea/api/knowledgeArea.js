import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('knowledgeArea', { params })
}

export const create = async (payload) => {
  return axios.post('knowledgeArea', payload);
}