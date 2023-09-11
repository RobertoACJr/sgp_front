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