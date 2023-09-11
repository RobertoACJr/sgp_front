"use strict";

import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL_API

const _axios = axios.create();

_axios.interceptors.request.use(
  function (config) {
    const auth = window.$vue.$store.getters["auth/getToken"]
      ? `Bearer ${window.$vue.$store.getters["auth/getToken"]}`
      : '';
    if (auth) config.headers.common['Authorization'] = auth;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function (response) {
    window.$vue.$store.commit("auth/setToken", response?.data?.data?.authorization?.token || '');
    return response;
  },
  function (error) {
    if (error?.response?.status == 403) {
      window.$vue.$store.commit("auth/reset");
      window.$vue.$router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default _axios;
