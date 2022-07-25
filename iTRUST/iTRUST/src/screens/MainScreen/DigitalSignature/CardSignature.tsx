import {
  Button,
  Div,
  ImageView,
  Label,
  LoadingIndicator,
  Toast,
} from 'components';
import {Ecolors, EStyle, Icons, stringApp, urlApp} from 'constant';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {PERMISSIONS} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {
  convertDataDownloadFile,
  getUuid,
  Log,
  requestPermisson,
  widthScale,
} from 'utils';
import {getStoreToken} from 'utils/storage';
import {useAppSelector} from 'store/hooks';
import {useDispatch} from 'react-redux';

function CardSignature() {
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const hardProfile = !!currentUser.investmentProfile?.isReceivedHardProfile;
  const {name, investmentProfile} = currentUser;
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const dispatch = useDispatch();

  const switchStatusEsign = (p: {
    hardProfile: boolean;
    I18nState: 'vi' | 'en';
  }) => {
    if (p.hardProfile) {
      if (p.I18nState == 'vi') {
        return 'Đã ký';
      }
      return 'Full submission';
    }
    if (p.I18nState == 'vi') {
      return 'Chưa ký';
    }
    return 'No submission';
  };

  const downloadConfirm = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const token = await getStoreToken();
      const url = `esignature/download-contract`;
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
            })
            .finally(() => {
              setLoading(false);
            });
        },
      );
    } catch (error) {
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      {/* {!loading && (
        <Div
          flex={1}
          width={'100%'}
          height={'100%'}
          screen={true}
          backgroundColor={Ecolors.transparentLoading}
          alignItems={'center'}
          justifyContent={'center'}
          position={'absolute'}
          zIndex={9999999}
          elevation={999999}>
          <LoadingIndicator color={Ecolors.mainColor} />
        </Div>
      )} */}
      <Div
        width={343}
        marginVertical={15}
        paddingVertical={16}
        borderRadius={8}
        borderWidth={0.8}
        borderColor={Ecolors.bordercolor}
        flexDirection={'row'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        paddingLeft={20}
        paddingRight={17}
        backgroundColor={Ecolors.whiteColor}
        style={EStyle.shadowItem}>
        <Div
          widthHeight={40}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={5}
          overflow={'hidden'}
          borderWidth={0.8}
          borderColor={Ecolors.bordercolor}>
          <ImageView
            source={Icons.iconapp}
            // widthHeight={30}
            style={{
              width: widthScale(40),
              height: widthScale(40),
            }}
            resizeMode={'cover'}
          />
        </Div>
        <Div
          flex={1}
          paddingHorizontal={10}
          flexDirection={'column'}
          alignItems={'flex-start'}>
          <Label
            size={16}
            color={Ecolors.mainColor}
            fontWeight={'700'}
            multilanguage={false}>
            {stringApp.companyName}
          </Label>
          <Label
            marginTop={2}
            size={14}
            color={Ecolors.grayColor}
            multilanguage={false}>
            {investmentProfile?.number || ''}
          </Label>
          {/* <Button
            onPress={() => {
              downloadConfirm();
            }}>
            {loading ? (
              <ActivityIndicator color={Ecolors.mainColor} size={'small'} />
            ) : (
              <Label marginTop={7} size={14} color={Ecolors.linkColor}>
                {hardProfile
                  ? `digitalsignature.taive`
                  : `digitalsignature.xemtruoc`}
              </Label>
            )}
          </Button> */}
        </Div>

        <Div
          flexDirection={'row'}
          paddingTop={12}
          alignItems={'center'}
          justifyContent={'center'}>
          <Label
            size={14}
            color={hardProfile ? Ecolors.growColor : Ecolors.redColor}
            multilanguage={false}>
            {switchStatusEsign({hardProfile, I18nState})}
          </Label>
          <ImageView
            marginLeft={10}
            widthHeight={17}
            resizeMode={'contain'}
            source={hardProfile ? Icons.check : Icons.uncheck}
          />
        </Div>
      </Div>
      <Div
        alignItems={'center'}
        paddingHorizontal={20}
        justifyContent={'center'}>
        <Label textAlign={'center'} size={14}>
          {hardProfile
            ? `digitalsignature.contentdownload2`
            : `digitalsignature.contentdownload`}
        </Label>
      </Div>
      <Div
        width={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        paddingBottom={20}>
        <Button
          width={340}
          height={48}
          flexDirection={'row'}
          marginTop={18}
          onPress={() => {
            downloadConfirm();
          }}
          borderRadius={5}
          borderWidth={0.8}
          borderColor={Ecolors.mainColor}
          backgroundColor={Ecolors.spaceColor}
          alignItems={'center'}
          justifyContent={'center'}>
          {loading ? (
            <LoadingIndicator color={Ecolors.mainColor} />
          ) : (
            <>
              <ImageView
                source={Icons.download}
                widthHeight={18}
                resizeMode={'contain'}
                marginRight={10}
              />
              <Label fontWeight={'700'} size={15}>
                {/* {hardProfile
                  ? `digitalsignature.taihopdongdaky`
                  : `digitalsignature.taihopdongmotaikhoan`} */}
                {`digitalsignature.taihopdongmotaikhoan`}
              </Label>
            </>
          )}
        </Button>
      </Div>

      <Div
        alignItems={'center'}
        paddingHorizontal={20}
        justifyContent={'center'}>
        {!investmentProfile?.isReceivedHardProfile && I18nState == 'en' && (
          <Label
            size={14}
            fontWeight={'700'}
            textAlign={'center'}
            multilanguage={false}>
            {I18nState == 'en'
              ? `If you're US-CITIZEN, please send FATCA document to our company`
              : ''}
          </Label>
        )}
      </Div>
    </>
  );
}

export default React.memo(CardSignature);
