import axios, {AxiosError, AxiosResponse} from 'axios';
import {getStoreToken} from 'utils/storage';
import {urlApp} from 'constant';
import {Log} from 'utils';

const baseURL = urlApp.APIURL;
const axiosApp = axios.create({
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
    // config.headers['Origin'] = 'https://daiichi.mobile';//daichi
    config.headers['Origin'] = 'https://fplatform.mobile'; //fplatform
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

export {axiosApp};
