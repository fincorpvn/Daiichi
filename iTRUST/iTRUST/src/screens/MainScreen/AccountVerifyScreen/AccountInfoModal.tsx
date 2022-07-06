import axios from 'axios';
import {
  Button,
  ButtonBorder,
  Calendar,
  Div,
  Dropdown,
  GenderCheckbox,
  HeaderBack,
  ImageView,
  InputItem,
  Label,
  LoadingIndicator,
} from 'components';
import {Ecolors, Icons, stringApp, urlApp} from 'constant';
import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {
  getInvestmentProfile,
  getStatusEditProfile,
} from 'reducer/authen/selector';
import {navigate} from 'services';
import {apiMain} from 'services/apis/apiMain';
import {doGetAxios, doPostAxios} from 'services/apis/axios';
import {img} from 'services/test';
import {useAppSelector} from 'store/hooks';
import {convertTimestamp, getUuid, Log, widthScale, widthScreen} from 'utils';
import {getStoreToken} from 'utils/storage';
import RNFS, {stat} from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useDispatch, useSelector} from 'react-redux';
import {changeUserPhotos} from 'reducer/authen';

function RowSpaceItem(p: {paddingTop?: number; children?: any}) {
  return (
    <Div
      height={54}
      paddingHorizontal={16}
      borderBottomWidth={1}
      borderBottomColor={Ecolors.spaceColor}
      paddingTop={p.paddingTop ?? 0}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      {p.children && p.children}
    </Div>
  );
}

function AccountInfoModal() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const investmentProfile = useAppSelector(state =>
    getInvestmentProfile(state),
  );
  const [listImage, setListImage] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<any>(null);
  const isEdit = useAppSelector(state => getStatusEditProfile(state));
  const {
    email,
    phone,
    name,
    gender,
    dob,
    idTypeId,
    idNo,
    dateOfIssue,
    placeOfIssue,
    mailingCountryId,
    nationalityId,
    userPhotos,
  } = currentUser;

  useEffect(() => {
    getCountry();
    downloadImage();
    return () => {};
  }, []);

  const downloadImage = async () => {
    try {
      setLoading(true);
      const token = await getStoreToken();
      const t = await Promise.all(
        userPhotos.map(async (item: any, index: number) => {
          const ul = `download/file?uri=${item.url}`;
          const bburl = `${urlApp.APIURL}api/${ul}`;
          return new Promise((resolve, reject) => {
            try {
              ReactNativeBlobUtil.config({})
                .fetch(
                  'POST',
                  bburl,
                  {
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                    'request-id': getUuid(),
                    Origin: urlApp.DomainName,
                  },
                  JSON.stringify({
                    uri: item.url,
                  }),
                )
                .then((r: any) => {
                  setLoading(false);

                  resolve(r.base64());
                  return;
                });
            } catch (error) {
              reject(error);
            }
          });
        }),
      );
      if (!!t.length) {
        setListImage(
          t.map((item: any, index: number) => {
            return `data:image/png;base64,${item}`;
          }),
        );
        const newList = userPhotos.map((item: any, index: number) => {
          return {
            ...item,
            base64Convert: `data:image/png;base64,${t[index]}`,
          };
        });
        dispatch(changeUserPhotos(newList));
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getCountry = async () => {
    try {
      const res = await apiMain.getCountry();
      const c = res.data.find(
        (a: any) => a.id == mailingCountryId || a.id == nationalityId,
      );
      if (c) {
        setCountry(c);
      }
    } catch (error) {}
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      {/* {loading && (
        <Div
          flex={1}
          width={'100%'}
          height={'100%'}
          zIndex={99999}
          elevation={99999}
          position={'absolute'}
          style={StyleSheet.absoluteFillObject}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Ecolors.transparentLoading}>
          <LoadingIndicator color={Ecolors.mainColor} />
        </Div>
      )} */}
      <HeaderBack
        type={2}
        iconRight={isEdit ? Icons.edit : null}
        // iconRight={Icons.edit}
        loading={loading}
        title={`accountverify.thongtincanhan`}
        onRightPress={() => {
          if (loading) {
            return;
          }
          navigate('EditAccountInfoModal');
        }}
      />
      <ScrollView>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          paddingHorizontal={16}
          height={48}
          backgroundColor={'rgba(73, 85, 163, 0.1)'}>
          <Label>{`accountverify.thongtinnhadautu`}</Label>
        </Div>
        <RowSpaceItem>
          <Label>{`accountverify.hoten`}</Label>
          <Label multilanguage={false}>{name}</Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.gioitinh`}</Label>
          <Label>
            {gender === 1 ? `accountverify.nam` : `accountverify.nu`}
          </Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.ngaysinh`}</Label>
          <Label multilanguage={false}>{convertTimestamp(dob)}</Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.quoctich`}</Label>
          <Label multilanguage={false}>{country?.name || ''}</Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.email`}</Label>
          <Label multilanguage={false}>{email}</Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.sodienthoai`}</Label>
          <Label multilanguage={false}>{phone}</Label>
        </RowSpaceItem>
        {/*  */}
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          paddingHorizontal={16}
          height={48}
          backgroundColor={'rgba(73, 85, 163, 0.1)'}>
          <Label>{`accountverify.thongtincmnd`}</Label>
        </Div>
        <RowSpaceItem>
          <Label>{`accountverify.loaigiayto`}</Label>
          <Label multilanguage={!!idTypeId}>
            {(idTypeId &&
              (idTypeId == 1
                ? `accountverify.cmnd`
                : `accountverify.magiaodichchungkhoan`)) ||
              ''}
          </Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.sohieugiayto`}</Label>
          <Label multilanguage={false}>{idNo}</Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.ngaycap`}</Label>
          <Label multilanguage={false}>{convertTimestamp(dateOfIssue)}</Label>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.noicap`}</Label>
          <Div
            flex={1}
            flexDirection={'row'}
            paddingLeft={10}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Label multilanguage={false}>{placeOfIssue}</Label>
          </Div>
        </RowSpaceItem>
        {loading && (
          <Div alignItems={'center'} paddingTop={10} justifyContent={'center'}>
            <LoadingIndicator color={Ecolors.mainColor} numdot={3} />
          </Div>
        )}
        <Div
          padding={16}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {listImage?.map((item: any, index: number) => {
            return (
              <Div
                width={162}
                overflow={'hidden'}
                height={103}
                key={index}
                borderRadius={5}
                borderWidth={1}
                borderColor={Ecolors.bordercolor}>
                <ImageView
                  width={162}
                  height={103}
                  source={{
                    uri: item,
                  }}
                />
              </Div>
            );
          })}
        </Div>

        <Div height={200} />
      </ScrollView>
    </Div>
  );
}

const s = StyleSheet.create({
  imgContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: widthScale(200),
  },
  sbutton: {
    width: widthScreen - widthScale(30),
    height: widthScale(200),
  },
});

export default React.memo(AccountInfoModal);
