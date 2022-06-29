import {useRoute} from '@react-navigation/core';
import {
  AddressForm,
  Alert,
  Button,
  ButtonBorder,
  Div,
  Dropdown,
  HeaderBack,
  InputItem,
  Label,
} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getInfo} from 'reducer/authen';
import {apiAuth, goBack, navigate} from 'services';
import {useAppSelector} from 'store/hooks';

function EditAddressInfoModal() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(true);
  const control = useRef<boolean>(true);
  //
  const [permanentCountry, setPermanentCountry] = useState<any>(null);
  const [permanentProvince, setPermanentProvince] = useState<any>(null);
  const [permanentDistrict, setPermanentDistrict] = useState<any>(null);
  const [permanentWard, setpermanentWard] = useState<any>(null);
  const [permanentAddress, setPermanentAddress] = useState<string>('');
  //
  const [mailingCountry, setMailingCountry] = useState<any>(null);
  const [mailingProvince, setMailingProvince] = useState<any>(null);
  const [mailingDistrict, setMailingDistrict] = useState<any>(null);
  const [mailingWard, setMailingWard] = useState<any>(null);
  const [mailingAddress, setMailingAddress] = useState<string>('');

  const I18nState = useAppSelector(state => state.languages.I18nState);

  //
  const route = useRoute<any>();
  const {data} = route.params;
  const dispatch = useDispatch();

  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {
    email,
    phone,
    riskInfo,
    bankAccountIsFull,
    userInfoIsFull,
    userAddressIsFull,
  } = currentUser;

  useEffect(() => {
    bindData();
    return () => {};
  }, [currentUser]);

  useEffect(() => {
    if (!control.current) {
      if (!isLike) {
        Promise.all([
          setMailingCountry(null),
          setMailingProvince(null),
          setMailingDistrict(null),
          setMailingWard(null),
          setMailingAddress(''),
        ]);
      } else {
        Promise.all([
          setMailingCountry(permanentCountry || null),
          setMailingProvince(permanentProvince || null),
          setMailingDistrict(permanentDistrict || null),
          setMailingWard(permanentWard || null),
          setMailingAddress(permanentAddress),
        ]);
      }
    }
    return () => {};
  }, [isLike]);

  const bindData = async () => {
    try {
      control.current = true;
      await Promise.all([
        setMailingCountry(data.mailingCountry || null),
        setMailingProvince(data.mailingProvince || null),
        setMailingDistrict(data.mailingDistrict || null),
        setMailingWard(data.mailingWard || null),
        setMailingAddress(currentUser?.mailingAddress),
        //
        setPermanentAddress(currentUser?.permanentAddress),
        setPermanentCountry(data.permanentCountry || null),
        setPermanentProvince(data.permanentProvince || null),
        setPermanentDistrict(data.permanentDistrict || null),
        setpermanentWard(data.permanentWard || null),
      ]);
    } catch (error) {
    } finally {
      setTimeout(() => {
        control.current = false;
      }, 1000);
    }
  };

  const confirm = async () => {
    try {
      setLoading(true);
      if (
        !permanentCountry ||
        !permanentProvince ||
        !permanentDistrict ||
        !permanentWard ||
        !permanentAddress?.length ||
        !mailingCountry ||
        !mailingProvince ||
        !mailingDistrict ||
        !mailingWard ||
        !mailingAddress?.length
      ) {
        Alert.showError({
          content: `alert.vuilongnhapdayduthongtindiachi`,
          onPress: () => {},
        });
        return;
      }

      const objData = {
        countryId: permanentCountry?.id || 234,
        provinceId: permanentProvince?.id,
        districtId: permanentDistrict?.id,
        wardId: permanentWard?.id,
        permanentAddress: permanentAddress,
        //
        mailingCountryId: mailingCountry?.id || 234,
        mailingProvinceId: mailingProvince?.id,
        mailingDistrictId: mailingDistrict?.id,
        mailingWardId: mailingWard?.id,
        mailingAddress: mailingAddress,
      };

      const res = await (userAddressIsFull
        ? apiAuth.updateInvestmentAddressTypeUpdate(objData)
        : apiAuth.updateInvestmentAddress(objData));
      if (userAddressIsFull && res.data) {
        navigate('OtpRequestModal', {
          data: {
            requestOnSendOtp: res.data,
            flowApp: 'UpdateAddressInfo',
          },
          onConfirm: () => {
            dispatch(getInfo({}));
            Alert.show({
              type: 2,
              titleClose: 'alert.dong',
              content: `alert.capnhatdiachithanhcong`,
              onConfirm: () => {
                navigate('AccountVerifyScreen');
              },
              onClose: () => {
                navigate('AccountVerifyScreen');
              },
              onCancel: () => {
                navigate('AccountVerifyScreen');
              },
            });
            return;
          },
        });
        return;
      }
      if (res.status == 200) {
        dispatch(getInfo({}));
        Alert.show({
          type: 2,
          titleClose: 'alert.dong',
          content: `alert.capnhatdiachithanhcong`,
          onConfirm: () => {
            navigate('AccountVerifyScreen');
          },
          onClose: () => {
            navigate('AccountVerifyScreen');
          },
          onCancel: () => {
            navigate('AccountVerifyScreen');
          },
        });
        return;
      }
      Alert.showError({
        content: I18nState == 'vi' ? res.message : res.messageEn,
        multilanguage: false,
        onPress: () => {
          navigate('AccountVerifyScreen');
        },
      });
      return;
    } catch (error: any) {
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
        onPress: () => {},
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        type={2}
        titleRight={`accountverify.save`}
        loading={loading}
        onRightPress={() => {
          confirm();
        }}
        title={`accountverify.thongtindiachi`}
      />
      <ScrollView>
        {/* dia chi thuong tru */}
        <Div padding={16} backgroundColor={Ecolors.spaceColor}>
          <Label multilanguage={false}>
            {`1. `}
            <Label>{`accountverify.diachithuongtru`}</Label>
          </Label>
        </Div>
        <Div paddingHorizontal={16}>
          <Label marginTop={13}>{`accountverify.quocgia`}</Label>
          <Dropdown
            url={`country/list`}
            content={`accountverify.vuilongchonquocgia`}
            multilanguage={true}
            value={permanentCountry}
            paddingHorizontal={0}
            marginTop={6}
            isActive={true}
            onChange={(a: any) => {
              if (isLike) {
                setMailingCountry(a);
              }
              setPermanentCountry(a);
              setPermanentProvince(null);
              setPermanentDistrict(null);
              setpermanentWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.tinhthanhpho`}</Label>
          <Dropdown
            url={`province/list?countryId=${permanentCountry?.id || 234}`}
            content={`accountverify.vuilongchontinhthanhpho`}
            multilanguage={true}
            value={permanentProvince}
            paddingHorizontal={0}
            marginTop={6}
            isActive={!!permanentCountry}
            onChange={(a: any) => {
              if (isLike) {
                setMailingProvince(a);
              }
              setPermanentProvince(a);
              setPermanentDistrict(null);
              setpermanentWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.quanhuyen`}</Label>
          <Dropdown
            url={`district/list?provinceId=${permanentProvince?.id || 0}`}
            content={`accountverify.vuilongchonquanhuyen`}
            multilanguage={true}
            value={permanentDistrict}
            paddingHorizontal={0}
            marginTop={6}
            isActive={!!permanentCountry && !!permanentProvince}
            onChange={(a: any) => {
              if (isLike) {
                setMailingDistrict(a);
              }
              setPermanentDistrict(a);
              setpermanentWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.phuongxa`}</Label>
          <Dropdown
            url={`ward/list?districtId=${permanentDistrict?.id || 0}`}
            content={`accountverify.vuilongchonphuongxa`}
            multilanguage={true}
            value={permanentWard}
            paddingHorizontal={0}
            marginTop={6}
            isActive={
              !!permanentCountry && !!permanentProvince && !!permanentDistrict
            }
            onChange={(a: any) => {
              if (isLike) {
                setMailingWard(a);
              }
              setpermanentWard(a);
            }}
          />
          <Label marginTop={16}>{`accountverify.sonhatenduong`}</Label>
          <InputItem
            value={permanentAddress}
            isInput={
              !!permanentCountry &&
              !!permanentProvince &&
              !!permanentDistrict &&
              !!permanentWard
            }
            onChangeText={(a: string) => {
              setPermanentAddress(a);
              if (isLike) {
                setMailingAddress(a);
              }
            }}
            marginHorizontal={0}
            marginTop={6}
          />
        </Div>
        {/* dia chi lien he */}
        <Div padding={16} marginTop={21} backgroundColor={Ecolors.spaceColor}>
          <Label multilanguage={false}>
            {`2. `}
            <Label>{`accountverify.diachilienhe`}</Label>
          </Label>
        </Div>

        <Div paddingHorizontal={16}>
          <Div
            marginTop={19}
            backgroundColor={Ecolors.spaceColor}
            borderRadius={5}
            padding={5}
            flexDirection={'row'}
            alignItems={'center'}>
            <Div
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              backgroundColor={isLike ? Ecolors.whiteColor : Ecolors.spaceColor}
              borderRadius={5}>
              <Button
                justifyContent={'center'}
                alignItems={'center'}
                onPress={() => {
                  setIsLike(true);
                }}
                paddingVertical={10}>
                <Label>{`accountverify.giongdiachithuongtru`}</Label>
              </Button>
            </Div>
            <Button
              onPress={() => {
                setIsLike(false);
              }}
              padding={10}
              borderRadius={5}
              alignItems={'center'}
              justifyContent={'center'}
              backgroundColor={
                !isLike ? Ecolors.whiteColor : Ecolors.spaceColor
              }
              marginLeft={5}>
              <Label>{`accountverify.diachikhac`}</Label>
            </Button>
          </Div>
          <Label marginTop={13}>{`accountverify.quocgia`}</Label>
          <Dropdown
            url={`country/list`}
            content={`accountverify.vuilongchonquocgia`}
            multilanguage={true}
            value={mailingCountry}
            paddingHorizontal={0}
            marginTop={6}
            isActive={true}
            onChange={(a: any) => {
              setMailingCountry(a);
              setMailingProvince(null);
              setMailingDistrict(null);
              setMailingWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.tinhthanhpho`}</Label>
          <Dropdown
            url={`province/list?countryId=${mailingCountry?.id || 234}`}
            content={`accountverify.vuilongchontinhthanhpho`}
            multilanguage={true}
            value={mailingProvince}
            paddingHorizontal={0}
            marginTop={6}
            isActive={!!mailingCountry}
            onChange={(a: any) => {
              setMailingProvince(a);
              setMailingDistrict(null);
              setMailingWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.quanhuyen`}</Label>
          <Dropdown
            url={`district/list?provinceId=${mailingProvince?.id || 0}`}
            content={`accountverify.vuilongchonquanhuyen`}
            multilanguage={true}
            value={mailingDistrict}
            paddingHorizontal={0}
            marginTop={6}
            isActive={!!mailingCountry && !!mailingProvince}
            onChange={(a: any) => {
              setMailingDistrict(a);
              setMailingWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.phuongxa`}</Label>
          <Dropdown
            url={`ward/list?districtId=${mailingDistrict?.id || 0}`}
            content={`accountverify.vuilongchonphuongxa`}
            multilanguage={true}
            value={mailingWard}
            paddingHorizontal={0}
            marginTop={6}
            isActive={
              !!mailingCountry && !!mailingProvince && !!mailingDistrict
            }
            onChange={(a: any) => {
              setMailingWard(a);
            }}
          />
          <Label marginTop={16}>{`accountverify.sonhatenduong`}</Label>
          <InputItem
            value={mailingAddress}
            isInput={
              !!mailingCountry &&
              !!mailingProvince &&
              !!mailingDistrict &&
              !!mailingWard
            }
            onChangeText={setMailingAddress}
            marginHorizontal={0}
            marginTop={6}
          />
        </Div>
        <Div height={350} />
      </ScrollView>
    </Div>
  );
}

export default React.memo(EditAddressInfoModal);
