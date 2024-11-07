import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('event', { params })
}

export const saveEventPermission = async (payload) => {
  return axios.post('event/savePermissions', payload)
}

export const create = async (payload) => {
  return axios.post('event', payload);
}