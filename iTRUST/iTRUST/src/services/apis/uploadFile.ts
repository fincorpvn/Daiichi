import {urlApp} from 'constant';
import {doPostAxios} from 'services/apis/axios';
import {getStoreToken} from 'utils/storage';
import {getUuid, parseToFormData} from 'utils';
import ReactNativeBlobUtil from 'react-native-blob-util';

const baseURL = urlApp.APIURL;
export async function uploadFile(
  params: {
    fileBase64: string;
  },
  progress?: (p: number) => void,
) {
  const token = await getStoreToken();
  const url = `${baseURL}api/upload/base64`;
  // return doPostAxios(`upload/base64`, {
  //   params,
  // });
  return new Promise((resolve, reject) => {
    // return axiosApp.post(`upload/base64`, data);
    return (
      ReactNativeBlobUtil.fetch(
        'POST',
        url,
        {
          Authorization: token ? `Bearer ${token}` : 'Bearer',
          'Content-Type': 'application/json',
          // origin: 'https://fplatform.mobile',
        },
        JSON.stringify(params),
      )
        .uploadProgress((written, total) => {
          // console.log('uploaded', written / total);
        })
        // listen to download progress event
        .progress((received, total) => {
          // console.log('progress', received / total);
          progress && progress(received / total);
        })
        .then((resp: any) => {
          console.log('resp', resp.json());
          // console.log('resolve', resp.json());
          resolve(resp.json()?.data);
        })
        .catch(err => {
          console.log('reject', err);
          reject(err);
        })
    );
  });
}
