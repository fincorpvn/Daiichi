import {Platform} from 'react-native';
import {urlApp} from 'constant';
import {getStoreToken} from 'utils/storage';
import {getUuid, Log, parseToFormData, requestPermisson} from 'utils';
import {PERMISSIONS} from 'react-native-permissions';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';

const baseURL = urlApp.APIURL;
let dirs = ReactNativeBlobUtil.fs.dirs;
let fs = ReactNativeBlobUtil.fs;
let base64 = ReactNativeBlobUtil.base64;
// const FileManager = Platform.select({
//   ios: {
//     getDownloadPath: filename => dirs.CacheDir + '/' + filename,
//     preview: path => ReactNativeBlobUtil.ios.openDocument(path),
//   },
//   android: {
//     getDownloadPath: filename => dirs.DownloadDir + '/' + filename,
//     preview: ReactNativeBlobUtil.android.actionViewIntent,
//   },
// });
export async function downloadFile(
  params: {
    url: string;
    name: string;
  },
  start?: () => void,
  end?: () => void,
) {
  const token = await getStoreToken();
  const url = `${baseURL}api/${params.url}`;
  const link = `${RNFS.DownloadDirectoryPath}/Mio_Plus/${getUuid()}.pdf`;

  return new Promise((resolve, reject) => {
    return requestPermisson(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.MEDIA_LIBRARY,
      () => {
        return ReactNativeBlobUtil.config({
          appendExt: 'pdf',
          path: link,
          fileCache: true,
        })
          .fetch('GET', url, {
            //some headers ..
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
            'request-id': getUuid(),
          })
          .then(async (res: any) => {
            const p = await res.path();
            Log('pathtt', p);
            if (Platform.OS === 'android') {
              ReactNativeBlobUtil.android.actionViewIntent(
                p,
                'application/pdf',
              );
            } else {
              ReactNativeBlobUtil.ios.openDocument(p);
            }
            if (res) {
              resolve(res);
            } else {
              reject(null);
            }
          })
          .catch(err => {
            reject(err);
          })
          .finally(() => {
            end && end();
          });
      },
    );
  });
}
