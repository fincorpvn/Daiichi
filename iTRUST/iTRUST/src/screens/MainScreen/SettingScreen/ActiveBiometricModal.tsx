import {Alert, ButtonBorder, Div, InputItem, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeBio} from 'reducer/authen';
import {apiAuth, goBack} from 'services';
import {useAppSelector} from 'store/hooks';
import {Log, parseMultilanguage} from 'utils';

function ActiveBiometricModal() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {phone, username} = currentUser;
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const dispatch = useDispatch();
  const onAccept = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const res = await apiAuth.login({
        username: username,
        password,
      });
      if (res.status == 200) {
        dispatch(changeBio(true));
        Alert.show({
          content: `settingscreen.kichhoatthanhcong`,
          type: 2,
          onClose: () => {
            goBack();
          },
        });
      } else {
        Alert.showError({
          content: `settingscreen.matkhaucuaquykhachkhongdung`,
        });
      }
    } catch (error: any) {
      Alert.showError({
        content: `settingscreen.matkhaucuaquykhachkhongdung`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div
      useKeyboard={true}
      height={'100%'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Div
        width={337}
        borderRadius={5}
        style={EStyle.shadow}
        backgroundColor={Ecolors.whiteColor}
        minHeight={193}>
        <Div alignItems={'center'} justifyContent={'center'}>
          <Label
            marginTop={20}
            fontWeight={'700'}>{`settingscreen.thongbao`}</Label>
          <Label
            size={14}
            textAlign={'center'}
            marginHorizontal={20}
            marginTop={20}>{`settingscreen.content`}</Label>
        </Div>
        <InputItem
          value={password}
          onChangeText={setPassword}
          isShowAndHide={true}
          onSubmitEditing={() => {
            onAccept();
          }}
          keyboardType={'ascii-capable'}
          placeholder={parseMultilanguage(`loginscreen.passwordplacehoder`)}
          marginHorizontal={10}
          marginTop={10}
        />
        <Div
          flexDirection={'row'}
          marginVertical={20}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingHorizontal={10}>
          <ButtonBorder
            onPress={() => {
              goBack();
            }}
            width={148}
            height={48}
            title={`settingscreen.huy`}
            type={2}
          />
          <ButtonBorder
            onPress={() => {
              onAccept();
            }}
            width={148}
            loading={loading}
            height={48}
            title={`settingscreen.xacnhan`}
            type={1}
          />
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(ActiveBiometricModal);
