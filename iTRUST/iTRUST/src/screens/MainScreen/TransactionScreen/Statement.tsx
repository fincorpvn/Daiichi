import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  ButtonBorder,
  Div,
  Dropdown,
  ImageView,
  Toast,
  Label,
} from 'components';
import {Ecolors, Icons, stringApp, urlApp} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {getListProduct} from 'reducer/investment';
import {useAppSelector} from 'store/hooks';
import {getStoreToken} from 'utils/storage';
import RNFS from 'react-native-fs';
import {PERMISSIONS} from 'react-native-permissions';

import ReactNativeBlobUtil from 'react-native-blob-util';
import {
  convertDataDownloadFile,
  getUuid,
  Log,
  requestPermisson,
  convertTimestamp,
  widthScale,
  joinObjectCalendar,
} from 'utils';

function ButtonCalendar(p: {title?: string; onPress: () => void; value?: any}) {
  return (
    <Button
      width={163}
      onPress={() => p.onPress && p.onPress()}
      height={48}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={5}
      borderColor={Ecolors.bordercolor}
      paddingHorizontal={10}
      borderWidth={0.8}>
      <Label
        multilanguage={!p.value}
        size={14}
        // color={p.value ? Ecolors.textColor : Ecolors.grayColor}>
        color={Ecolors.textColor}>
        {!p.value ? p.title : convertTimestamp(p.value.getTime(), '', true)}
      </Label>
      <ImageView
        heightWidth={17}
        source={Icons.calendar}
        resizeMode={'contain'}
      />
    </Button>
  );
}

function Statement(p: {activeTab: number}) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const listProduct = useAppSelector(state => getListProduct(state));
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const value = useRef<'from' | 'to'>('from');
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const onChange = (e: any, a: any) => {
    if (Platform.OS === 'android') {
      setIsShowCalendar(false);
    }
    if (a) {
      if (value.current == 'from') {
        setFromDate(a);
      } else {
        setToDate(a);
      }
    }
  };

  useEffect(() => {
    if (p.activeTab == 3) {
      clearData();
    }
  }, [p.activeTab]);

  const clearData = () => {
    Promise.all([setProduct(null), setFromDate(null), setToDate(null)]);
  };

  const onAccept = async () => {
    let body = {};
    if (toDate) {
      body[`toDate`] = joinObjectCalendar({
        date: toDate.getDate(),
        month: toDate.getMonth(),
        year: toDate.getFullYear(),
        isPicker: true,
      });
    }
    if (fromDate) {
      body[`fromDate`] = joinObjectCalendar({
        date: fromDate.getDate(),
        month: fromDate.getMonth(),
        year: fromDate.getFullYear(),
        isPicker: true,
      });
    }
    body['productCode'] = product.code;
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const token = await getStoreToken();
      const url = `report/transactions-history`;
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
            .fetch(
              'POST',
              bburl,
              {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
                'request-id': getUuid(),
                Origin: urlApp.DomainName,
              },
              JSON.stringify(body),
            )
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
              Log('errror ', err);
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
    <Div
      padding={16}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      flex={1}>
      <Label fontWeight={'700'}>{`transactionscreen.chonquy`}</Label>
      <Dropdown
        multiline={true}
        marginTop={6}
        paddingHorizontal={0}
        initData={listProduct}
        value={product}
        multilanguage={true}
        content={`createordermodal.chonsanpham`}
        isActive={true}
        onChange={setProduct}
      />
      <Label
        fontWeight={'700'}
        marginTop={14}>{`transactionscreen.theothoidiemgiaodich`}</Label>
      <Div
        paddingTop={16}
        paddingBottom={23}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <ButtonCalendar
          value={fromDate}
          onPress={() => {
            setIsShowCalendar(true);
            value.current = 'from';
          }}
          title={`transactionscreen.tungay`}
        />
        <ButtonCalendar
          value={toDate}
          onPress={() => {
            setIsShowCalendar(true);
            value.current = 'to';
          }}
          title={`transactionscreen.toingay`}
        />
      </Div>
      <ButtonBorder
        loading={loading}
        isDisable={!product || !fromDate || !toDate}
        onPress={() => {
          if (loading) {
            return;
          }
          onAccept();
        }}
        title={`transactionscreen.saoke`}
        width={343}
        marginTop={26}
      />
      {Platform.OS === 'android'
        ? (isShowCalendar && (
            <RNDateTimePicker
              themeVariant="dark"
              display={'spinner'}
              textColor={'#000'}
              value={
                value.current == 'from'
                  ? fromDate || new Date()
                  : toDate || new Date()
              }
              onChange={onChange}
            />
          )) || <></>
        : (isShowCalendar && (
            <>
              <Div
                flexDirection={'row'}
                alignItems={'center'}
                backgroundColor={Ecolors.whiteColor}
                justifyContent={'flex-end'}>
                <Button
                  padding={10}
                  onPress={() => {
                    setIsShowCalendar(false);
                    if (value.current == 'from') {
                      if (!fromDate) {
                        setFromDate(new Date());
                      }
                    } else {
                      if (!toDate) {
                        setToDate(new Date());
                      }
                    }
                  }}>
                  <Label
                    fontWeight={'bold'}
                    color={Ecolors.linkColor}>{`alert.lichxong`}</Label>
                </Button>
              </Div>
              <RNDateTimePicker
                themeVariant="dark"
                display={'spinner'}
                textColor={'#000'}
                value={
                  value.current == 'from'
                    ? fromDate || new Date()
                    : toDate || new Date()
                }
                onChange={onChange}
              />
            </>
          )) || <></>}
    </Div>
  );
}

export default React.memo(Statement);
