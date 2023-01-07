import axios from 'axios';
import { message } from 'antd';
import { getToken } from './cookie';
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}
//创建实列
const service = axios.create({
  baseURL: 'http://127.0.0.1:8888',
});
//响应拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = `${getToken()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
//响应拦截器
service.interceptors.response.use(
  (res) => {
    const { status, data } = res.data;

    if (status === 0) {
      return data;
    } else {
      message.error(res.data.message, 1.5);
      return Promise.reject(res.data.message);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default service;
