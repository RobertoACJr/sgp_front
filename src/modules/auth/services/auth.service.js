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

export const signUp = async payload => {
  try {
    const { data } = await authApi.signUp(payload);
    successToast({ title: "Usuário Cadastrado com sucesso!" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao cadastrar usuário",
      text: error?.response?.data?.message || "",
    })
    throw error;
  }
}

export const forgottenPasswordGetToken = async payload => {
  try {
    const { data } = await authApi.forgottenPasswordGetToken(payload);
    successToast({ title: "Verifique seu E-mail!" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao processar solicitação",
      text: error?.response?.data?.message || "",
    })
    throw error;
  }
}

export const forgottenPasswordSendToken = async payload => {
  try {
    const { data } = await authApi.forgottenPasswordSendToken(payload);
    successToast({ title: "Senha alterada com sucesso! 🥳👍" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao processar solicitação",
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