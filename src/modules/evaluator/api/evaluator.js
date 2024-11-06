import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('user', { params })
}

export const create = async (payload) => {
  return axios.post('user/createEvaluator', payload);
}