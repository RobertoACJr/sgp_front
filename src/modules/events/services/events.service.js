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

export const saveEventPermission = async params => {
  try {
    const { data } = await eventsApi.saveEventPermission(params);
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao requisitar dados do evento 😿",
      text: error.response.data.message || "",
    })
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
      title: "Falha ao cadastrar evento 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}

export const update = async (uuid, params) => {
  try {
    const { data } = await eventsApi.update(uuid, params);
    successToast({ title: "Evento atualizado 🥳👍" })
    return data;
  } catch (error) {
    console.error(error);
    errorToast({
      title: "Falha ao atualizar evento 😿",
      text: error.response.data.message || "",
    })
    throw error;
  }
}
