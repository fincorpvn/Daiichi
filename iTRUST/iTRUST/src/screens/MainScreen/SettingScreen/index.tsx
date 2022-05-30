import {Alert, Button, Div, HeaderBack, ImageView, Label} from 'components';
import {Ecolors, Icons, stringApp} from 'constant';
import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native-switch';
import TouchID from 'react-native-touch-id';
import {useDispatch} from 'react-redux';
import {changeBio, changeNoti} from 'reducer/authen';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';

const optionalConfigObject = {
  // title: 'Authentication Required', // Android
  imageColor: Ecolors.mainColor, // Android
  imageErrorColor: Ecolors.redColor, // Android
  sensorDescription: '', // Android
  fallbackLabel: '', // iOS (if empty, then label is hidden)
  unifiedErrors: true, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

function RowItem(p: {
  title: string;
  icon?: any;
  isActive?: boolean;
  onPress?: () => void;
}) {
  return (
    <>
      <Button
        onPress={() => p.onPress && p.onPress()}
        width={'100%'}
        height={50}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingLeft={16}
        paddingRight={20}>
        <Label>{p.title}</Label>
        {p.icon ? (
          <ImageView
            source={p.icon}
            width={8}
            height={14}
            resizeMode={'contain'}
          />
        ) : (
          <Div
            backgroundColor={
              p.isActive ? Ecolors.mainColor : Ecolors.spaceColor
            }
            borderRadius={50}
            paddingHorizontal={3}
            paddingVertical={2}>
            <Switch
              activeText={''}
              inActiveText={''}
              onValueChange={r => {
                p.onPress && p.onPress();
              }}
              value={p.isActive}
              circleSize={24}
              circleActiveColor={Ecolors.whiteColor}
              circleInActiveColor={Ecolors.whiteColor}
              circleBorderWidth={0}
              backgroundInactive={Ecolors.spaceColor}
              backgroundActive={Ecolors.mainColor}
            />
          </Div>
        )}
      </Button>
      <Div width={'100%'} height={1} backgroundColor={Ecolors.spaceColor} />
    </>
  );
}

function SettingScreen() {
  const dispatch = useDispatch();
  const isBio = useAppSelector(state => state.authen.isBio);
  const isNoti = useAppSelector(state => state.authen.isNoti);
  const isSupport = useAppSelector(state => state.authen.isSupport);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const checkBio = () => {
    try {
      TouchID.authenticate(
        I18nState == 'vi'
          ? `Kích hoạt vân tay/khuôn mặt để đăng nhập ứng dụng`
          : 'Enable your Touch ID/Face ID for app login',
        {
          ...optionalConfigObject,
          title:
            I18nState == 'vi'
              ? `Vân tay/Khuôn mặt cho ${stringApp.appName}`
              : `Touch ID/Face ID for ${stringApp.appName}`,
          sensorErrorDescription: I18nState == 'vi' ? 'Thất bại' : 'False', // Android
          cancelText: I18nState == 'vi' ? 'Huỷ' : 'Cancel', // Android
        },
      )
        .then(async (result: any) => {
          if (result) {
            navigate('ActiveBiometricModal');
          } else {
          }
        })
        .catch((err: any) => {});
      return;
    } catch (error: any) {}
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={2} title={`settingscreen.caidatvabaomat`} />
      {/* <RowItem
        onPress={() => {
          //   change language
          navigate('SettingLanguageModal');
        }}
        title={`settingscreen.ngonngu`}
        icon={Icons.forward}
      /> */}
      {/* <RowItem
        onPress={() => {
          // setIsActiveNoti(a => !a);
          // handleNotification();
          dispatch(changeNoti(!isNoti));
        }}
        title={`settingscreen.nhanthongbao`}
        isActive={isNoti}
      /> */}
      {isSupport && (
        <RowItem
          onPress={() => {
            if (isBio) {
              Alert.show({
                content: `settingscreen.xacnhanhuykichhoat`,
                onConfirm: () => {
                  dispatch(changeBio(false));
                },
              });
              return;
            } else {
              checkBio();
            }
          }}
          title={`settingscreen.faceid`}
          isActive={isBio}
        />
      )}
    </Div>
  );
}

export default React.memo(SettingScreen);
