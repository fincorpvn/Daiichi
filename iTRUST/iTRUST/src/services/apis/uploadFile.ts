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

  return new Promise((resolve, reject) => {
    return ReactNativeBlobUtil.fetch(
      'POST',
      url,
      {
        Authorization: token ? `Bearer ${token}` : 'Bearer',
        'Content-Type': 'application/json',
        origin: urlApp.DomainName,
      },
      JSON.stringify(params),
    )
      .uploadProgress((written, total) => {})
      .progress((received, total) => {
        progress && progress(received / total);
      })
      .then((resp: any) => {
        resolve(resp.json()?.data);
      })
      .catch(err => {
        console.log('reject', err);
        reject(err);
      });
  });
}
