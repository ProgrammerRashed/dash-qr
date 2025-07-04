"use server"
import axios from "axios";
import { cookies } from "next/headers";

// TODO: NEED TO ADD COOKIES DELETE FUNCTION ON 401
const app_axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});

app_axios.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default app_axios;
