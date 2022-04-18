import {useIsFocused, useRoute} from '@react-navigation/core';
import {Button, ButtonBorder, Div, HeaderBack, Alert, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {changeBio, changeStatusScreen, getInfo} from 'reducer/authen';
import {apiAuth} from 'services';
import {apiInvestment} from 'services/apis/apiInvestment';
import {goBack, navigate} from 'services/navigation';
import {useAppSelector} from 'store/hooks';
import {hidePhoneNumberOTP} from 'utils';
import {resetAccount} from 'utils/storage';
import OtpComp from './OtpComp';

interface Iparams {
  data?: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    userRefCode?: string;
    confirmPassword?: string;
    phonePostal?: string;
    flowApp?: string;
    username?: string;
    requestOnSendOtp?: any;
    title?: any;
  };
  onConfirm?: () => void;
}

interface IRequest {
  expiredDurationInMinutes?: number;
  expiredTime?: number;
  otpTransId?: string;
  time?: number;
  transId?: string;
  otp?: string;
}

interface IOtpRefHandle {
  start: () => void;
}

function OtpRequestModal() {
  const route = useRoute<any>();
  const params: Required<Iparams> = route.params;
  const isFocused = useIsFocused();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);

  const otpCompRef = useRef<IOtpRefHandle>(null);
  const [requestOnSendOtp, setRequestOnSendOtp] = useState<IRequest>({});
  const [otp, setOtp] = useState<string>('');
  const [isInTime, setIsIntime] = useState<boolean>(true);
  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);
  const [loadingResend, setLoadingResend] = useState<boolean>(false);

  // action
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.data.requestOnSendOtp) {
      setRequestOnSendOtp(params.data.requestOnSendOtp);
    }
    return () => {};
  }, [params.data.requestOnSendOtp]);

  useEffect(() => {
    setOtp('');
    return () => {};
  }, [isFocused]);

  useEffect(() => {
    if (otp?.length == 6) {
      onPressBtnConfirm();
    }
  }, [otp]);

  const onResendOtp = async () => {
    try {
      setLoadingResend(true);
      const res = await apiAuth.resendOtp(requestOnSendOtp);
      if (res.status == 200) {
        setRequestOnSendOtp(res.data.otpInfo);
        if (otpCompRef.current) {
          otpCompRef.current.start();
        }
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    } finally {
      setLoadingResend(false);
    }
  };

  const onPressBtnConfirm = () => {
    if (isInTime && !loadingConfirm) {
      if (params.data.flowApp == 'ForgotPassword') {
        onForgetPassConfirm();
        return;
      }
      if (params.data.flowApp == 'ChangePassword') {
        onChangePasswordConfirm();
        return;
      }
      if (params.data.flowApp == 'ChangeEmail') {
        onChangeEmailConfirm();
        return;
      }
      if (params.data.flowApp == 'changepermanentaddress') {
        onChangePermanentAddressConfirm();
        return;
      }
      if (params.data.flowApp == 'mailingAddress') {
        onChangeMailingAddressConfirm();
        return;
      }
      if (params.data.flowApp == 'CreateOrderBuy') {
        onConfirmCreateOrderBuy();
        return;
      }
      if (params.data.flowApp == 'CreateOrderSell') {
        onConfirmCreateOrderSell();
        return;
      }
      if (params.data.flowApp == 'CreateOrderTransfer') {
        onConfirmCreateOrderTransfer();
        return;
      }
      onConfirm();
      return;
    }
  };

  const onConfirm = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiAuth.confirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        goBack();
        setTimeout(() => {
          if (params.onConfirm) {
            params.onConfirm();
          }
        }, 150);
        return;
      } else {
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
      // show error
    } finally {
      setLoadingConfirm(false);
    }
  };

  const onForgetPassConfirm = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiAuth.forgotPassConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        navigate('SetPasswordScreen', {
          data: {
            username: params.data.username,
            otpTransId: requestOnSendOtp.otpTransId,
            flowApp: params.data.flowApp,
          },
        });
      } else {
        Alert.showError({
          multilanguage: false,
          content: I18nState == 'vi' ? res.message : res.messageEn,
          onPress: () => {
            onResendOtp();
          },
        });
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
      // show error
    } finally {
      setLoadingConfirm(false);
    }
  };

  const onChangePasswordConfirm = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiAuth.changePasswordConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        dispatch(changeBio(false));
        Alert.show({
          content: `alert.doimatkhauthanhcong`,
          type: 2,
          titleClose: 'alert.dong',
          onConfirm: async () => {
            goBack();
            setTimeout(() => {
              dispatch(changeStatusScreen('unAuthorized'));
            }, 200);
          },
          onClose: async () => {
            goBack();
            setTimeout(() => {
              dispatch(changeStatusScreen('unAuthorized'));
            }, 200);
          },
          onCancel: async () => {
            goBack();
            setTimeout(() => {
              dispatch(changeStatusScreen('unAuthorized'));
            }, 200);
          },
        });
      } else {
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
      setLoadingConfirm(false);
    }
  };

  const onChangeEmailConfirm = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiAuth.changeEmailConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        Alert.show({
          type: 2,
          titleClose: 'alert.dong',
          content: `alert.doiemailthanhcong`,
          onConfirm: () => {
            navigate('ProfileScreen');
          },
          onClose: () => {
            navigate('ProfileScreen');
          },
          onCancel: () => {
            navigate('ProfileScreen');
          },
        });
        // navigate('ProfileScreen');
        dispatch(getInfo({}));
        return;
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    } finally {
      setLoadingConfirm(false);
    }
  };

  const onChangePermanentAddressConfirm = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiAuth.changePermanentAddressConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        // Alert.show({
        //   multilanguage: false,
        //   content: res.message,
        //   onConfirm: () => {
        //     navigate('ProfileScreen');
        //   },
        // });
        navigate('ProfileScreen');
        dispatch(getInfo({}));
        return;
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    } finally {
      setLoadingConfirm(false);
    }
  };

  const onChangeMailingAddressConfirm = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiAuth.changeMailingAddressConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        // Alert.show({
        //   multilanguage: false,
        //   content: res.message,
        //   onConfirm: () => {
        //     navigate('ProfileScreen');
        //   },
        //   onCancel: () => {
        //     navigate('ProfileScreen');
        //   },
        // });
        navigate('ProfileScreen');
        dispatch(getInfo({}));
        return;
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    } finally {
      setLoadingConfirm(false);
    }
  };

  const onConfirmCreateOrderBuy = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiInvestment.buyConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        if (params.onConfirm) {
          params.onConfirm();
        }
        goBack();
        return;
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
      return;
    } finally {
      setLoadingConfirm(false);
    }
  };
  const onConfirmCreateOrderSell = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiInvestment.sellConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        if (params.onConfirm) {
          params.onConfirm();
        }
        goBack();
        return;
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
      return;
    } finally {
      setLoadingConfirm(false);
    }
  };
  const onConfirmCreateOrderTransfer = async () => {
    try {
      setLoadingConfirm(true);
      const res = await apiInvestment.transferConfirm({
        ...requestOnSendOtp,
        otp,
      });
      if (res.status == 200) {
        if (params.onConfirm) {
          params.onConfirm();
        }
        goBack();
        return;
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
      return;
    } finally {
      setLoadingConfirm(false);
    }
  };

  return (
    <Div
      height={'100%'}
      useKeyboard={true}
      backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        type={2}
        title={params?.data?.title || `otprequestmodal.confirminformation`}
      />
      <Div paddingTop={28} paddingHorizontal={50}>
        {/* content noti otp */}
        <Label multilanguage={false} textAlign={'center'}>
          <Label
            marginTop={10}
            size={15}
            textAlign={'center'}
            color={Ecolors.textColor}>
            {`otprequestmodal.content`}
          </Label>
          <Label
            marginTop={10}
            size={15}
            textAlign={'center'}
            multilanguage={false}
            color={Ecolors.textColor}>
            {` ${hidePhoneNumberOTP(
              params.data.phone ||
                params.data.phone ||
                currentUser?.phone ||
                '',
            )}`}
          </Label>
        </Label>
      </Div>
      {/* otp input */}
      <OtpComp
        ref={otpCompRef}
        maxTime={(requestOnSendOtp?.expiredDurationInMinutes || 0) * 60}
        otp={otp}
        setOtp={setOtp}
        isInTime={isInTime}
        setIsInTime={setIsIntime}
      />
      <Div
        flexDirection={'row'}
        width={'100%'}
        alignItems={'center'}
        marginTop={30}
        justifyContent={'center'}>
        <ButtonBorder
          width={317}
          loading={loadingConfirm}
          onPress={() => onPressBtnConfirm()}
          type={isInTime ? 1 : 2}
          title={`otprequestmodal.confirm`}
        />
      </Div>
      <Div
        flexDirection={'row'}
        width={'100%'}
        alignItems={'center'}
        marginTop={10}
        justifyContent={'center'}>
        <Button
          onPress={() => {
            if (!isInTime && !loadingResend) {
              onResendOtp();
            }
          }}
          width={317}
          height={48}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={5}
          overflow={'hidden'}>
          {loadingResend && (
            <Div
              style={StyleSheet.absoluteFillObject}
              alignItems={'center'}
              justifyContent={'center'}
              backgroundColor={Ecolors.transparentLoading}>
              <ActivityIndicator size={'small'} color={Ecolors.mainColor} />
            </Div>
          )}
          <Label
            fontWeight={'500'}
            color={Ecolors.linkColor}>{`otprequestmodal.resendotp`}</Label>
        </Button>
      </Div>
    </Div>
  );
}

export default React.memo(OtpRequestModal);