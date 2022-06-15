import {ButtonBorder, Div, Label, LoadingIndicator, Toast} from 'components';
import {Ecolors, stringApp, urlApp} from 'constant';
import {convertDataDownloadFile, getUuid, Log, requestPermisson} from 'utils';
import {getStoreToken} from 'utils/storage';

import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RowButtonAction from 'screens/MainScreen/DigitalSignature/RowButtonAction';
import {navigate} from 'services';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {PERMISSIONS} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {Platform, StyleSheet} from 'react-native';

function OnlineTrading() {
  const content = `Với việc thực hiện "KÝ ĐIỆN TỬ", bạn chấp nhận việc kích hoạt và sử dụng dịch vụ giao dịch trực tuyến theo các Điều khoản và Điều kiện được quy định tại Bản công bố rủi ro giao dịch trực tuyến và Thoả thuận cung cấp dịch vụ trực tuyến của DFVN.`;
  const contentDownload1 = `Nhấn vào đây để xem`;
  const contentDownload2 = `Nhấn vào đây để tải mẫu`;
  const bangcongbo = `Bảng công bố rủi ro giao dịch trực tuyến.`;
  const thoathuan = `Thoả thuận cung cấp dịch vụ trực tuyến`;
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(false);

  const downloadAndView = async (url: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const token = await getStoreToken();
      // const url = `esignature/download-contract`;
      const bburl = `${urlApp.APIURL}api/${url}`;
      const link = `${
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath
      }/${stringApp.appLink}/${getUuid()}.pdf`;
      await requestPermisson(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.MEDIA_LIBRARY,
        () => {
          const obj =
            Platform.OS === 'ios'
              ? {
                  appendExt: 'pdf',
                  path: link,
                  fileCache: true,
                }
              : {};
          return ReactNativeBlobUtil.config(obj)
            .fetch('GET', bburl, {
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'application/json',
              'request-id': getUuid(),
              Origin: urlApp.DomainName,
            })
            .then(async (res: any) => {
              if (Platform.OS === 'android') {
                const T = convertDataDownloadFile(res);
                Log('resss', res);
                await ReactNativeBlobUtil.fs
                  .writeFile(T.urlFile, res.base64(), 'base64')
                  .then(async (e: any) => {
                    await ReactNativeBlobUtil.android.actionViewIntent(
                      T.urlFile,
                      T.type,
                    );
                  });
              } else {
                await ReactNativeBlobUtil.ios.previewDocument(res.path());
              }

              Toast.show({
                content: 'alert.taithanhcong',
                multilanguage: true,
              });
              setLoading(false);
            })
            .catch(err => {
              Toast.show({
                content: 'alert.daxayraloi',
                multilanguage: true,
              });
              Log('errror ', err);
            })
            .finally(() => {
              setLoading(false);
            });
        },
      );
    } catch (error) {
      setLoading(false);
      Log('errorr', error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Div
      paddingTop={insets.top + 10}
      flex={1}
      backgroundColor={Ecolors.whiteColor}
      flexDirection={'column'}
      alignItems={'center'}>
      {loading && (
        <Div
          flex={1}
          style={StyleSheet.absoluteFillObject}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Ecolors.transparentLoading}>
          <LoadingIndicator color={Ecolors.mainColor} />
        </Div>
      )}
      <Div flex={1} padding={10}>
        <Label multilanguage={false}>{content}</Label>
        <Label multilanguage={false} marginTop={10}>
          {contentDownload1}
          {` `}
          <Label
            onPress={() => {
              downloadAndView(`user/file/risk`);
            }}
            color={Ecolors.linkColor}
            multilanguage={false}>
            {bangcongbo}
          </Label>
        </Label>
        <Label multilanguage={false} marginTop={10}>
          {contentDownload2}
          {` `}
          <Label
            onPress={() => {
              downloadAndView(`user/file/risk-form`);
            }}
            color={Ecolors.linkColor}
            multilanguage={false}>
            {thoathuan}
          </Label>
        </Label>
      </Div>
      <RowButtonAction flowApp={'CreateEsignatureRisk'} />
    </Div>
  );
}

export default React.memo(OnlineTrading);
