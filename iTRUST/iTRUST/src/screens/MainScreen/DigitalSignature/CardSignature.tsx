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
import {
  convertDataDownloadFile,
  getUuid,
  heightScreen,
  Log,
  requestPermisson,
  widthScale,
  widthScreen,
} from 'utils';
import {getStoreToken} from 'utils/storage';
import RNFS from 'react-native-fs';
import {useAppSelector} from 'store/hooks';
import {navigate} from 'services';

function CardSignature() {
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const hardProfile = !!currentUser.investmentProfile?.isReceivedHardProfile;
  const {name, investmentProfile} = currentUser;
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

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
      const url = !hardProfile
        ? `user/file/contract`
        : `esignature/download-contract`;
      const bburl = `${urlApp.APIURL}api/${url}`;
      return requestPermisson(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.MEDIA_LIBRARY,
        async () => {
          await ReactNativeBlobUtil.config({})
            .fetch('GET', bburl, {
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'application/json',
              'request-id': getUuid(),
            })
            .then(async (res: any) => {
              // https://docs.google.com/viewer?embedded=true&url=https://api.mio.dev.techland.link/web/v1/api/esignature/download-contract
              const T = convertDataDownloadFile(res);
              await ReactNativeBlobUtil.fs
                .writeFile(T.urlFile, res.base64(), 'base64')
                .then((e: any) => {
                  if (Platform.OS === 'android') {
                    if (!hardProfile) {
                      ReactNativeBlobUtil.android.actionViewIntent(
                        T.urlFile,
                        T.type,
                      );
                    } else {
                      if (T?.urlFile?.endsWith('.pdf')) {
                        ReactNativeBlobUtil.android.actionViewIntent(
                          T.urlFile,
                          T.type,
                        );
                      }
                    }
                  } else {
                    ReactNativeBlobUtil.ios.previewDocument(T.urlFile);
                  }
                  Toast.show({
                    content: 'alert.taithanhcong',
                    multilanguage: true,
                  });
                });
              setLoading(false);
            })
            .catch(err => {
              Log('rrorrr', err);
              Toast.show({
                content: 'alert.daxayraloi',
                multilanguage: true,
              });
              setLoading(false);
            });
        },
      );
    } catch (error) {
      Log('errorr', error);
    } finally {
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
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={20}
        justifyContent={'center'}>
        <Label
          textAlign={'center'}
          size={14}>{`digitalsignature.contentdownload`}</Label>
        {!investmentProfile?.isReceivedHardProfile && I18nState == 'en' && (
          <Label
            size={14}
            fontWeight={'700'}
            marginTop={5}
            multilanguage={false}>
            {I18nState == 'en'
              ? `If you're US-CITIZEN, please send FATCA document to our company`
              : ''}
          </Label>
        )}
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
              <Label
                fontWeight={'700'}>{`digitalsignature.taihopdongdaky`}</Label>
            </>
          )}
        </Button>
      </Div>
    </>
  );
}

export default React.memo(CardSignature);
