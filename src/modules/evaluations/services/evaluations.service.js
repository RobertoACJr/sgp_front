import * as evaluationApi from '@/modules/evaluations/api/evaluations.js';
import { errorToast } from '@/modules/core/helpers/toastHelper';

export const startEvaluation = async params => {
  try {
    const { data } = await evaluationApi.startEvaluation(params);
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao iniciar avaliação do Projeto",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const changeEvaluationStatus = async params => {
  try {
    const { data } = await evaluationApi.changeEvaluationStatus(params);
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha mudar status da avaliação",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
