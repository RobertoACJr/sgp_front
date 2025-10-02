import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('project', { params })
}

export const getStartedEvaluation = async () => {
  return axios.get("project/evaluationStarted")
}

export const show = async (uuid) => {
  return axios.get(`project/${uuid}`,)
}

export const create = async (payload) => {
  return axios.post('project', payload);
}

export const update = async (uuid, params) => {
  return axios.put(`project/${uuid}`, params);
}

export const rate = async (payload) => {
  return axios.post('evaluation', payload);
}
