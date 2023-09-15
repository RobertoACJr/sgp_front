import * as eventsApi from '@/modules/events/api/events.js';

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
