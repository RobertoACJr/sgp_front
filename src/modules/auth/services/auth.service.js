import * as authApi from '@/modules/auth/api/auth.js';
import { errorToast, successToast } from '@/modules/core/helpers/toastHelper';

export const login = async payload => {
  try {
    const { data } = await authApi.login(payload);
    window.$vue.$store.commit('auth/setUser', data?.data?.user);
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao fazer Login",
      text: error?.response?.data?.message || "",
    })
    throw error;
  }
}

export const changePassword = async payload => {
  try {
    const { data } = await authApi.changePassword(payload);
    successToast({ title: "Senha alterada com sucesso 🥳👍" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao mudar a senha",
      text: error?.response?.data?.message || "",
    })
    throw error;
  }
}