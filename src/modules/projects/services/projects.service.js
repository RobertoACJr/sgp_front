import * as projectApi from '@/modules/projects/api/projects.js';

export const list = async params => {
  try {
    const { data } = await projectApi.list(params);
    return data;
  } catch (error) {
    console.error(error);
    window.$vue.$store.dispatch("setToastConfig", {
      status: "error",
      title: "Falha ao Listar Projetos",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const rate = async params => {
  try {
    const { data } = await projectApi.rate(params);
    return data;
  } catch (error) {
    console.error(error);
    window.$vue.$store.dispatch("setToastConfig", {
      status: "error",
      title: "Falha ao Avaliar Projeto",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const startEvaluation = async params => {
  try {
    const { data } = await projectApi.startEvaluation(params);
    return data;
  } catch (error) {
    console.error(error);
    window.$vue.$store.dispatch("setToastConfig", {
      status: "error",
      title: "Falha ao iniciar avaliação do Projeto",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
