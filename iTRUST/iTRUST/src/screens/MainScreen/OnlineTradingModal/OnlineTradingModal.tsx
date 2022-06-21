import {
  Button,
  ButtonBorder,
  Div,
  HeaderBack,
  ImageView,
  Label,
  LoadingIndicator,
  Toast,
} from 'components';
import {Ecolors, Icons, stringApp, urlApp} from 'constant';
import {convertDataDownloadFile, getUuid, Log, requestPermisson} from 'utils';
import {getStoreToken} from 'utils/storage';

import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RowButtonAction from 'screens/MainScreen/DigitalSignature/RowButtonAction';
import {navigate} from 'services';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {PERMISSIONS} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {ActivityIndicator, Platform, StyleSheet} from 'react-native';

const ButtonDownload = (p: {
  content: string;
  onPress: () => void;
  loading?: boolean;
}) => {
  return (
    <Button
      onPress={() => p.onPress()}
      width={343}
      height={40}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      paddingHorizontal={10}
      backgroundColor={Ecolors.bordercolor}
      marginTop={6}
      borderRadius={5}>
      {p.loading ? (
        <ActivityIndicator color={Ecolors.mainColor} size={'small'} />
      ) : (
        <>
          <ImageView
            marginRight={5}
            widthHeight={10}
            source={Icons.link}
            resizeMode={'contain'}
            marginTop={2}
          />
          <Div flex={1}>
            <Label multilanguage={false}>{p.content}</Label>
          </Div>
        </>
      )}
    </Button>
  );
};

function OnlineTrading() {
  const content = `Với việc thực hiện "KÝ ĐIỆN TỬ", bạn chấp nhận việc kích hoạt và sử dụng dịch vụ giao dịch trực tuyến theo các Điều khoản và Điều kiện được quy định tại Bản công bố rủi ro giao dịch trực tuyến và Thoả thuận cung cấp dịch vụ trực tuyến của DFVN.`;
  const bangcongbo = `Bảng công bố rủi ro giao dịch trực tuyến.`;
  const thoathuan = `Thoả thuận cung cấp dịch vụ trực tuyến.`;
  const [loading, setLoading] = useState<Object>({});

  const controlLoading = (url: string, t: boolean) => {
    setLoading(a => {
      return {
        ...a,
        [url]: t,
      };
    });
  };

  const downloadAndView = async (url: string) => {
    controlLoading(url, true);
    try {
      const token = await getStoreToken();
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
              controlLoading(url, false);
            })
            .catch(err => {
              Toast.show({
                content: 'alert.daxayraloi',
                multilanguage: true,
              });
            })
            .finally(() => {
              controlLoading(url, false);
            });
        },
      );
    } catch (error) {
      controlLoading(url, false);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Div
      // paddingTop={insets.top + 10}
      height={'100%'}
      backgroundColor={Ecolors.whiteColor}
      flexDirection={'column'}
      alignItems={'center'}>
      <HeaderBack
        isHideBack={true}
        type={2}
        title={`digitalsignature.kydientu`}
      />
      <Div flexDirection={'column'} alignItems={'center'} flex={1}>
        <Div padding={16}>
          <Label multilanguage={false}>{content}</Label>
        </Div>
        <ButtonDownload
          content={bangcongbo}
          loading={loading[`user/file/risk`]}
          onPress={() => {
            if (loading[`user/file/risk`]) {
              return;
            }
            downloadAndView(`user/file/risk`);
          }}
        />
        <ButtonDownload
          content={thoathuan}
          loading={loading[`user/file/risk-form`]}
          onPress={() => {
            if (loading[`user/file/risk-form`]) {
              return;
            }
            downloadAndView(`user/file/risk-form`);
          }}
        />
      </Div>
      {/* {loading && (
        <Div
          flex={1}
          style={StyleSheet.absoluteFillObject}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Ecolors.transparentLoading}>
          <LoadingIndicator color={Ecolors.mainColor} />
        </Div>
      )} */}

      <RowButtonAction flowApp={'CreateEsignatureRisk'} />
    </Div>
  );
}

export default React.memo(OnlineTrading);
