interface IParamsLogin {
  username: string;
  password: string;
}
interface IParamResult {
  data: any;
  StatusCode: 0 | 1;
}
interface IAxiosResponse {
  data: any;
  message: string;
  messageEn: string;
  status: number;
  response?: any;
}
interface IAxiosError {
  data: any;
  message: string;
  messageEn: string;
  status: number;
  content?: any;
  response?: any;
}

interface IResAuthToken {
  access_token: string;
  time_to_live_seconds?: number;
}

type IParamsStatusScreen = 'splash' | 'unAuthorized' | 'main';
type TResAuth = IResAuthToken;
