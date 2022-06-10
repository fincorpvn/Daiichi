import {uploadFile} from 'services';
import {ReactNativeBlobUtil} from 'react-native-blob-util';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {getStoreToken} from 'utils/storage';
import {getUuid, Log} from 'utils';
import {urlApp} from 'constant';

const baseURL = urlApp.APIURL;
const axiosApp = axios.create({
  baseURL: baseURL + 'api/',
  timeout: 5000,
});
const aa = axios.create({
  baseURL: baseURL + 'api/',
  timeout: 5000,
});

axiosApp.interceptors.request.use(
  async (config: any) => {
    const token = await getStoreToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      config.headers['Authorization'] = `Bearer`;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Origin'] = `${urlApp.DomainName}`;
    return config;
  },
  (error: any) => Promise.reject(error),
);

axiosApp.interceptors.response.use(
  (res: AxiosResponse<{content: any; message: string; result: number}>) => {
    return res;
  },
  (
    err: AxiosError<{
      data?: {
        message?: string;
        messageEn?: string;
        content?: any;
        data?: any;
        result?: number;
      };
    }>,
  ) => {
    throw (
      err.response?.data || {
        message: 'Lỗi mạng',
        messageEn: 'Lỗi mạng',
        content: null,
        result: -1,
        data: null,
      }
    );
  },
);
aa.interceptors.request.use(
  async (config: any) => {
    const token = await getStoreToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      config.headers['Authorization'] = `Bearer`;
    }
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['Accept'] = 'application/json';
    config.headers['Origin'] = `${urlApp.DomainName}`;
    return config;
  },
  (error: any) => Promise.reject(error),
);

aa.interceptors.response.use(
  (res: AxiosResponse<{content: any; message: string; result: number}>) => {
    return res;
  },
  (
    err: AxiosError<{
      data?: {
        message?: string;
        messageEn?: string;
        content?: any;
        data?: any;
        result?: number;
      };
    }>,
  ) => {
    throw (
      err.response?.data || {
        message: 'Lỗi mạng',
        messageEn: 'Lỗi mạng',
        content: null,
        result: -1,
        data: null,
      }
    );
  },
);

export async function doGetAxios(url: string): Promise<IAxiosResponse> {
  try {
    const res: AxiosResponse = await axiosApp.get(url);
    if (res) {
      return res.data;
    }
    throw res;
  } catch (error) {
    throw error;
  }
}

export async function doPostAxios(
  url: string,
  params: object,
): Promise<IAxiosResponse> {
  try {
    const res: AxiosResponse = await axiosApp.post(url, JSON.stringify(params));
    if (res) {
      return res.data;
    }
    throw res;
  } catch (error) {
    throw error;
  }
}

export async function axiosMultipart(
  url: string,
  params: any,
): Promise<IAxiosResponse> {
  try {
    const res: AxiosResponse = await aa.post(url, params);
    if (res) {
      return res.data;
    }
    throw res;
  } catch (error) {
    throw error;
  }
}

export {axiosApp};
