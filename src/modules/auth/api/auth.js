import axios from "@/plugins/axios";

export const login = async (payload) => {
  return axios.post('auth/login', payload)
}

export const signUp = async (payload) => {
  return axios.post('sign-up', payload)
}

export const forgottenPasswordGetToken = async (payload) => {
  return axios.post('auth/resetPass', payload)
}

export const forgottenPasswordSendToken = async (payload) => {
  return axios.post('auth/changePassword', payload)
}

export const changePassword = async (payload) => {
  return axios.post('user/changePassword', payload)
}