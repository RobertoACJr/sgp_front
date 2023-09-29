import * as exportApi from '@/modules/projects/api/export.js';

export const exportProjectsRanking = async () => {
  try {
    const { data } = await exportApi.exportProjectsRanking();
    return data;
  } catch (error) {
    console.error(error);
    window.$vue.$store.dispatch("setToastConfig", {
      status: "error",
      title: "Falha ao exportar Projetos",
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
    window.$vue.$store.dispatch("setToastConfig", {
      status: "error",
      title: "Falha ao exportar as informações dos avaliadores",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
