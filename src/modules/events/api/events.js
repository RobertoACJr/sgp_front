import axios from "@/plugins/axios";

export const list = async (params) => {
  return axios.get('event', { params })
}