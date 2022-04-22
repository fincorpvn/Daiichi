import {useRoute} from '@react-navigation/core';
import {
  AddressForm,
  ButtonBorder,
  Div,
  Dropdown,
  HeaderBack,
  InputItem,
} from 'components';
import React, {useRef, useState} from 'react';
import {Alert} from 'react-native';
import {apiAuth, navigate} from 'services';
import {checkAddress} from 'utils';
import RowLBLContent from './RowLBLContent';

function ChangeAddressScreen() {
  const [valueNation, setValueNation] = useState<any>(null);
  const [valueProvince, setValueProvince] = useState<any>(null);
  const [valueDistrict, setValueDistrict] = useState<any>(null);
  const [valueCommune, setValueCommune] = useState<any>(null);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<any>();
  const addressFormRef = useRef<any>(null);

  const onSaveInfo = async () => {
    try {
      setLoading(true);
      if (addressFormRef.current) {
        const value = addressFormRef.current.get();
        console.log(value);
        if (value) {
          let res: any = null;
          if (route.params?.data?.flowApp == 'mailingAddress') {
            res = await apiAuth.changeMailingAddressCreate({
              mailingAddress: value.address,
              mailingCountryId: `${value.country?.id}`,
              mailingDistrictId: `${value.province?.id}`,
              mailingProvinceId: `${value.district?.id}`,
              mailingWardId: `${value.ward?.id}`,
            });
          } else {
            res = await apiAuth.changePermanentAddressCreate({
              permanentAddress: value.address,
              countryId: `${value.country?.id}`,
              provinceId: `${value.province?.id}`,
              districtId: `${value.district?.id}`,
              wardId: `${value.ward?.id}`,
            });
          }
          if (res.status == 200) {
            navigate('OtpRequestModal', {
              data: {
                requestOnSendOtp: res.data,
                flowApp: route.params?.data?.flowApp || '',
              },
            });
          }
        }
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div screen={true} useKeyboard={true}>
      <HeaderBack title={`profile.changeaddress`} />
      <AddressForm ref={addressFormRef} />
      {/* <RowLBLContent content={`profile.address`} />
      <InputItem
        value={address}
        onChangeText={a => setAddress(a)}
        marginHorizontal={10}
      />
      <RowLBLContent content={`profile.nation`} />
      <Dropdown
        isActive={true}
        value={valueNation}
        onChange={(a: any) => {
          setValueNation(a);
          setValueProvince(null);
          setValueDistrict(null);
          setValueCommune(null);
        }}
        url={'country/list'}
        content={'Vui lòng chọn quốc gia'}
      />
      <RowLBLContent content={`profile.city`} />
      <Dropdown
        isActive={!!valueNation}
        url={`province/list?countryId=${valueNation?.id}`}
        content={'Vui lòng chọn tỉnh/thành'}
        value={valueProvince}
        onChange={(a: any) => {
          setValueProvince(a);
          setValueDistrict(null);
          setValueCommune(null);
        }}
      />
      <RowLBLContent content={`profile.district`} />
      <Dropdown
        isActive={!!valueProvince}
        url={`district/list?provinceId=${valueProvince?.id}`}
        content={'Vui lòng chọn quận/huyện'}
        value={valueDistrict}
        onChange={(a: any) => {
          setValueDistrict(a);
          setValueCommune(null);
        }}
      />
      <RowLBLContent content={`profile.commune`} />
      <Dropdown
        url={`ward/list?districtId=${valueDistrict?.id}`}
        isActive={!!valueDistrict}
        value={valueCommune}
        onChange={(a: any) => {
          setValueCommune(a);
        }}
        content={'Vui lòng chọn phường/xã'}
      /> */}
      <ButtonBorder
        loading={loading}
        title={`profile.save`}
        onPress={() => onSaveInfo()}
      />
    </Div>
  );
}

export default React.memo(ChangeAddressScreen);
