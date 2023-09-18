import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('project', { params })
}

export const show = async (uuid) => {
  return axios.get(`project/${uuid}`,)
}

export const rate = async (payload) => {
  return axios.post('evaluation', payload);
}

export const startEvaluation = async (payload) => {
  return axios.post('project/startsEvaluation', payload);
}
