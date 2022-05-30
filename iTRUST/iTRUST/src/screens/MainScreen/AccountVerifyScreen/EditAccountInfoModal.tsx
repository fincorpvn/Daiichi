import {
  Alert,
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
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getInfo} from 'reducer/authen';
import {apiAuth, goBack, navigate, uploadFile} from 'services';
import {apiMain} from 'services/apis/apiMain';
import {useAppSelector} from 'store/hooks';
import {
  convertTimestamp,
  getImageLibrary,
  getUuid,
  joinObjectCalendar,
  Log,
  reJoinObjectCalendar,
  widthScale,
  widthScreen,
} from 'utils';

function Lbl(p: {content: string}) {
  return (
    <Label marginTop={10} multilanguage={false}>
      <Label>{p.content}</Label>
      {` (`}
      <Label multilanguage={false} color={Ecolors.red}>
        *
      </Label>
      {`)`}
    </Label>
  );
}

function DivPhoto(P: {
  onGetImage: () => void;
  value?: any;
  loading: boolean;
  title?: string;
}) {
  return (
    <Div style={s.imgContainer}>
      <Button
        marginTop={10}
        borderRadius={10}
        borderWidth={0.5}
        borderColor={Ecolors.gray}
        overflow={'hidden'}
        borderStyle={'dashed'}
        marginHorizontal={5}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'row'}
        style={s.sbutton}
        onPress={() => P.onGetImage && P.onGetImage()}>
        {P.value ? (
          <>
            <ImageView
              source={{
                uri: P.value?.uri || P.value?.url,
              }}
              style={s.sbutton}
            />
            {P.loading && (
              <Div
                style={StyleSheet.absoluteFillObject}
                alignItems={'center'}
                justifyContent={'center'}
                backgroundColor={Ecolors.transparentLoading}>
                <ActivityIndicator size={'small'} color={Ecolors.blue} />
              </Div>
            )}
          </>
        ) : (
          <Div flexDirection={'row'} alignItems={'center'}>
            <ImageView
              source={Icons.uploadfile}
              widthHeight={22}
              marginRight={10}
              tintColor={Ecolors.textColor}
            />
            <Label>{P.title || `accountverify.taianhmattruoc`}</Label>
          </Div>
        )}
      </Button>
    </Div>
  );
}

