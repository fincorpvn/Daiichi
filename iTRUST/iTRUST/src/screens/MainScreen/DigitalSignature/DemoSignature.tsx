import {Div, ImageView} from 'components';
import {Ecolors, EStyle, urlApp} from 'constant';
import React, {useEffect, useState} from 'react';
import {Image, Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {PERMISSIONS} from 'react-native-permissions';
import WebView from 'react-native-webview';
import {getUuid, heightScreen, Log, requestPermisson, widthScreen} from 'utils';
import {getStoreToken} from 'utils/storage';
import RNFS from 'react-native-fs';

interface T {
  width: number;
  height: number;
}

const defaultSize = 153;

const Com = (p: {width?: number; marginTop?: number; height?: number}) => {
  return (
    <Div
      backgroundColor={Ecolors.spaceColor}
      height={p.height || 9}
      width={p.width || 78}
      marginTop={p.marginTop || 7}
    />
  );
};

function DemoSignature() {
  const [stateSizeImage, setStateSizeImage] = useState<T>({
    width: 153,
    height: 153,
  });
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // getToken();
    // setTimeout(() => {
    //   downloadConfirm();
    // }, 100);
    // return () => {};
  }, []);
  const getToken = async () => {
    const r = await getStoreToken();
    if (r) {
      setToken(r);
    }
  };
  const downloadConfirm = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const id = getUuid();
      const token = await getStoreToken();
      const url = `esignature/download-contract`;
      const bburl = `${urlApp.APIURL}api/${url}`;
      // return;
      const link = `${
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath
      }/Mio_Plus/${id}.pdf`;
      await requestPermisson(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.MEDIA_LIBRARY,
        async () => {
          return await ReactNativeBlobUtil.config({
            appendExt: 'pdf',
            path: link,
            fileCache: true,
          })
            .fetch('GET', bburl, {
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'application/json',
              'request-id': id,
            })
            .then(async (res: any) => {
              const p = await res.path();
              if (Platform.OS === 'android') {
                ReactNativeBlobUtil.android.actionViewIntent(
                  p,
                  'application/pdf',
                );
              } else {
                ReactNativeBlobUtil.fs.writeFile(link, res.base64(), 'base64');
                ReactNativeBlobUtil.ios.previewDocument(link);
              }
              setLoading(false);
            })
            .catch(err => {
              Log('errror ', err);
            })
            .finally(() => {
              setLoading(false);
            });
        },
      );
    } catch (error) {
      Log('errorr', error);
    } finally {
      // setLoading(false);
    }
  };

  // if (token) {
  //   return (
  //     <WebView
  //       style={{
  //         width: widthScreen,
  //         height: heightScreen,
  //         flex: 1,
  //       }}
  //       source={{
  //         uri: urlApp.APIURL + 'api/' + 'esignature/download-contract',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'content-type': 'application/json',
  //         },
  //       }}
  //     />
  //   );
  // }

  return (
    <Div
      width={343}
      borderRadius={8}
      borderWidth={0.8}
      borderColor={Ecolors.bordercolor}
      backgroundColor={Ecolors.whiteColor}
      paddingHorizontal={15}
      paddingVertical={18}
      style={EStyle.shadowItem}>
      <Div flexDirection={'row'} width={'100%'}>
        <Div flex={1}>
          <Com width={132} />
          <Com />
          <Com />
          <Com />
          <Com marginTop={22} />
          <Com />
          <Com />
          <Com marginTop={24} width={132} />
          <Com />
          <Com marginTop={19} width={132} />
          <Com />
        </Div>
        <Div flex={1}>
          <Com marginTop={17} />
          <Com />
          <Com />
          <Com marginTop={40} />
          <Com />
          <Com />
          <Com marginTop={19} width={132} />
        </Div>
      </Div>
      <Com marginTop={50} width={293} />
      <Com marginTop={8} width={293} />
      <Com marginTop={8} width={293} />
      <Div flexDirection={'row'} marginTop={20} width={'100%'}>
        <Div flex={1}>
          <Com marginTop={27} width={132} />
          <Com />
          {/* <Com marginTop={27} width={132} />
          <Com />
          <Com marginTop={27} width={132} />
          <Com /> */}
        </Div>
        <Div flex={1}>
          {/* <ImageView
            width={stateSizeImage.width}
            height={stateSizeImage.height}
            resizeMode={'cover'}
            source={{
              uri: uri,
            }}
          /> */}
        </Div>
      </Div>
      <Div flexDirection={'row'} marginTop={20} width={'100%'}>
        <Div flex={1}>
          <Com />
          <Com />
          <Com />
        </Div>
        <Div flex={1}>
          <Com height={48} width={153} />
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(DemoSignature);
