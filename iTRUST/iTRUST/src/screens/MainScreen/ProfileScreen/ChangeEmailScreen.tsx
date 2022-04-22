import {
  ButtonBorder,
  Div,
  HeaderBack,
  InputItem,
  Alert,
  Label,
} from 'components';
import React, {useRef, useState} from 'react';
import {apiAuth, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {checkEmail, isvalidEmail} from 'utils';

function ChangeEmailScreen() {
  const [oldEmail, setOldEmail] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [reNewEmail, setReNewEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const [isErrorOldEmail, setIsErrorOldEmail] = useState<boolean>(false);
  const [isErrorNewEmail, setIsErrorNewEmail] = useState<boolean>(false);
  const [isErrorReNewEmail, setIsErrorReNewEmail] = useState<boolean>(false);

  const oldEmailRef = useRef<any>(null);
  const newEmailRef = useRef<any>(null);
  const reNewEmailRef = useRef<any>(null);

  const onChange = async () => {
    setIsErrorNewEmail(!isvalidEmail(newEmail));
    setIsErrorNewEmail(!isvalidEmail(reNewEmail));
    try {
      setLoading(true);
      if (
        checkEmail({
          oldEmail,
          newEmail,
          reNewEmail,
        })
      ) {
        const res = await apiAuth.changeEmailCreate({
          oldEmail,
          newEmail,
        });
        if (res.status == 200) {
          navigate('OtpRequestModal', {
            data: {
              requestOnSendOtp: res.data,
              flowApp: 'ChangeEmail',
            },
          });
        }
      } else {
        setIsErrorOldEmail(!isvalidEmail(oldEmail));
        setIsErrorNewEmail(!isvalidEmail(newEmail));
        setIsErrorReNewEmail(reNewEmail != newEmail);
        setTimeout(() => {
          if (!isvalidEmail(oldEmail)) {
            focusNextInput(oldEmailRef.current);
            return;
          }
          if (!isvalidEmail(newEmail)) {
            focusNextInput(newEmailRef.current);
            return;
          }
          if (reNewEmail != newEmail) {
            focusNextInput(reNewEmailRef.current);
            return;
          }
        }, 300);
      }
    } catch (error: any) {
      Alert.show({
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
        title={`profile.changeemail`}
        type={2}
        titleRight={`profile.save`}
        loading={loading}
        onRightPress={() => {
          onChange();
        }}
      />
      <Div paddingHorizontal={29}>
        <Label marginTop={16}>{`profile.oldemail`}</Label>
        <InputItem
          value={oldEmail}
          isError={isErrorOldEmail}
          inputRef={oldEmailRef}
          titleError={
            oldEmail.length
              ? `profile.emailsaidinhdang`
              : `profile.thongtinkhongduocdetrong`
          }
          onChangeText={(t: string) => {
            setOldEmail(t);
            if (isErrorOldEmail) {
              setIsErrorOldEmail(false);
            }
          }}
          marginHorizontal={0}
          marginTop={6}
          onSubmitEditing={() => {
            setIsErrorOldEmail(!isvalidEmail(oldEmail));
            if (newEmailRef.current) {
              newEmailRef.current.focus();
            }
          }}
          keyboardType={'email-address'}
        />
        <Label marginTop={16}>{`profile.newemail`}</Label>
        <InputItem
          value={newEmail}
          onChangeText={(t: string) => {
            setNewEmail(t);
            if (isErrorNewEmail) {
              setIsErrorNewEmail(false);
            }
          }}
          onSubmitEditing={() => {
            setIsErrorNewEmail(!isvalidEmail(newEmail));
            if (reNewEmailRef.current) {
              reNewEmailRef.current.focus();
            }
          }}
          isError={isErrorNewEmail}
          titleError={
            newEmail.length
              ? `profile.emailsaidinhdang`
              : `profile.thongtinkhongduocdetrong`
          }
          inputRef={newEmailRef}
          marginHorizontal={0}
          keyboardType={'email-address'}
          marginTop={6}
        />
        <Label marginTop={16}>{`profile.renewemail`}</Label>
        <InputItem
          value={reNewEmail}
          onChangeText={(t: string) => {
            setReNewEmail(t);
            if (isErrorReNewEmail) {
              setIsErrorReNewEmail(false);
            }
          }}
          inputRef={reNewEmailRef}
          marginHorizontal={0}
          isError={isErrorReNewEmail}
          titleError={
            reNewEmail.length
              ? `profile.emailsaidinhdang`
              : `profile.thongtinkhongduocdetrong`
          }
          keyboardType={'email-address'}
          marginTop={6}
          onSubmitEditing={() => {
            setIsErrorReNewEmail(!isvalidEmail(reNewEmail));
            onChange();
          }}
        />
      </Div>
    </Div>
  );
}

export default React.memo(ChangeEmailScreen);
