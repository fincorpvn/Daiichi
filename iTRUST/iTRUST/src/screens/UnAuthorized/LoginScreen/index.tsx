import {
  Alert,
  Button,
  ButtonBorder,
  Div,
  DropdownMultiLanguage,
  ImageView,
  InputItem,
  Label,
} from 'components';
import {Ecolors, Icons, stringApp} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from 'store/hooks';
import {
  checkLogin,
  getUuid,
  Log,
  parseMultilanguage,
  widthScale,
  widthScreen,
} from 'utils';
import {
  changeBiometryType,
  changeIsSupport,
  doLogin,
  saveName,
} from 'reducer/authen';
import {navigate} from 'services';
import {Platform, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import TouchID from 'react-native-touch-id';
import {getAccount, getStoreData} from 'utils/storage';
import {useDispatch} from 'react-redux';

function LoginScreen() {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const userNameSaveRedux = useAppSelector(state => state.authen.userName);
  const isBio = useAppSelector(state => state.authen.isBio);

  const activeLanguage = useAppSelector(
    state => state.languages.activeLanguage,
  );

  const isSupport = useAppSelector(state => state.authen.isSupport);
  const biometryType = useAppSelector(state => state.authen.biometryType);
  //

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useAppSelector(state => state.authen.isLoading);
  const [isSaveName, setIsSaveName] = useState<boolean>(false);
  //
  // const [biometryType, setBioMetryType] = useState<string>('');
  // const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isHaveAccount, setIsHaveAccount] = useState<boolean>(false);

  //
  const passwordRef = useRef<any>(null);

  const optionalConfigObject = {
    // title: 'Authentication Required', // Android
    imageColor: Ecolors.mainColor, // Android
    imageErrorColor: Ecolors.redColor, // Android
    sensorDescription: '', // Android
    fallbackLabel: '', // iOS (if empty, then label is hidden)
    unifiedErrors: true, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  useEffect(() => {
    if (userNameSaveRedux) {
      setUserName(userNameSaveRedux);
      setIsSaveName(true);
    }
    return () => {};
  }, [isFocus, userNameSaveRedux]);

  useEffect(() => {
    try {
      TouchID.isSupported()
        .then(res => {
          if (res === 'TouchID' || res === 'FaceID' || !!res) {
            // setBioMetryType(res);
            dispatch(changeBiometryType(res));
            dispatch(changeIsSupport(true));
          } else {
            dispatch(changeBiometryType(''));
            dispatch(changeIsSupport(false));
          }
        })
        .catch(err => {
          dispatch(changeBiometryType(''));
          dispatch(changeIsSupport(false));
        });
      return;
    } catch (error: any) {}
  }, []);

  useEffect(() => {
    if (isBio) {
      checkAccountStorage();
    }
    return () => {};
  }, [isBio]);

  const checkAccountStorage = async () => {
    try {
      const res = await getStoreData('isAccountTouchID');
      if (res) {
        setIsHaveAccount(true);
        if (isSupport && biometryType.length) {
          doLoginWithBiometry(biometryType);
        } else {
          checkBiometryType();
        }
        return;
      }
      setIsHaveAccount(false);
      return;
    } catch (error) {
      setIsHaveAccount(false);
      return;
    }
  };

  const checkBiometryType = () => {
    try {
      TouchID.isSupported()
        .then(res => {
          if (res === 'TouchID' || res === 'FaceID' || !!res) {
            // setBioMetryType(res);
            doLoginWithBiometry(biometryType);
            dispatch(changeBiometryType(res));
            dispatch(changeIsSupport(true));
          } else {
            dispatch(changeBiometryType(''));
            dispatch(changeIsSupport(false));
          }
        })
        .catch(err => {
          dispatch(changeBiometryType(''));
          dispatch(changeIsSupport(false));
        });
      return;
    } catch (error: any) {}
  };

  const doLoginWithBiometry = (res?: string | boolean) => {
    try {
      TouchID.authenticate(
        activeLanguage.code == 'vi'
          ? `Sử dụng Vân tay/Khuôn mặt để mở khoá ứng dụng ${stringApp.appName}`
          : `Use your Touch ID/Face ID to unlock ${stringApp.appName}`,
        {
          ...optionalConfigObject,
          title:
            activeLanguage.code == 'vi'
              ? `Đăng nhập ${stringApp.appName}`
              : `Login ${stringApp.appName}`,
          sensorErrorDescription:
            activeLanguage.code == 'vi' ? 'Thất bại' : 'False', // Android
          cancelText: activeLanguage.code == 'vi' ? 'Huỷ' : 'Cancel', // Android
        },
      )
        .then(async (result: any) => {
          if (result) {
            const account = await getAccount();
            if (account) {
              setUserName(account.username);
              setPassword(account.password);
              onLogin({
                name: account.username,
                pass: account.password,
              });
            }
          } else {
          }
        })
        .catch((err: any) => {});
      return;
    } catch (error: any) {}
  };

  const onLogin = async (p?: {name?: string; pass?: string}) => {
    //
    try {
      if (
        !checkLogin({
          name: p?.name || '',
          pass: p?.pass || '',
        })
      ) {
        return;
      }
      if (isSaveName || userNameSaveRedux) {
        dispatch(saveName(p?.name || username));
      } else {
        dispatch(saveName(''));
      }
      const obj: IParamsLogin = {
        username: p?.name || username,
        password: p?.pass || password,
      };
      const res: any = await dispatch(doLogin(obj));
      if (res.payload.status != 200) {
        Alert.showError({
          content:
            I18nState == 'vi' ? res.payload.message : res.payload.messageEn,
          multilanguage: false,
        });
      }
    } catch (error: any) {
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
      });
    } finally {
    }
    // navigate('ControlEKYCScreen');
    // return;
  };

  const gotoRegister = () => {
    navigate('RegisterScreen');
    return;
    // navigate('ReviewInfoModal', {
    //   data: {
    //     email: '1231232131 email',
    //     phone: '1232131',
    //     name: 'string',
    //   },
    // });
  };

  const gotoForgotPassword = () => {
    navigate('ForgotPasswordScreen');
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <ImageView
        source={Icons.fincorpbanner}
        style={{
          width: widthScreen,
          height: widthScale(250),
        }}
        resizeMode={'cover'}
      />
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={29}
        paddingTop={26}
        justifyContent={'space-between'}>
        <Label size={20} fontWeight="700">
          {`loginscreen.login`}
        </Label>
        <DropdownMultiLanguage />
      </Div>
      {/* login form  */}
      <Div marginTop={33} paddingHorizontal={29} flexDirection={'column'}>
        <Label size={16}>{`loginscreen.tendangnhap`}</Label>
        <InputItem
          marginTop={6}
          value={username}
          marginHorizontal={0}
          onSubmitEditing={() => {
            if (passwordRef.current) {
              passwordRef.current.focus();
            }
          }}
          onChangeText={setUserName}
          placeholder={parseMultilanguage(`loginscreen.accountplacehoder`)}
          keyboardType={'number-pad'}
        />
        <Label marginTop={13} size={16}>{`loginscreen.matkhau`}</Label>
        <InputItem
          inputRef={passwordRef}
          isShowAndHide={true}
          value={password}
          onChangeText={setPassword}
          marginTop={6}
          keyboardType={'ascii-capable'}
          marginHorizontal={0}
          placeholder={parseMultilanguage(`loginscreen.passwordplacehoder`)}
          // onSubmitEditing={() =>
          //   onLogin({
          //     name: username,
          //     pass: password,
          //   })
          // }
        />
        <Div
          paddingTop={15}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <Button
            flexDirection={'row'}
            alignItems={'center'}
            onPress={() => setIsSaveName(a => !a)}>
            {isSaveName ? (
              <ImageView
                source={Icons.check}
                tintColor={Ecolors.linkColor}
                widthHeight={20}
              />
            ) : (
              <Div
                widthHeight={20}
                borderColor={Ecolors.textColor}
                borderRadius={100}
                borderWidth={0.5}
              />
            )}
            <Label
              marginLeft={10}
              size={15}
              color={isSaveName ? Ecolors.linkColor : Ecolors.textColor}>
              {`loginscreen.saveusername`}
            </Label>
          </Button>
          <Button onPress={() => gotoForgotPassword()}>
            <Label size={15} color={Ecolors.linkColor}>
              {`loginscreen.forgotpass`}
            </Label>
          </Button>
        </Div>
      </Div>
      {/* login button  */}
      <Div
        paddingTop={23}
        paddingHorizontal={29}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <ButtonBorder
          width={isSupport ? 252 : 317}
          loading={isLoading}
          title={`loginscreen.login`}
          onPress={() => {
            onLogin({
              name: username,
              pass: password,
            });
          }}
        />
        {isSupport && (
          <Button
            heightWidth={48}
            borderWidth={0.5}
            borderColor={Ecolors.bordercolor}
            borderRadius={5}
            alignItems={'center'}
            justifyContent={'center'}
            onPress={() => {
              if (!isHaveAccount || !isBio) {
                Alert.showError({
                  content: `alert.dangnhapvantaythatbai`,
                });
                return;
              }
              doLoginWithBiometry();
            }}>
            <ImageView
              source={biometryType == 'FaceID' ? Icons.faceid : Icons.finger}
              widthHeight={27}
              resizeMode={'contain'}
            />
          </Button>
        )}
      </Div>
      {/* goto register screens */}
      <Div
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        paddingTop={60}
        paddingBottom={70}>
        <Button
          onPress={() => {
            navigate('ActiveAccountModal');
          }}>
          <Label
            color={Ecolors.linkColor}>{`loginscreen.kichhoattaikhoan`}</Label>
        </Button>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          width={'100%'}
          justifyContent={'center'}
          flexWrap={'wrap'}>
          <Label marginTop={11}>{`loginscreen.signuptitle`}</Label>
          <Button onPress={() => gotoRegister()}>
            <Label
              fontWeight={'700'}
              color={Ecolors.linkColor}>{`loginscreen.signup`}</Label>
          </Button>
        </Div>
        <Div height={100} />
      </Div>
    </ScrollView>
  );
}

export default React.memo(LoginScreen);
