import * as authApi from '@/modules/core/api/auth.js';

export const login = async payload => {
  try {
    const { data } = await authApi.login(payload);
    window.$vue.$store.commit('auth/setUser', data?.data?.user);
    return data;
  } catch (error) {
    console.error(error);
    window.$vue.$store.dispatch("setToastConfig", {
      status: "error",
      title: "Falha ao fazer Login",
      text: error?.response?.data?.message || "Falha ao Avaliar Projeto",
    })
    throw error;
  }
}