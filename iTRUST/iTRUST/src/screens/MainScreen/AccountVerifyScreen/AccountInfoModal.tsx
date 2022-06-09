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
} from 'components';
import {Ecolors, Icons, urlApp} from 'constant';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getInvestmentProfile} from 'reducer/authen/selector';
import {navigate} from 'services';
import {apiMain} from 'services/apis/apiMain';
import {doGetAxios, doPostAxios} from 'services/apis/axios';
import {useAppSelector} from 'store/hooks';
import {convertTimestamp, Log, widthScale, widthScreen} from 'utils';
import {getStoreToken} from 'utils/storage';

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
  const [token, setToken] = useState<string>('');
  const [country, setCountry] = useState<any>(null);
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
    // getTokenn();
    // downloadImage();
    return () => {};
  }, []);

  // const downloadImage = async () => {
  //   const ul = `dowload/file?${userPhotos[0].url}`;
  //   try {
  //     Log('rrr', {ul});
  //     const r = await doGetAxios(ul);
  //   } catch (error) {
  //     Log('error', {error});
  //   } finally {
  //   }
  // };

  // const getTokenn = async () => {
  //   const t = await getStoreToken();
  //   if (t) {
  //     setToken(t);
  //   }
  // };

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
      <HeaderBack
        type={2}
        iconRight={
          !investmentProfile ||
          investmentProfile?.code == 'INVESTMENT_PROFILE_REJECT'
            ? Icons.edit
            : null
        }
        title={`accountverify.thongtincanhan`}
        onRightPress={() => {
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
        <Div
          padding={16}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {userPhotos?.map((item: any, index: number) => {
            return (
              <ImageView
                width={162}
                key={index}
                height={103}
                borderRadius={5}
                borderWidth={1}
                resizeMode={'contain'}
                borderColor={Ecolors.bordercolor}
                source={Icons.profile}
                // source={{
                //   uri: item.url,
                //   headers: {
                //     origin: `${urlApp.DomainName}`,
                //     Authorization: `Bearer ${token}`,
                //     [`Content-Type`]: 'application/json',
                //   },
                // }}
                // source={{
                //   uri: `${urlApp.IMAGEURL}${item.fileName}`,
                // }}
              />
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
