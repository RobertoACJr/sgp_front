import * as knowledgeAreaApi from '@/modules/knowledgeArea/api/knowledgeArea.js';
import { successToast, errorToast } from '@/modules/core/helpers/toastHelper';

export const list = async params => {
  try {
    const { data } = await knowledgeAreaApi.list(params);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const create = async params => {
  try {
    const { data } = await knowledgeAreaApi.create(params);
    successToast({ title: "Área do conhecimento criada 🥳👍" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao Cadastrar Área do conhecimento 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
