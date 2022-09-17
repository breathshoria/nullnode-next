import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, unstable_getServerSession } from "next-auth";

const ApiInterceptor = (
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: NextAuthOptions
) => {
  const options = {
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: 15000,
    withCredentials: true,
  };

  const api = axios.create(options);

  api.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    console.log(session);
    if (session) {
      config.headers!.Authorization = `bearer ${session.accessToken}`;
    }
    return config;
  });
  return api;
};

export default ApiInterceptor;
