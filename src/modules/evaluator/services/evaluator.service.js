import * as evaluatorApi from '@/modules/evaluator/api/evaluator.js';
import { successToast, errorToast } from '@/modules/core/helpers/toastHelper';

export const list = async params => {
  try {
    const { data } = await evaluatorApi.list(params);
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao listar avaliadores 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const fetchUser = async uuid => {
  try {
    const { data } = await evaluatorApi.fetchUser(uuid);
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao buscar dados 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const create = async params => {
  try {
    const { data } = await evaluatorApi.create(params);
    successToast({ title: "Avaliador criado 🥳👍" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao cadastrar avaliador 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const update = async (uuid, params) => {
  try {
    const { data } = await evaluatorApi.update(uuid, params);
    successToast({ title: "Avaliador atualizado 🥳👍" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao editar avaliador 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
