import axios, { AxiosRequestConfig } from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 15000,
  withCredentials: true,
};

const api = axios.create(options);

//TODO: this only set bearer on client side
const setBearer = (token: string) => {
  api.defaults.headers.common["Authorization"] = `bearer ${token}`;
};

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  return config;
});

export { api, setBearer };
