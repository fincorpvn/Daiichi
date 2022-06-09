import {AddressForm, ButtonBorder, Div, HeaderBack, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import {getInvestmentProfile} from 'reducer/authen/selector';
import {apiAuth, goBack, navigate} from 'services';
import {apiMain} from 'services/apis/apiMain';
import {useAppSelector} from 'store/hooks';
import {Log} from 'utils';

function RowSpaceItem(p: {paddingTop?: number; children?: any}) {
  return (
    <Div
      minHeight={54}
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

function AddressInfoModal() {
  const [loading, setLoading] = useState<boolean>(false);
  //
  const I18nState = useAppSelector(state => state.languages.I18nState);
  //
  const [permanentCountry, setPermanentCountry] = useState<any>(null);
  const [permanentDistrict, setPermanentDistrict] = useState<any>(null);
  const [permanentProvince, setPermanentProvince] = useState<any>(null);
  const [permanentWard, setpermanentWard] = useState<any>(null);
  //
  const [mailingCountry, setMailingCountry] = useState<any>(null);
  const [mailingDistrict, setMailingDistrict] = useState<any>(null);
  const [mailingProvince, setMailingProvince] = useState<any>(null);
  const [mailingWard, setMailingWard] = useState<any>(null);
  //

  const investmentProfile = useAppSelector(state =>
    getInvestmentProfile(state),
  );
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {
    permanentAddress,
    countryId,
    districtId,
    provinceId,
    wardId,
    //

    mailingAddress,
    mailingCountryId,
    mailingDistrictId,
    mailingProvinceId,
    mailingWardId,
  } = currentUser;

  useEffect(() => {
    bindData();
    return () => {};
  }, []);

  const bindData = async () => {
    try {
      setLoading(true);
      const res = await Promise.all([
        apiMain.getCountry(),
        apiMain.getProvince({countryId: countryId}),
        apiMain.getDistrict({provinceId: provinceId}),
        apiMain.getWard({districtId: districtId}),
        //
        apiMain.getProvince({countryId: mailingCountryId}),
        apiMain.getDistrict({provinceId: mailingProvinceId}),
        apiMain.getWard({districtId: mailingDistrictId}),
      ]);
      const PCountry = res[0]?.data?.find((a: any) => a.id == countryId);
      const PProvince = res[1]?.data?.find((a: any) => a.id == provinceId);
      const PDistrict = res[2]?.data?.find((a: any) => a.id == districtId);
      const PWard = res[3]?.data?.find((a: any) => a.id == wardId);
      //
      const MCountry = res[0]?.data?.find((a: any) => a.id == mailingCountryId);
      const MProvince = res[4]?.data?.find(
        (a: any) => a.id == mailingProvinceId,
      );
      const MDistrict = res[5]?.data?.find(
        (a: any) => a.id == mailingDistrictId,
      );
      const MWard = res[6]?.data?.find((a: any) => a.id == mailingWardId);
      await Promise.all([
        setMailingCountry(MCountry || null),
        setMailingProvince(MProvince || null),
        setMailingDistrict(MDistrict || null),
        setMailingWard(MWard || null),
        //
        setPermanentCountry(PCountry || null),
        setPermanentProvince(PProvince || null),
        setPermanentDistrict(PDistrict || null),
        setpermanentWard(PWard || null),
      ]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        loading={loading}
        type={2}
        iconRight={!currentUser?.userAddressIsFull ? Icons.edit : null}
        onRightPress={() => {
          navigate('EditAddressInfoModal', {
            data: {
              permanentAddress,
              permanentWard,
              permanentDistrict,
              permanentProvince,
              permanentCountry,
              //
              mailingAddress,
              mailingWard,
              mailingDistrict,
              mailingProvince,
              mailingCountry,
            },
          });
        }}
        title={`accountverify.thongtindiachi`}
      />
      <ScrollView>
        <Div padding={16} backgroundColor={Ecolors.spaceColor}>
          <Label multilanguage={false}>
            {`1. `}
            <Label>{`accountverify.diachithuongtru`}</Label>
          </Label>
        </Div>
        <RowSpaceItem>
          <Label>{`accountverify.quocgia`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? permanentCountry?.name
                : permanentCountry?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.tinhthanhpho`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? permanentProvince?.name
                : permanentProvince?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.quanhuyen`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? permanentDistrict?.name
                : permanentDistrict?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.phuongxa`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? permanentWard?.name
                : permanentWard?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.diachithuongtru`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>{permanentAddress}</Label>
          </Div>
        </RowSpaceItem>
        <Div padding={16} backgroundColor={Ecolors.spaceColor}>
          <Label multilanguage={false}>
            {`2. `}
            <Label>{`accountverify.diachilienhe`}</Label>
          </Label>
        </Div>
        <RowSpaceItem>
          <Label>{`accountverify.quocgia`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? mailingCountry?.name
                : mailingCountry?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.tinhthanhpho`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? mailingProvince?.name
                : mailingProvince?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.quanhuyen`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? mailingDistrict?.name
                : mailingDistrict?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.phuongxa`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>
              {I18nState == 'vi'
                ? mailingWard?.name
                : mailingWard?.nameEn || ''}
            </Label>
          </Div>
        </RowSpaceItem>
        <RowSpaceItem>
          <Label>{`accountverify.diachilienhe`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            paddingVertical={13}
            flex={1}
            paddingLeft={16}>
            <Label multilanguage={false}>{mailingAddress}</Label>
          </Div>
        </RowSpaceItem>
      </ScrollView>
    </Div>
  );
}

export default React.memo(AddressInfoModal);