function EditAccountInfoModal() {
  const dispatch = useDispatch();
  const currentUser = useAppSelector(state => state.authen.currentUser);
  // const {email, phone, name} = currentUser;
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loadingUploadImage, setLoadingUploadImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nationality, setNationality] = useState<any>(null);
  const [gender, setGender] = useState<number>(1);
  const [type, setType] = useState<any>(null);
  const [dob, setDob] = useState<any>(null);
  const [dateOfIssue, setDateOfIssue] = useState<any>(null);
  const [photoAfter, setPhotoAfter] = useState<any>(null);
  const [loadingPhotoAfter, setLoadingPhotoAfter] = useState<boolean>(false);
  const [loadingPhotoBefore, setLoadingPhotoBefore] = useState<boolean>(false);
  const [photoBefore, setPhotoBefore] = useState<any>(null);
  const [placeOfIssue, setPlaceOfIssue] = useState<string>('');
  const [idNo, setIdNo] = useState<string>('');

  const I18nState = useAppSelector(state => state.languages.I18nState);

  useEffect(() => {
    setTimeout(() => {
      getCountryData();
      bindData(currentUser);
    }, 200);
    return () => {};
  }, [currentUser]);

  const getCountryData = async () => {
    try {
      const res = await apiMain.getCountry();
      if (res.data) {
        const dataNationality = res.data?.find(
          (a: any) => a?.id == currentUser?.nationalityId,
        );
        if (dataNationality) {
          setNationality(dataNationality);
        }
      }
    } catch (error) {}
  };

  const bindData = async (a: any) => {
    await Promise.all([
      setName(a?.name || ''),
      setPhone(a?.phone || ''),
      setEmail(a?.email || ''),
      setGender(a?.gender || null),
      setType(
        a?.idTypeId == 1
          ? {id: '1', name: 'CMND/CCCD', namevn: 'CMND/CCCD'}
          : {
              id: '5',
              name: 'Mã giao dịch chứng khoán',
              nameen: 'Mã giao dịch chứng khoán',
            },
      ),
      setDob(reJoinObjectCalendar(convertTimestamp(a?.dob))),
      setDateOfIssue(reJoinObjectCalendar(convertTimestamp(a?.dateOfIssue))),
      setPlaceOfIssue(a?.placeOfIssue || ''),
      setIdNo(a?.idNo || ''),
      setPhotoBefore(a?.userPhotos?.[0] || null),
      setPhotoAfter(a?.userPhotos?.[1] || null),
    ]);
  };

  const onGetImage = async (callback: (e: any) => void) => {
    try {
      const img: any = await getImageLibrary();
      if (img?.length > 0) {
        const image = img[0];
        const dataUPload: any = await uploadFile({
          fileBase64:
            Platform.OS === 'android'
              ? image.base64.replace(/\n/g, '')
              : image.base64,
        });
        callback && callback({...image, dataUPload});
      }
    } catch (error) {
    } finally {
      setLoadingPhotoAfter(false);
      setLoadingPhotoBefore(false);
    }
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      if (
        !idNo.length ||
        !nationality ||
        !photoAfter ||
        !photoBefore ||
        !placeOfIssue
      ) {
        Alert.showError({
          content: `alert.vuilongnhapdayduthongtincanhan`,
          onPress: () => {},
        });
        return;
      }
      Log('data', {
        dateOfIssue: joinObjectCalendar(dateOfIssue),
        dob: joinObjectCalendar(dob),
        gender: gender,
        idNo: idNo,
        idTypeId: type?.id || '5',
        nationalityId: `${nationality?.id}` || '234',
        photoAfterFileName: photoAfter?.fileName || '',
        photoAfterURL:
          photoAfter?.dataUPload?.url ||
          photoAfter?.uri ||
          photoAfter?.url ||
          '',
        photoBeforeFileName: photoBefore?.fileName || '',
        photoBeforeURL:
          photoBefore?.dataUPload?.url ||
          photoBefore?.uri ||
          photoBefore?.url ||
          '',
        placeOfIssue: placeOfIssue,
        nationality,
      });
      // return;
      const res = await apiAuth.updateInvestmentInfo({
        dateOfIssue: joinObjectCalendar(dateOfIssue),
        dob: joinObjectCalendar(dob),
        gender: gender || 0,
        idNo: idNo,
        idTypeId: type?.id || '5',
        nationalityId: nationality?.id || '234',
        photoAfterFileName: photoAfter?.fileName || '',
        photoAfterURL:
          photoAfter?.dataUPload?.url ||
          photoAfter?.uri ||
          photoAfter?.url ||
          '',
        photoBeforeFileName: photoBefore?.fileName || '',
        photoBeforeURL:
          photoBefore?.dataUPload?.url ||
          photoBefore?.uri ||
          photoBefore?.url ||
          '',
        placeOfIssue: placeOfIssue,
      });
      if (res.status == 200) {
        dispatch(getInfo({}));
        Alert.show({
          type: 2,
          titleClose: 'alert.dong',
          content: `alert.capnhatthongtincanhanthanhcong`,
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
          // navigate('AccountVerifyScreen');
        },
      });
    } catch (error: any) {
      console.log('err', error);
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
        onPress: () => {
          // navigate('AccountVerifyScreen');
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nationality?.id == '234') {
      setType({
        id: '1',
        name: 'CMND/CCCD',
        namevn: 'CMND/CCCD',
      });
    } else {
      setType({
        id: '5',
        name: 'Mã giao dịch chứng khoán',
        nameen: 'Mã giao dịch chứng khoán',
      });
    }
  }, [nationality]);

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        loading={loading}
        titleRight={`accountverify.save`}
        type={2}
        onRightPress={() => {
          onConfirm();
        }}
        title={`accountverify.thongtincanhan`}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          paddingHorizontal={16}
          height={48}
          backgroundColor={'rgba(73, 85, 163, 0.1)'}>
          <Label>{`accountverify.thongtinnhadautu`}</Label>
        </Div>

        <Label marginTop={16} marginLeft={16}>{`accountverify.hoten`}</Label>
        <InputItem
          isInput={false}
          onChangeText={setName}
          marginTop={6}
          marginHorizontal={16}
          value={name}
        />

        <Label marginTop={13} marginLeft={16}>{`accountverify.gioitinh`}</Label>
        <GenderCheckbox value={gender} onChange={a => setGender(a)} />

        <Label marginTop={24} marginLeft={16}>{`accountverify.ngaysinh`}</Label>
        <Calendar
          initValue={reJoinObjectCalendar(convertTimestamp(currentUser.dob))}
          onChange={(e: any) => setDob(e)}
        />
        <Label marginTop={13} marginLeft={16}>{`accountverify.quoctich`}</Label>
        <Dropdown
          marginTop={6}
          isActive={true}
          paddingHorizontal={16}
          multilanguage={true}
          content={`accountverify.quoctich`}
          url={`country/list`}
          value={nationality}
          onChange={a => setNationality(a)}
        />
        <Label marginTop={13} marginLeft={16}>{`accountverify.email`}</Label>
        <InputItem
          isInput={false}
          onChangeText={setEmail}
          value={email}
          marginHorizontal={16}
          marginTop={6}
        />

        <Label
          marginTop={13}
          marginLeft={16}>{`accountverify.sodienthoai`}</Label>

        <Div
          marginTop={6}
          paddingHorizontal={16}
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
              onSubmitEditing={() => {
                // focusNextInput(userRefCodeRef.current);
              }}
            />
          </Div>

          <Div marginLeft={20} flex={1}>
            <InputItem
              onChangeText={setPhone}
              isInput={false}
              value={phone}
              marginHorizontal={0}
            />
          </Div>
        </Div>

        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          paddingHorizontal={16}
          height={48}
          marginTop={38}
          backgroundColor={'rgba(73, 85, 163, 0.1)'}>
          <Label>{`accountverify.thongtincmnd`}</Label>
        </Div>
        <Label
          marginTop={28}
          marginLeft={16}>{`accountverify.loaigiayto`}</Label>
        <Dropdown
          marginTop={6}
          paddingHorizontal={16}
          isActive={true}
          initData={[
            {
              id: '5',
              name: 'Mã giao dịch chứng khoán',
              nameen: 'Mã giao dịch chứng khoán',
            },
            {id: '1', name: 'CMND/CCCD', nameen: 'CMND/CCCD'},
          ]}
          multilanguage={true}
          value={type}
          onChange={a => setType(a)}
          content={`accountverify.vuilongchonloaigiayto`}
        />
        <Label
          marginTop={13}
          marginLeft={16}>{`accountverify.sohieugiayto`}</Label>
        <InputItem
          value={idNo}
          onChangeText={setIdNo}
          isInput={true}
          marginHorizontal={16}
          marginTop={6}
        />
        <Label marginTop={13} marginLeft={16}>{`accountverify.ngaycap`}</Label>
        <Calendar
          initValue={reJoinObjectCalendar(
            convertTimestamp(currentUser.dateOfIssue),
          )}
          onChange={(e: any) => setDateOfIssue(e)}
        />

        <Label marginTop={13} marginLeft={16}>{`accountverify.noicap`}</Label>

        <InputItem
          value={placeOfIssue}
          onChangeText={setPlaceOfIssue}
          isInput={true}
          marginHorizontal={16}
          marginTop={6}
        />

        <Div
          paddingHorizontal={16}
          paddingTop={20}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Button
            overflow={'hidden'}
            borderRadius={5}
            width={162}
            onPress={() => {
              setLoadingPhotoBefore(true);
              onGetImage((a: any) => {
                setPhotoBefore((b: any) => {
                  return {
                    ...b,
                    ...a,
                  };
                });
                return;
              });
            }}
            height={103}>
            <ImageView
              borderRadius={5}
              width={162}
              height={103}
              source={{
                uri: photoBefore?.uri || photoBefore?.url,
              }}
            />
            <Div
              style={StyleSheet.absoluteFillObject}
              alignItems={'center'}
              justifyContent={'center'}
              flex={1}
              backgroundColor={Ecolors.transparentLoading}>
              {loadingPhotoBefore ? (
                <LoadingIndicator color={Ecolors.mainColor} />
              ) : (
                <ImageView
                  width={26}
                  height={24}
                  resizeMode={'contain'}
                  tintColor={Ecolors.whiteColor}
                  source={Icons.camera}
                />
              )}
            </Div>
          </Button>
          <Button
            overflow={'hidden'}
            borderRadius={5}
            width={162}
            onPress={() => {
              setLoadingPhotoAfter(true);
              onGetImage((a: any) => {
                setPhotoAfter((b: any) => {
                  return {
                    ...b,
                    ...a,
                  };
                });
                return;
              });
            }}
            height={103}>
            <ImageView
              borderRadius={5}
              width={162}
              height={103}
              source={{
                uri: photoAfter?.uri || photoAfter?.url,
              }}
            />
            <Div
              style={StyleSheet.absoluteFillObject}
              alignItems={'center'}
              justifyContent={'center'}
              flex={1}
              backgroundColor={Ecolors.transparentLoading}>
              {loadingPhotoAfter ? (
                <LoadingIndicator color={Ecolors.mainColor} />
              ) : (
                <ImageView
                  width={26}
                  height={24}
                  resizeMode={'contain'}
                  tintColor={Ecolors.whiteColor}
                  source={Icons.camera}
                />
              )}
            </Div>
          </Button>
        </Div>
        <Div height={340} />
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

export default React.memo(EditAccountInfoModal);
