import {
  ButtonBorder,
  Div,
  HeaderBack,
  InputItem,
  Label,
  Alert,
} from 'components';
import {Ecolors} from 'constant';
import React, {useRef, useState} from 'react';
import {apiAuth, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {checkPassword, isValidPassword} from 'utils';
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
function ChangePasswordScreen() {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [reNewPassword, setReNewPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [isErrorOldPassword, setIsErrorOdlPassword] = useState<boolean>(false);
  const [isErrorNewPassword, setIsErrorNewPassword] = useState<boolean>(false);
  const [isErroReNewPassword, setIsErrorReNewPassword] =
    useState<boolean>(false);

  const oldPasswordRef = useRef<any>(null);
  const newPasswordRef = useRef<any>(null);
  const reNewPasswordRef = useRef<any>(null);

  const onChange = async () => {
    try {
      setLoading(true);
      if (
        checkPassword({
          oldPassword,
          newPassword,
          reNewPassword,
        })
      ) {
        const res = await apiAuth.changePasswordCreate({
          oldPassword,
          newPassword,
        });
        if (res.status == 200) {
          navigate('OtpRequestModal', {
            data: {
              requestOnSendOtp: res.data,
              flowApp: 'ChangePassword',
            },
          });
        } else {
          Alert.showError({
            multilanguage: false,
            content: I18nState == 'vi' ? res.message : res.messageEn,
          });
        }
      } else {
        setIsErrorOdlPassword(!oldPassword.length);
        setIsErrorNewPassword(!isValidPassword(newPassword));
        setIsErrorReNewPassword(newPassword != reNewPassword);
        setTimeout(() => {
          if (!isValidPassword(oldPassword)) {
            focusNextInput(oldPasswordRef.current);
            return;
          }
          if (!isValidPassword(newPassword)) {
            focusNextInput(newPasswordRef.current);
            return;
          }
          if (reNewPassword != newPassword) {
            focusNextInput(reNewPasswordRef.current);
            return;
          }
        }, 300);
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
    <Div screen={true} useKeyboard={true}>
      <HeaderBack
        type={2}
        title={`profile.changepassword`}
        titleRight={'profile.save'}
        loading={loading}
        onRightPress={() => {
          onChange();
        }}
      />
      <Div paddingHorizontal={29}>
        <Label marginTop={16}>{`profile.oldpassword`}</Label>
        <InputItem
          inputRef={oldPasswordRef}
          isShowAndHide={true}
          value={oldPassword}
          titleError={`profile.thongtinkhongduocdetrong`}
          isError={isErrorOldPassword}
          onChangeText={(t: string) => {
            setOldPassword(t);
            if (isErrorOldPassword) {
              setIsErrorOdlPassword(false);
            }
          }}
          marginHorizontal={0}
          marginTop={6}
          onSubmitEditing={() => {
            setIsErrorOdlPassword(!oldPassword.length);
            if (newPasswordRef.current) {
              newPasswordRef.current.focus();
            }
          }}
        />
        <Label marginTop={16}>{`profile.newpassword`}</Label>
        <InputItem
          isShowAndHide={true}
          value={newPassword}
          inputRef={newPasswordRef}
          onChangeText={(t: string) => {
            setNewPassword(t);
            if (isErrorNewPassword) {
              setIsErrorNewPassword(false);
            }
          }}
          isError={isErrorNewPassword}
          titleError={
            newPassword.length
              ? `profile.saidinhdangmatkhau`
              : `profile.thongtinkhongduocdetrong`
          }
          marginHorizontal={0}
          onSubmitEditing={() => {
            setIsErrorNewPassword(!isValidPassword(newPassword));
            if (reNewPasswordRef.current) {
              reNewPasswordRef.current.focus();
            }
          }}
          marginTop={6}
        />
        <Label marginTop={16}>{`profile.renewpassword`}</Label>
        <InputItem
          isShowAndHide={true}
          value={reNewPassword}
          inputRef={reNewPasswordRef}
          onChangeText={(t: string) => {
            setReNewPassword(t);
            if (isErroReNewPassword) {
              setIsErrorReNewPassword(false);
            }
          }}
          isError={isErroReNewPassword}
          titleError={`profile.xacnhanmatkhaukhongdung`}
          marginHorizontal={0}
          marginTop={6}
          onSubmitEditing={() => {
            setIsErrorReNewPassword(!isValidPassword(reNewPassword));
            onChange();
          }}
        />
        <Label
          marginTop={21}
          fontWeight={'700'}>{`setpasswordscreen.matkhaubaogom`}</Label>
        <Rule content={`setpasswordscreen.rule1`} />
        <Rule content={`setpasswordscreen.rule2`} />
        <Rule content={`setpasswordscreen.rule3`} />
      </Div>
    </Div>
  );
}

export default React.memo(ChangePasswordScreen);
