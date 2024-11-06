import * as evaluatorApi from '@/modules/evaluator/api/evaluator.js';
import { successToast, errorToast } from '@/modules/core/helpers/toastHelper';

export const list = async params => {
  try {
    const { data } = await evaluatorApi.list(params);
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao Listar Avaliadores 😿",
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
      title: "Falha ao Cadastrar Avaliador 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
