import Axios, { AxiosRequestConfig } from "axios";

export interface IRequest {
  url: string;
  body?: any;
  config?: AxiosRequestConfig<any>;
}

export const initialAxios = Axios.create({
  baseURL: process.env.URL_BASE_SERVER,
});

const Api = {
  post: ({ url, body, config }: IRequest): Promise<any> =>
    initialAxios.post(url, body, config).catch((error) => ({
      hasError: true,
      ...error,
    })),

  delete: ({ url, config }: IRequest): Promise<any> =>
    initialAxios
      .delete(url, config)
      .catch((error) => ({ hasError: true, ...error })),

  get: ({ url, config }: IRequest): Promise<any> =>
    initialAxios
      .get(url, config)
      .catch((error) => ({ hasError: true, ...error })),

  put: ({ url, body, config }: IRequest): Promise<any> =>
    initialAxios.put(url, body, config).catch((error) => ({
      hasError: true,
      ...error,
    })),

  patch: ({ url, body, config }: IRequest): Promise<any> =>
    initialAxios.patch(url, body, config).catch((error) => ({
      hasError: true,
      ...error,
    })),
};

export default Api;
