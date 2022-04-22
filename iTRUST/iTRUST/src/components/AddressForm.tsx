import {Div, Dropdown, InputItem, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useImperativeHandle, useState} from 'react';
import {checkAddress} from 'utils';

interface IValue {
  id: string;
  name: string;
  nameen: string;
}

function RowLBLContent(p: {content: string}) {
  return (
    <Div margin={10}>
      <Label multilanguage={false}>
        <Label>{p.content}</Label>
        {` (`}
        <Label color={Ecolors.red} multilanguage={false}>
          *
        </Label>
        {`)`}
      </Label>
    </Div>
  );
}

function AddressForm(p: {}, ref: any) {
  useImperativeHandle(ref, () => ({
    set: (a: any) => {
      setData(a);
      return;
    },
    get: () => {
      return getData();
    },
    clear: () => {
      clearData();
      return;
    },
  }));
  const [valueNation, setValueNation] = useState<any>(null);
  const [valueProvince, setValueProvince] = useState<any>(null);
  const [valueDistrict, setValueDistrict] = useState<any>(null);
  const [valueCommune, setValueCommune] = useState<any>(null);
  const [address, setAddress] = useState<string>('');

  const setData = (a: {
    country: IValue;
    province: IValue;
    district: IValue;
    ward: IValue;
    address: string;
  }) => {
    Promise.all([
      setValueNation(a.country),
      setValueProvince(a.province),
      setValueDistrict(a.district),
      setValueCommune(a.ward),
      setAddress(a.address),
    ]);
  };

  const getData = () => {
    if (
      checkAddress({
        address,
        valueCommune,
        valueDistrict,
        valueNation,
        valueProvince,
      })
    ) {
      return {
        country: valueNation,
        province: valueProvince,
        district: valueDistrict,
        ward: valueCommune,
        address: address,
      };
    }
    return null;
  };

  const clearData = () => {
    Promise.all([
      setValueNation(null),
      setValueProvince(null),
      setValueDistrict(null),
      setValueCommune(null),
      setAddress(''),
    ]);
  };
  return (
    <>
      <RowLBLContent content={`profile.address`} />
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
      />
    </>
  );
}

export default React.forwardRef(AddressForm);
