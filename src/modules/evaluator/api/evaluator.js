import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('user', { params })
}

export const fetchUser = async (uuid) => {
  return axios.get(`user/${uuid}`)
}

export const create = async (payload) => {
  return axios.post('user/createEvaluator', payload);
}

export const update = async ({ payload, uuid }) => {
  return axios.put(`user/${uuid}`, payload);
}
