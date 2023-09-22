import axios from "@/plugins/axios";

export const startEvaluation = async (payload) => {
  return axios.post('project/startsEvaluation', payload);
}

export const changeEvaluationStatus = async (payload) => {
  return axios.put('evaluation/changeStatus', payload);
}
