import * as authApi from '@/modules/core/api/auth.js';

export const login = async payload => {
  try {
    const { data } = await authApi.login(payload);
    window.$vue.$store.commit('setUser', data.data.user);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}