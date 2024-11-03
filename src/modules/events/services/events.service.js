import * as eventsApi from '@/modules/events/api/events.js';
import { successToast, errorToast } from '@/modules/core/helpers/toastHelper';

export const list = async params => {
  try {
    const { data } = await eventsApi.list(params);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getEventPermissions = async params => {
  try {
    const { data } = await eventsApi.getEventPermissions(params);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const create = async params => {
  try {
    const { data } = await eventsApi.create(params);
    successToast({ title: "Evento criado 🥳👍" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao Cadastrar Evento 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
