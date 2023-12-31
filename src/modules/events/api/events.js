import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('event', { params })
}

export const getEventPermissions = async (payload) => {
  return axios.post('event/savePermissions', payload)
}