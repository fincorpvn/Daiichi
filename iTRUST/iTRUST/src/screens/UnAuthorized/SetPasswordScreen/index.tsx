import {useRoute} from '@react-navigation/core';
import {
  Button,
  ButtonBorder,
  Div,
  HeaderBack,
  ImageView,
  InputItem,
  Alert,
  Label,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {apiAuth, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {
  checkCreatePassword,
  isValidPassword,
  Log,
  parseMultilanguage,
} from 'utils';

interface ILblProps {
  content?: string;
}

interface Iparams {
  data: {
    name?: string;
    email?: string;
    phone?: string;
    userRefCode?: string;
    phonePostal?: string;
    username?: string;
    flowApp?: string;
    otpTransId?: string;
    province?: any;
  };
}
function Rule(p: {content: string}) {
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      marginTop={5}
      justifyContent={'flex-start'}>
      <Div
        widthHeight={10}
        borderRadius={10}
        backgroundColor={Ecolors.mainColor}
        marginRight={10}
      />
      <Label size={13}>{p.content}</Label>
    </Div>
  );
}

function SetPasswordScreen() {
  const route = useRoute<any>();
  const params: Required<Iparams> = route.params;

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] =
    useState<boolean>(false);

  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  const gotoRequestOtp = async () => {
    const {name, phone, phonePostal, email, userRefCode, province} =
      params.data;
    try {
      setLoading(true);
      if (
        checkCreatePassword({
          password,
          confirmPassword,
        })
      ) {
        const res = await apiAuth.signupOtp({
          name,
          phone,
          email,
          phonePostal,
          password,
          confirmPassword,
          userRefCode,
          username: phone,
          provinceId: province.id,
        });
        if (res.status == 200) {
          navigate('OtpRequestModal', {
            data: {
              ...params.data,
              password,
              confirmPassword,
              requestOnSendOtp: res.data,
              title: `setpasswordscreen.xacthuctaikhoan`,
            },
            onConfirm: () => {
              // onNext && onNext();
              navigate('ControlEKYCScreen', {
                data: {phone, password, email, name},
              });
            },
          });
          return;
        }
        Alert.showError({
          multilanguage: false,
          content: I18nState == 'vi' ? res.message : res.messageEn,
        });
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    } finally {
      setLoading(false);
    }
  };

  const onConfirmSetPassword = async () => {
    try {
      if (
        checkCreatePassword({
          password,
          confirmPassword,
        })
      ) {
        setLoading(true);
        const res = await apiAuth.resetPassword({
          password,
          confirmPassword,
          otpTransId: params.data.otpTransId || '',
        });
        if (res.status == 200) {
          Alert.show({
            content: `alert.doimatkhauthanhcong`,
            type: 2,
            titleClose: 'alert.dong',
            onConfirm: async () => {
              navigate('LoginScreen');
            },
            onClose: async () => {
              navigate('LoginScreen');
            },
            onCancel: async () => {
              navigate('LoginScreen');
            },
          });
          return;
        }
        Alert.showError({
          multilanguage: false,
          content: I18nState == 'vi' ? res.message : res.messageEn,
        });
      } else {
        setIsErrorPassword(!isValidPassword(password));
        setIsErrorConfirmPassword(password != confirmPassword);
        if (!isValidPassword(password)) {
          focusNextInput(passRef.current);
          return;
        }
        if (password != confirmPassword) {
          focusNextInput(confirmPassRef.current);
          return;
        }
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    } finally {
      setLoading(false);
    }
  };

  const focusNextInput = (prefix: any) => {
    if (prefix) {
      prefix?.focus();
    }
  };

  return (
    <Div useKeyboard={true} screen={true}>
      <HeaderBack
        isShowStep={true}
        step={2}
        type={4}
        title={`setpasswordscreen.titletrong`}
      />

      <Div paddingHorizontal={29}>
        <Div width={'100%'} alignItems={'center'}>
          <Label
            size={20}
            fontWeight={'700'}>{`setpasswordscreen.taomatkhau`}</Label>
          <Label
            marginTop={3}
            size={14}>{`setpasswordscreen.baomatthongtincanhan`}</Label>
        </Div>
        <Label marginTop={29}>{`setpasswordscreen.tendangnhap`}</Label>
        <InputItem
          marginTop={6}
          marginHorizontal={0}
          isInput={false}
          value={params.data.username || params.data.phone || ''}
        />
        <Label marginTop={13}>{`setpasswordscreen.matkhau`}</Label>
        <InputItem
          inputRef={passRef}
          placeholder={parseMultilanguage(
            `setpasswordscreen.vuilongnhapmatkhau`,
          )}
          isError={isErrorPassword}
          keyboardType={'ascii-capable'}
          titleError={
            password.length
              ? `setpasswordscreen.saidinhdangmatkhau`
              : `setpasswordscreen.thongtinkhongduocdetrong`
          }
          marginTop={6}
          marginHorizontal={0}
          value={password}
          onChangeText={(t: string) => {
            setPassword(t);
            if (isErrorPassword) {
              setIsErrorPassword(false);
            }
          }}
          isShowAndHide={true}
          onSubmitEditing={() => {
            focusNextInput(confirmPassRef.current);
            setIsErrorPassword(!isValidPassword(password));
          }}
        />
        <Label marginTop={13}>{`setpasswordscreen.nhaplaimatkhau`}</Label>
        <InputItem
          inputRef={confirmPassRef}
          placeholder={parseMultilanguage(
            `setpasswordscreen.vuilongnhaplaimatkhau`,
          )}
          titleError={`setpasswordscreen.xacnhanmatkhaukhongdung`}
          isError={isErrorConfirmPassword}
          marginHorizontal={0}
          keyboardType={'ascii-capable'}
          marginTop={6}
          value={confirmPassword}
          onChangeText={(t: string) => {
            setConfirmPassword(t);
            if (isErrorConfirmPassword) {
              setIsErrorConfirmPassword(false);
            }
          }}
          isShowAndHide={true}
          onSubmitEditing={() => {
            setIsErrorPassword(!isValidPassword(password));
            setIsErrorConfirmPassword(password != confirmPassword);
            if (params.data.flowApp == 'ForgotPassword') {
              onConfirmSetPassword();
              return;
            }
            gotoRequestOtp();
          }}
        />

        <Label
          marginTop={21}
          fontWeight={'700'}>{`setpasswordscreen.matkhaubaogom`}</Label>
        <Rule content={`setpasswordscreen.rule1`} />
        <Rule content={`setpasswordscreen.rule2`} />
        <Rule content={`setpasswordscreen.rule3`} />

        <Button
          width={'100%'}
          marginTop={29}
          backgroundColor={Ecolors.mainColor}
          borderRadius={5}
          height={48}
          flexDirection={'row'}
          alignItems={'center'}
          onPress={() => {
            if (loading) {
              return;
            }
            setIsErrorPassword(!isValidPassword(password));
            setIsErrorConfirmPassword(password != confirmPassword);
            if (params.data.flowApp == 'ForgotPassword') {
              onConfirmSetPassword();
              return;
            }
            gotoRequestOtp();
          }}
          justifyContent={'center'}>
          <Label
            color={Ecolors.whiteColor}>{`setpasswordscreen.tieptuc`}</Label>
          <ImageView
            width={22}
            height={11}
            resizeMode={'contain'}
            source={Icons.forwardregister}
            marginLeft={10}
          />
          {loading && (
            <Div
              backgroundColor={Ecolors.transparentLoading}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              position={'absolute'}
              zIndex={999}
              elevation={999}
              style={StyleSheet.absoluteFillObject}>
              <ActivityIndicator size={'small'} color={Ecolors.whiteColor} />
            </Div>
          )}
        </Button>
      </Div>
    </Div>
  );
}

export default React.memo(SetPasswordScreen);
