import axios from "@/plugins/axios";

export const exportProjectsRanking = async () => {
  return axios.get('report/exportRanking')
}

export const exportEvaluators = async () => {
  return axios.get('report/exportEvaluators')
}
