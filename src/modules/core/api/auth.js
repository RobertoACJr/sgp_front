import axios from "@/plugins/axios";

export const login = async (payload) => {
  return axios.post('auth/login', payload)
}