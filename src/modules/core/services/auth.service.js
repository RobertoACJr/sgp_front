import * as authApi from '@/modules/core/api/auth.js';
import { errorToast } from '@/modules/core/helpers/toastHelper';

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