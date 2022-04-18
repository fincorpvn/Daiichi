import {useRoute} from '@react-navigation/core';
import {
  Button,
  Div,
  HeaderBack,
  ImageView,
  Label,
  LoadingIndicator,
} from 'components';
import {Ecolors, EStyle, Icons, urlApp} from 'constant';
import React, {useState} from 'react';
import {Platform, ScrollView} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useAppSelector} from 'store/hooks';
import {
  convertNav,
  convertNumber,
  convertTimestamp,
  getUuid,
  Log,
  requestPermisson,
} from 'utils';
import RNFS from 'react-native-fs';
import {getStoreToken} from 'utils/storage';
import {PERMISSIONS} from 'react-native-permissions';

function RowSpaceItem(p: {paddingTop?: number; children?: any}) {
  return (
    <Div
      paddingTop={p.paddingTop ?? 0}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      {p.children && p.children}
    </Div>
  );
}

function OrderHistoryDetailsModal() {
  const route = useRoute<any>();
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {bankAccount, investmentProfile} = currentUser;
  const [loading, setLoading] = useState<boolean>(false);
  const {
    orderType,
    id,
    sessionTime,
    productProgramName,
    netAmount,
    createAt,
    price,
    beginVolume,
    code,
    fee,
  } = route?.params?.data;

  const downloadConfirm = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const token = await getStoreToken();
      const url = `export/transaction/Confirm?orderId=${id}`;
      const bburl = `${urlApp.APIURL}api/${url}`;
      // return;
      const link = `${
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath
      }/Mio_Plus/${getUuid()}.pdf`;
      await requestPermisson(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.MEDIA_LIBRARY,
        () => {
          return ReactNativeBlobUtil.config({
            appendExt: 'pdf',
            path: link,
            fileCache: true,
          })
            .fetch('GET', bburl, {
              //some headers ..
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'application/json',
              'request-id': getUuid(),
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

  const convertTypeString = t => {
    if (I18nState == 'vi') {
      return t.name;
    } else {
      switch (t.code) {
        case 'BUY':
          return 'Subscribe order';
        case 'SELL':
          return 'Redeem order';
        case 'TRANSFER_SELL':
          return 'Switch-Out order';
        case 'TRANSFER_BUY':
          return 'Switch-In order';
        default:
          return '';
      }
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={2} multilanguage={false} title={productProgramName} />
      <ScrollView>
        <Div paddingHorizontal={16}>
          <Div
            marginTop={18}
            borderRadius={8}
            borderWidth={0.8}
            borderColor={Ecolors.bordercolor}
            style={EStyle.shadowItem}
            backgroundColor={Ecolors.whiteColor}
            shadow={true}
            paddingHorizontal={16}
            paddingTop={17}
            paddingBottom={26}>
            <RowSpaceItem>
              <Label
                size={14}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.phiengiaodich`}</Label>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.tongtien`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {convertTimestamp(sessionTime)}
              </Label>
              <Label size={14} multilanguage={false} fontWeight={'700'}>
                {convertNumber(netAmount)}
              </Label>
            </RowSpaceItem>
            {/*  */}
            <Div
              width={'100%'}
              marginTop={10}
              marginBottom={7}
              backgroundColor={Ecolors.spaceColor}
              height={1}
            />
            <RowSpaceItem>
              <Label
                size={14}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.sotaikhoan`}</Label>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.malenh`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {investmentProfile?.number || ''}
              </Label>
              <Label size={14} multilanguage={false}>
                {code}
              </Label>
            </RowSpaceItem>
            {/*  */}
            <Div
              width={'100%'}
              marginTop={10}
              marginBottom={7}
              backgroundColor={Ecolors.spaceColor}
              height={1}
            />
            <RowSpaceItem>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.loailenh`}</Label>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.soluong`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {convertTypeString(orderType)}
              </Label>
              <Label size={14} multilanguage={false}>
                {convertNav(beginVolume, true)}
              </Label>
            </RowSpaceItem>
            {/*  */}
            <Div
              width={'100%'}
              marginTop={13}
              marginBottom={7}
              backgroundColor={Ecolors.spaceColor}
              height={1}
            />
            <RowSpaceItem>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.nav`}</Label>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.phi`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {convertNav(price)}
              </Label>
              <Label size={14} multilanguage={false}>
                {convertNumber(fee) || '0'}
              </Label>
            </RowSpaceItem>
            <Div
              width={'100%'}
              marginTop={13}
              marginBottom={7}
              backgroundColor={Ecolors.spaceColor}
              height={1}
            />
            <RowSpaceItem paddingTop={5}>
              <Div>
                <Label
                  size={14}
                  color={
                    Ecolors.grayColor
                  }>{`transactionscreen.ngaydatlenh`}</Label>
                <Label marginTop={5} size={14} multilanguage={false}>
                  {convertTimestamp(createAt, 'DD/MM/yyyy, HH:mm')}
                </Label>
              </Div>
              <Div />
            </RowSpaceItem>
          </Div>
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
                  fontWeight={
                    '700'
                  }>{`transactionscreen.taiphieuxacnhan`}</Label>
              </>
            )}
          </Button>
        </Div>
      </ScrollView>
    </Div>
  );
}

export default React.memo(OrderHistoryDetailsModal);
