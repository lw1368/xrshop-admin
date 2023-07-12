import axios, { AxiosError } from "axios";

import env from "@/config";

import { showLoading, hideLoading } from "@/components/loading";

import { Result } from "@/types/api";

import storage from "./storage";

import { message } from "./antdGlobal";

console.log("config", env);
// 创建实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: "请求超时，请稍后再试",
  withCredentials: true,
  headers: {
    icode: "B815F86524423DB0",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 全局loading为true时，显示loading
    if (config.showLoading) showLoading();
    const token = storage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (env.mock) {
      config.baseURL = env.mockApi;
    } else {
      config.baseURL = env.baseApi;
    }
    return {
      ...config,
    };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    hideLoading();
    if (data.code === 500001) {
      message.error(data.msg);
      storage.remove("token");
      window.location.href = `/login?callback=${encodeURIComponent(
        window.location.href
      )}`;
    } else if (data.code !== 0) {
      // 局部loading 开启时 直接返回错误信息，不拦截处理
      if (response.config.showError === false) {
        return Promise.resolve(data);
      }
      message.error(data.msg);
      return Promise.reject(data);
    }
    return data.data;
  },
  (error) => {
    hideLoading();
    message.error(error.message);
    return Promise.reject(error.message);
  }
);

// 局部loading控制
interface IConfig {
  showLoading?: boolean;
  showError?: boolean;
}
export default {
  get<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.get(url, { params, ...options });
  },
  post<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.post(url, params, options);
  },
};
