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
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getInvestmentProfile} from 'reducer/authen/selector';
import {navigate} from 'services';
import {apiMain} from 'services/apis/apiMain';
import {useAppSelector} from 'store/hooks';
import {convertTimestamp, widthScale, widthScreen} from 'utils';

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
    userPhotos,
  } = currentUser;

  useEffect(() => {
    getCountry();
    return () => {};
  }, []);

  const getCountry = async () => {
    try {
      const res = await apiMain.getCountry();
      const c = res.data.find((a: any) => a.id == mailingCountryId);
      if (c) {
        setCountry(c);
      }
    } catch (error) {}
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        type={2}
        iconRight={!investmentProfile ? Icons.edit : null}
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
          <Label multilanguage={false}>{placeOfIssue}</Label>
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
                source={{
                  uri: item.url,
                }}
              />
            );
          })}
        </Div>
        {/*  */}
        {/* <Lbl content={`accountverify.hovatendaydu`} />
        <InputItem
          marginTop={10}
          marginHorizontal={5}
          isInput={false}
          value={name}
        />
        <Lbl content={`accountverify.gioitinh`} />
        <GenderCheckbox value={gender} onChange={a => setGender(a)} />
        <Lbl content={`accountverify.ngaysinh`} />
        <Calendar onChange={(e: any) => setdob(e)} />
        <Lbl content={`accountverify.quoctich`} />
        <Dropdown
          marginTop={10}
          isActive={true}
          paddingHorizontal={5}
          multilanguage={true}
          content={`accountverify.quoctich`}
          url={`country/list`}
          value={nationality}
          onChange={a => setNationality(a)}
        />
        <Lbl content={`accountverify.email`} />
        <InputItem
          isInput={false}
          value={email}
          marginHorizontal={5}
          marginTop={10}
        />
        <Lbl content={`accountverify.sodienthoai`} />
        <InputItem value={phone} marginHorizontal={5} marginTop={10} />
        <Lbl content={`accountverify.thongtincmnd`} />
        <Label>{`accountverify.chuy`}</Label>
        <Lbl content={`accountverify.loaigiayto`} />
        <Dropdown
          marginTop={10}
          paddingHorizontal={5}
          isActive={true}
          multilanguage={true}
          value={type}
          onChange={a => setType(a)}
          content={`accountverify.vuilongchonloaigiayto`}
        />
        <Lbl content={`accountverify.sohieugiayto`} />
        <InputItem
          value={no}
          onChangeText={setNo}
          isInput={true}
          marginHorizontal={5}
          marginTop={10}
        />
        <Lbl content={`accountverify.ngaycap`} />
        <Calendar onChange={(e: any) => setDateOfIssue(e)} />
        <Lbl content={`accountverify.noicap`} />
        <InputItem
          value={placeOfIssue}
          onChangeText={setPlaceOfIssue}
          isInput={true}
          marginHorizontal={5}
          marginTop={10}
        />

        <DivPhoto
          loading={loadingUploadImage}
          value={photoBefore}
          onGetImage={() => {
            onGetImage((a: any) =>
              setPhotoBefore((b: any) => {
                return {
                  ...b,
                  ...a,
                };
              }),
            );
          }}
        />
        {isPhotoAfter && (
          <DivPhoto
            title={`accountverify.taianhmatsau`}
            onGetImage={() => {
              onGetImage((a: any) =>
                setPhotoAfter((b: any) => {
                  return {
                    ...b,
                    ...a,
                  };
                }),
              );
            }}
            value={photoAfter}
            loading={loadingUploadImage}
          />
        )}
        <ButtonBorder
          onPress={() => onConfirm()}
          loading={loading || loadingUploadImage}
          title={`accountverify.guithongtin`}
        /> */}
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
