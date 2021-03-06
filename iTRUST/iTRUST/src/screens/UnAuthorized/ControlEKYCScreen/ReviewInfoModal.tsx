import {useRoute} from '@react-navigation/core';
import {
  Alert,
  Button,
  ButtonBorder,
  Div,
  Dropdown,
  HeaderBack,
  ImageView,
  InputItem,
  Label,
  LoadingIndicator,
} from 'components';
import {Ecolors, Icons, stringApp} from 'constant';
import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {doLogin, getInfo} from 'reducer/authen';
import ConfirmContent from 'screens/MainScreen/AccountVerifyScreen/ConfirmContent';
import {apiAuth, goBack, navigate, uploadFile} from 'services';
import {useAppSelector} from 'store/hooks';
import {
  converRistInfoInDto,
  getAddressRejectWard,
  heightScale,
  Log,
  removeUtf8,
} from 'utils';
import Line from './Line';

function Lbl(p: {content: string; marginTop?: number}) {
  return <Label marginTop={p.marginTop || 0}>{p.content}</Label>;
}

function ItemII(p: {icon: any; title: string; children?: any}) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <Div paddingHorizontal={16} paddingTop={38}>
      <Button
        borderBottomWidth={0.7}
        borderBottomColor={Ecolors.spaceColor}
        paddingBottom={9}
        onPress={() => {
          setIsVisible(a => !a);
        }}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Div
          flex={1}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}>
          <ImageView
            source={p.icon}
            tintColor={Ecolors.textColor}
            widthHeight={19}
            resizeMode={'contain'}
          />
          <Div
            flex={1}
            flexDirection={'row'}
            alignItems={'center'}
            paddingRight={5}>
            <Label marginLeft={10} fontWeight={'700'}>
              {p.title}
            </Label>
          </Div>
        </Div>
        <ImageView
          tintColor={Ecolors.textColor}
          widthHeight={14}
          source={!isVisible ? Icons.down : Icons.up}
          resizeMode={'contain'}
        />
      </Button>
      {isVisible ? p.children : <></>}
    </Div>
  );
}

