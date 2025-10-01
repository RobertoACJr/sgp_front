import * as exportApi from '@/modules/projects/api/export.js';
import { errorToast } from '@/modules/core/helpers/toastHelper';

export const exportProjectsBasicInformation = async () => {
  try {
    const { data } = await exportApi.exportProjectsBasicInformation();
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao exportar informações dos projetos 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const exportProjectsRanking = async () => {
  try {
    const { data } = await exportApi.exportProjectsRanking();
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao exportar Projetos 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const exportEvaluators = async () => {
  try {
    const { data } = await exportApi.exportEvaluators();
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao exportar as informações dos avaliadores 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
