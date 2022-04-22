import {Alert, ButtonBorder, Div, InputItem, Label} from 'components';
import HeaderBack from 'components/HeaderBack';
import {Ecolors} from 'constant';
import React, {useState} from 'react';
import {apiAuth} from 'services';
import {navigate} from 'services/navigation';
import {useAppSelector} from 'store/hooks';
import {parseMultilanguage} from 'utils';

function ForgotPasswordScreen() {
  const [username, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const gotoRequestOtp = async () => {
    try {
      setLoading(true);
      const res = await apiAuth.forgotPassSendOtp({
        username,
      });
      if (res.status == 200) {
        navigate('OtpRequestModal', {
          data: {
            username,
            flowApp: 'ForgotPassword',
            requestOnSendOtp: res.data,
          },
        });
      }
    } catch (error: any) {
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
      });
    } finally {
      setLoading(false);
    }

    return;
  };

  return (
    <Div useKeyboard={true} screen={true}>
      <HeaderBack type={4} title={`forgotpasswordscreen.forgotpassword`} />
      <Div paddingHorizontal={29}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          padding={10}>
          <Label size={15} textAlign={'center'} color={Ecolors.gray}>
            {`forgotpasswordscreen.content`}
          </Label>
        </Div>
        <InputItem
          placeholder={parseMultilanguage('forgotpasswordscreen.tendangnhap')}
          value={username}
          onChangeText={setUserName}
          marginHorizontal={0}
          onSubmitEditing={() => {
            gotoRequestOtp();
          }}
          marginTop={6}
        />
        <Div
          flexDirection={'row'}
          width={'100%'}
          alignItems={'center'}
          marginTop={13}
          justifyContent={'center'}>
          <ButtonBorder
            loading={loading}
            title={`forgotpasswordscreen.continue`}
            onPress={gotoRequestOtp}
          />
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(ForgotPasswordScreen);