function ReviewInfoModal() {
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const userRedux = useAppSelector(state => state.authen.currentUser);

  const {statusScreen} = useAppSelector(state => state.authen);
  const {
    userProfile,
    userAddress,
    isKYC,
    name,
    phone,
    person,
    backCardImage,
    currentUser,
    email,
    frontCardImage,
  } = route?.params?.data;
  const [bank, setBank] = useState<any>(null);
  const [branch, setBranch] = useState<any>(null);
  const [annualIncome, setAnnualIncome] = useState<any>(null);
  const [incomeSource, setIncomeSource] = useState<any>(null);
  const [job, setJob] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [number, setNumber] = useState('');
  const [ward, setWard] = useState<any>(null);
  const [address, setAddress] = useState<string>('');
  //
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(true);
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [isAcceptFatca, setIsAcceptFatca] = useState<boolean>(true);
  //
  //
  const [mailingCountry, setMailingCountry] = useState<any>(null);
  const [mailingProvince, setMailingProvince] = useState<any>(null);
  const [mailingDistrict, setMailingDistrict] = useState<any>(null);
  const [mailingWard, setMailingWard] = useState<any>(null);
  const [mailingAddress, setMailingAddress] = useState<string>('');
  //
  const [riskAssessment, setRiskAssessment] = useState<any>({});
  //
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userAddress && userAddress?.mailingAddress?.length) {
      const r = getAddressRejectWard(userAddress?.mailingAddress || '');
      if (r.length) {
        setAddress(r);
        setIsEditAddress(false);
        if (isLike) {
          setMailingAddress(r);
        }
      } else {
        setAddress('');
        setIsEditAddress(true);
      }
    } else {
      setAddress('');
      setIsEditAddress(true);
    }
    return () => {};
  }, [userAddress]);

  useEffect(() => {
    if (!isLike) {
      Promise.all([
        setMailingCountry(userAddress?.country || null),
        setMailingProvince(null),
        setMailingDistrict(null),
        setMailingWard(null),
        setMailingAddress(''),
      ]);
    } else {
      const r = getAddressRejectWard(userAddress?.mailingAddress || '');
      Promise.all([
        setMailingCountry(userAddress?.country || null),
        setMailingProvince(userAddress?.province || null),
        setMailingDistrict(userAddress?.district || null),
        setMailingWard(userAddress?.ward || ward || null),
        setMailingAddress(address || r || ''),
      ]);
    }
    return () => {};
  }, [isLike]);

  useEffect(() => {
    let objjj = {};
    stringApp.riskAssessment.map((item: any, index: number) => {
      objjj[item.id] = item.data[0];
    });
    setRiskAssessment(objjj || {});
    return;
  }, []);

  const gotoEsign = () => {
    navigate('DigitalSignatureScreen', {
      isHideBack: true,
    });
    return;
  };

  const onConfirm = async () => {
    // check dataaa
    if (
      !isAccept ||
      !number.length ||
      !bank ||
      !position.length ||
      !job.length ||
      !incomeSource ||
      !annualIncome ||
      !branch ||
      //
      (!ward && !userAddress?.ward) ||
      !address.length ||
      //
      !mailingCountry ||
      !mailingProvince ||
      !mailingDistrict ||
      !mailingWard ||
      !mailingAddress.length
    ) {
      Alert.showError({
        multilanguage: true,
        content: `alert.vuilongnhapdayduthongtincanhan`,
      });
      return;
    }
    try {
      setLoading(true);
      const photoAfterURL: any = await uploadFile({
        fileBase64:
          Platform.OS === 'android'
            ? backCardImage.replace(/\n/g, '')
            : backCardImage,
      });
      const photoBeforeURL: any = await uploadFile({
        fileBase64:
          Platform.OS === 'android'
            ? frontCardImage.replace(/\n/g, '')
            : frontCardImage,
      });
      const avatarUrl: any = await uploadFile({
        fileBase64:
          Platform.OS === 'android'
            ? person.selfie.replace(/\n/g, '')
            : person.selfie,
      });
      const data: any = {
        userProfile: {
          ...route.params.data.userProfile,
          photoBeforeURL: photoBeforeURL?.url,
          photoBeforeFileName: 'cmnd-mat-truoc',
          photoAfterURL: photoAfterURL?.url,
          photoAfterFileName: 'cmnd-mat-sau',
          avatarUrl: avatarUrl?.url,
          avatarFileName: 'chan-dung',
        },
        isKYC: route.params.data.isKYC,
        userBankAccount: {
          bankId: `${bank?.id || ''}`,
          branchId: `${branch?.id || bank?.id || ''}`,
          name: removeUtf8(
            name || currentUser.name || userRedux.name || '',
          ).toLocaleUpperCase(),
          number: number,
          job: job || '',
          position: position || '',
          incomeSource: incomeSource?.id || 'SOURCE_OTHER',
          annualIncome: annualIncome?.id || '',
        },
        userAddress: {
          permanentAddress: address,
          countryId: userAddress.country?.id,
          provinceId: userAddress.province?.id,
          districtId: userAddress.district?.id,
          wardId: userAddress.ward?.id || ward?.id,
          //
          mailingAddress: mailingAddress,
          mailingCountryId: mailingCountry?.id,
          mailingProvinceId: mailingProvince?.id,
          mailingDistrictId: mailingDistrict?.id,
          mailingWardId: mailingWard?.id,
        },
        isFatca: isAcceptFatca,
        riskInfoInDto: converRistInfoInDto(riskAssessment),
        name: name || currentUser?.name || userRedux?.name, // 'Nguyen Thanh Phong';
        email: email || currentUser?.email || userRedux?.email, //'po.ntp.19946@gmail.com';
        phone: phone || currentUser?.phone || userRedux?.phone,
      };
      const res = await apiAuth.createEKYC(data);
      setLoading(false);
      if (res.status == 200) {
        dispatch(getInfo({}));
        Alert.show({
          content: `alert.dangkytaikhoanthanhcong`, // I18nState == 'vi' ? res.message : res.messageEn,
          type: 2,
          titleClose: `alert.dongy`,
          onClose: async () => {
            gotoEsign;
          },
          onConfirm: async () => {
            gotoEsign();
          },
        });
      }
    } catch (error: any) {
      Alert.show({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
        type: 2,
        titleClose: `alert.dongy`,
      });
    } finally {
      setLoading(false);
    }
  };

  const checkToSetdata = (e: string, func: (r: string) => void) => {
    if (e.length == 0) {
      func(e);
      return;
    }
    const t: string = e[e.length ? e.length - 1 : 0] || '';
    const reg = /^[0-9]*$/;
    if (reg.test(t)) {
      func(e);
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      {loading && (
        <Div
          style={StyleSheet.absoluteFillObject}
          zIndex={9999}
          elevation={9999}
          alignItems={'center'}
          width={'100%'}
          height={'100%'}
          backgroundColor={Ecolors.transparentLoading}
          justifyContent={'center'}>
          <LoadingIndicator color={Ecolors.mainColor} />
        </Div>
      )}
      <HeaderBack
        type={4}
        contentCenter={true}
        title={`reviewinfoscreen.hosocanhan`}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Line />
        <ItemII
          icon={Icons.bank}
          title={`reviewinfoscreen.thongtintaikhoannganhang`}>
          <Lbl
            marginTop={23}
            content={`accountverify.thongtintaikhoannganhang`}
          />
          <Lbl marginTop={16} content={`accountverify.tenchutaikhoan`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={removeUtf8(name?.toLocaleUpperCase() || '')}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`accountverify.sotaikhoan`} />
          <InputItem
            keyboardType={'number-pad'}
            value={number}
            onChangeText={a => checkToSetdata(a, r => setNumber(r))}
            marginHorizontal={0}
            marginTop={6}
          />
          <Lbl marginTop={13} content={`accountverify.tennganhang`} />
          <Dropdown
            multilanguage={true}
            url={'bank/list'}
            isActive={true}
            value={bank}
            marginTop={6}
            paddingHorizontal={0}
            content={`accountverify.vuilongchonnganhang`}
            onChange={a => {
              setBank(a);
              setBranch(null);
            }}
          />
          <Lbl marginTop={13} content={`accountverify.chinhanh`} />
          <Dropdown
            multilanguage={true}
            isActive={!!bank}
            content={`accountverify.vuilongchonchinhanh`}
            url={`bank/branch/list?bankId=${bank?.id || 0}`}
            marginTop={6}
            value={branch}
            paddingHorizontal={0}
            onChange={a => setBranch(a)}
          />
          <Lbl marginTop={23} content={`accountverify.thongtinkhac`} />
          <Lbl marginTop={13} content={`accountverify.nghenghiep`} />
          <InputItem
            // keyboardType={'number-pad'}
            value={job}
            onChangeText={a => setJob(a)}
            marginHorizontal={0}
            marginTop={6}
          />
          <Lbl marginTop={13} content={`accountverify.chucvu`} />
          <InputItem
            // keyboardType={'number-pad'}
            value={position}
            onChangeText={a => setPosition(a)}
            marginHorizontal={0}
            marginTop={6}
          />
          <Lbl marginTop={13} content={`accountverify.mucthunhaphangthang`} />
          <Dropdown
            multilanguage={true}
            isActive={true}
            content={`accountverify.mucthunhaphangthang`}
            // url={`bank/branch/list?bankId=${bank?.id || 0}`}
            initData={stringApp.monthlyIncom || []}
            marginTop={6}
            value={annualIncome}
            paddingHorizontal={0}
            onChange={a => setAnnualIncome(a)}
          />
          <Lbl marginTop={13} content={`accountverify.nguontiendautu`} />
          <Dropdown
            multilanguage={true}
            isActive={true}
            content={`accountverify.nguontiendautu`}
            initData={stringApp.source || []}
            marginTop={6}
            value={incomeSource}
            paddingHorizontal={0}
            onChange={a => setIncomeSource(a)}
          />
        </ItemII>
        <ItemII
          title={'reviewinfoscreen.thongtincanhan'}
          icon={Icons.profileinfo}>
          <Lbl marginTop={23} content={`reviewinfoscreen.thongtinnhadautu`} />
          <Lbl marginTop={23} content={`reviewinfoscreen.hoten`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={name}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.gioitinh`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={
              userProfile?.gender == 1
                ? I18nState == 'vi'
                  ? 'Nam'
                  : 'Male'
                : I18nState == 'vi'
                ? 'N???'
                : 'Female'
            }
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.ngaysinh`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={person?.dob || ''}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.quoctich`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={
              I18nState == 'vi'
                ? userAddress?.country?.name
                : userAddress?.country?.nameEn || ''
            }
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.email`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={email || currentUser?.email || userRedux?.email || ''}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.sodienthoai`} />
          <Div
            marginTop={6}
            flexDirection={'row'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}>
            <Div width={99}>
              <InputItem
                // inputRef={phonePostal}
                placeholder={''}
                isInput={false}
                keyboardType={'name-phone-pad'}
                marginHorizontal={0}
                value={'+84'}
              />
            </Div>
            <Div width={198}>
              <InputItem
                isInput={false}
                value={phone || currentUser?.phone || userRedux?.phone || ''}
                marginHorizontal={0}
              />
            </Div>
          </Div>

          <Lbl marginTop={36} content={`reviewinfoscreen.thongtingiayto`} />
          <Label
            marginTop={4}
            size={12}
            color={Ecolors.grayColor}>{`reviewinfoscreen.note`}</Label>
          <Lbl marginTop={13} content={`reviewinfoscreen.loaigiayto`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={userProfile?.idTypeId == 1 ? 'CMND' : ''}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.sohieugiayto`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={userProfile?.idNo || ''}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.ngaycap`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={person?.doi || ''}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`reviewinfoscreen.noicap`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={userProfile?.placeOfIssue || ''}
            marginHorizontal={0}
          />
          {/* <Label marginTop={20} size={14}>
            {`reviewinfoscreen.taihinhanh`}
          </Label> */}
          <Div
            flexDirection={'row'}
            marginTop={6}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <ImageView
              width={161}
              height={100}
              borderRadius={5}
              resizeMode={'contain'}
              source={{
                uri: `data:image/png;base64,${frontCardImage}`,
              }}
            />
            <ImageView
              borderRadius={5}
              width={161}
              height={100}
              resizeMode={'contain'}
              source={{
                uri: `data:image/png;base64,${backCardImage}`,
              }}
            />
          </Div>
          <Div
            flexDirection={'row'}
            marginTop={19}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <ImageView
              width={110}
              height={150}
              borderRadius={5}
              resizeMode={'contain'}
              source={{
                uri: `data:image/png;base64,${person?.selfie}`,
              }}
            />
          </Div>
        </ItemII>

        <ItemII title={'reviewinfoscreen.thongtindiachi'} icon={Icons.address}>
          <Lbl marginTop={16} content={`reviewinfoscreen.diachithuongtru`} />
          <Lbl marginTop={19} content={`reviewinfoscreen.quocgia`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={
              I18nState == 'vi'
                ? userAddress?.country?.name
                : userAddress?.country?.nameEn || ''
            }
            marginHorizontal={0}
          />
          <Lbl marginTop={19} content={`reviewinfoscreen.tinhthanhpho`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={
              I18nState == 'vi'
                ? userAddress?.province?.name
                : userAddress?.province?.nameEn || ''
            }
            marginHorizontal={0}
          />
          <Lbl marginTop={19} content={`reviewinfoscreen.quanhuyen`} />
          <InputItem
            marginTop={6}
            isInput={false}
            value={
              I18nState == 'vi'
                ? userAddress?.district?.name
                : userAddress?.district?.nameEn || ''
            }
            marginHorizontal={0}
          />
          <Lbl marginTop={19} content={`reviewinfoscreen.phuongxa`} />
          {userAddress?.ward ? (
            <InputItem
              marginTop={6}
              isInput={false}
              value={
                I18nState == 'vi'
                  ? userAddress?.ward?.name
                  : userAddress?.ward?.nameEn || ''
              }
              marginHorizontal={0}
            />
          ) : (
            <Dropdown
              multilanguage={true}
              isActive={!userAddress?.ward}
              content={`accountverify.vuilongchonphuongxa`}
              url={`ward/list?districtId=${userAddress?.district?.id || 0}`}
              marginTop={6}
              value={userAddress?.ward || ward}
              paddingHorizontal={0}
              onChange={a => {
                if (isLike) {
                  setMailingWard(a);
                }
                setWard(a);
              }}
            />
          )}
          <Lbl marginTop={19} content={`reviewinfoscreen.sonhatenduong`} />
          <InputItem
            marginTop={6}
            isInput={!(!!userAddress?.ward && !isEditAddress)}
            value={address}
            onChangeText={(t: string) => {
              if (isLike) {
                setMailingAddress(t);
              }
              setAddress(t);
            }}
            marginHorizontal={0}
          />
          <Lbl marginTop={23} content={`reviewinfoscreen.diachilienhe`} />
          <Div>
            <Div
              marginTop={19}
              backgroundColor={Ecolors.bgtime}
              borderRadius={5}
              padding={5}
              flexDirection={'row'}
              alignItems={'center'}>
              <Div
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundColor={isLike ? Ecolors.whiteColor : Ecolors.bgtime}
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
                backgroundColor={!isLike ? Ecolors.whiteColor : Ecolors.bgtime}
                marginLeft={5}>
                <Label>{`accountverify.diachikhac`}</Label>
              </Button>
            </Div>
          </Div>

          <Label marginTop={13}>{`accountverify.quocgia`}</Label>
          <Dropdown
            url={`country/list`}
            content={`accountverify.vuilongchonquocgia`}
            value={mailingCountry}
            multilanguage={true}
            paddingHorizontal={0}
            marginTop={6}
            isActive={!isLike}
            onChange={(a: any) => {
              setMailingCountry(a);
              setMailingProvince(null);
              setMailingDistrict(null);
              setMailingWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.tinhthanhpho`}</Label>
          <Dropdown
            multilanguage={true}
            url={`province/list?countryId=${mailingCountry?.id || 234}`}
            content={`accountverify.vuilongchontinhthanhpho`}
            value={mailingProvince}
            paddingHorizontal={0}
            marginTop={6}
            isActive={!isLike && !!mailingCountry}
            onChange={(a: any) => {
              setMailingProvince(a);
              setMailingDistrict(null);
              setMailingWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.quanhuyen`}</Label>
          <Dropdown
            url={`district/list?provinceId=${mailingProvince?.id || 0}`}
            multilanguage={true}
            content={`accountverify.vuilongchonquanhuyen`}
            value={mailingDistrict}
            paddingHorizontal={0}
            marginTop={6}
            isActive={!isLike && !!mailingCountry && !!mailingProvince}
            onChange={(a: any) => {
              setMailingDistrict(a);
              setMailingWard(null);
            }}
          />
          <Label marginTop={13}>{`accountverify.phuongxa`}</Label>
          <Dropdown
            multilanguage={true}
            url={`ward/list?districtId=${mailingDistrict?.id || 0}`}
            content={`accountverify.vuilongchonphuongxa`}
            value={mailingWard}
            paddingHorizontal={0}
            marginTop={6}
            isActive={
              !isLike &&
              !!mailingCountry &&
              !!mailingProvince &&
              !!mailingDistrict
            }
            onChange={(a: any) => {
              setMailingWard(a);
            }}
          />
          <Label marginTop={16}>{`reviewinfoscreen.sonhatenduong`}</Label>
          <InputItem
            value={mailingAddress}
            isInput={
              !isLike &&
              !!mailingCountry &&
              !!mailingProvince &&
              !!mailingDistrict &&
              !!mailingWard
            }
            onChangeText={setMailingAddress}
            marginHorizontal={0}
            marginTop={6}
          />
        </ItemII>
        <ItemII
          title={'reviewinfoscreen.danhgiamucdoruiro'}
          icon={Icons.riskassessment}>
          {stringApp.riskAssessment.map((item: any, index: number) => {
            return (
              <Div marginTop={13} key={item.id}>
                <Label multilanguage={false}>
                  {I18nState == 'vi' ? item.content : item.contentEn}
                </Label>
                <Dropdown
                  multiline={true}
                  marginTop={13}
                  paddingHorizontal={0}
                  multilanguage={false}
                  isActive={true}
                  value={riskAssessment[item.id]}
                  content={I18nState == 'vi' ? item.content : item.contentEn}
                  initData={item.data}
                  onChange={datachange => {
                    setRiskAssessment(a => {
                      return {
                        ...a,
                        [item.id]: datachange,
                      };
                    });
                  }}
                />
              </Div>
            );
          })}
        </ItemII>
        <ItemII
          title={'reviewinfoscreen.dieukhoandieukienmotaikhoan'}
          icon={Icons.condition}>
          <Label
            marginTop={15}
            size={15}
            marginBottom={10}
            fontWeight={'700'}>{`reviewinfoscreen.dieukhoansudung`}</Label>
          <ConfirmContent
            email={email || currentUser?.email || userRedux?.email || ''}
          />
          <Div
            flexDirection={'row'}
            paddingTop={17}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}>
            <Button
              widthHeight={25}
              onPress={() => {
                setIsAcceptFatca(a => !a);
              }}
              marginRight={13}
              borderWidth={1}
              alignItems={'center'}
              justifyContent={'center'}
              borderColor={
                isAcceptFatca ? Ecolors.mainColor : Ecolors.spaceColor
              }
              borderRadius={25}>
              <ImageView
                source={isAcceptFatca ? Icons.check : Icons.uncheck}
                widthHeight={20}
                tintColor={
                  isAcceptFatca ? Ecolors.mainColor : Ecolors.grayColor
                }
              />
            </Button>
            <Div flex={1}>
              <Label>{`accountverify.tongdongyvoidieukhoanfatca`}</Label>
            </Div>
          </Div>
          <Div
            flexDirection={'row'}
            width={'100%'}
            paddingBottom={24}
            paddingTop={17}
            alignItems={'center'}
            justifyContent={'flex-start'}>
            <Button
              widthHeight={25}
              onPress={() => {
                setIsAccept(a => !a);
              }}
              marginRight={13}
              borderWidth={1}
              alignItems={'center'}
              justifyContent={'center'}
              borderColor={isAccept ? Ecolors.mainColor : Ecolors.spaceColor}
              borderRadius={25}>
              <ImageView
                source={isAccept ? Icons.check : Icons.uncheck}
                widthHeight={20}
                tintColor={isAccept ? Ecolors.mainColor : Ecolors.grayColor}
              />
            </Button>
            <Div flex={1}>
              <Label>{`accountverify.toidongyvoidieukhoantren`}</Label>
            </Div>
          </Div>
        </ItemII>

        <Div height={120} />
      </ScrollView>
      <Div
        width={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        style={{
          paddingBottom: insets.bottom + heightScale(20),
        }}
        paddingTop={10}
        justifyContent={'center'}>
        <ButtonBorder
          type={1}
          isDisable={
            !isAccept ||
            !number.length ||
            !job.length ||
            !position.length ||
            !bank ||
            !branch ||
            !annualIncome ||
            //
            (!ward && !userAddress?.ward) ||
            !address.length ||
            //
            !mailingCountry ||
            !mailingProvince ||
            !mailingDistrict ||
            !mailingWard ||
            !mailingAddress.length
          }
          onPress={() => {
            onConfirm();
          }}
          title={`reviewinfoscreen.hoantat`}
        />
      </Div>
    </Div>
  );
}

export default React.memo(ReviewInfoModal);
