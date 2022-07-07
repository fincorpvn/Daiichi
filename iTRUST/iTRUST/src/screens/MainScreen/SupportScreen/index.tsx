import {Alert, Button, Div, HeaderBack, Label} from 'components';
import {Ecolors, stringApp} from 'constant';
import React, {useEffect, useRef} from 'react';
import {Linking} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {callPhone, heightScreen, Log, widthScreen} from 'utils';

const Row = (p: {
  title: string;
  content: string;
  onPress: () => void;
  contentColor?: any;
}) => {
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={54}
      borderBottomWidth={1}
      borderBottomColor={Ecolors.spaceColor}
      paddingHorizontal={16}>
      <Label>{p.title}</Label>
      <Button onPress={() => p.onPress()}>
        <Label
          color={p.contentColor || Ecolors.linkColor}
          multilanguage={false}>
          {p.content}
        </Label>
      </Button>
    </Div>
  );
};

function SupportScreen() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {userSourceRef} = currentUser;
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const webviewRef = useRef<any>();

  //   const runFirst = `
  //   document.body.style.backgroundColor = 'red';
  //   setTimeout(function() { window.alert('hi') }, 2000);
  //   true; // note: this is required, or you'll sometimes get silent failures
  // `;
  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack title={`supportscreen.hotrokhachhang`} type={2} />
      {/* <Div
        height={54}
        backgroundColor={Ecolors.spaceColor}
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={16}
        justifyContent={'flex-start'}>
        <Label
          fontWeight={'700'}>{`supportscreen.trungtamchamsockhachhang`}</Label>
      </Div> */}
      <Row
        onPress={() => {
          Alert.show({
            content:
              I18nState == 'vi'
                ? `Gọi ${stringApp.phonesupport}`
                : `Call ${stringApp.phonesupport}`,
            multilanguage: false,
            onConfirm: () => {
              callPhone(stringApp.phonesupport);
            },
          });
        }}
        title={`supportscreen.cskh`}
        content={stringApp.phonesupport}
      />
      <Row
        onPress={() => {
          Linking.openURL(stringApp.emailsupport);
        }}
        title={`supportscreen.email`}
        content={stringApp.emailsupport}
      />
      {/* <Row
        onPress={() => {
          Linking.openURL('https://www.facebook.com/vinacapitalwm/');
        }}
        title={`supportscreen.facebook`}
        content={'fb.com/vinacapitalwm/'}
      /> */}
      {/* <Div
        height={54}
        backgroundColor={Ecolors.spaceColor}
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={16}
        justifyContent={'flex-start'}>
        <Label fontWeight={'700'}>{`supportscreen.chuyenvientrogiup`}</Label>
      </Div>
      <Row
        onPress={() => {}}
        title={`supportscreen.hoten`}
        content={userSourceRef?.bdaName || ''}
        contentColor={Ecolors.textColor}
      />
      <Row
        onPress={() => {
          Linking.openURL(`mailto:${userSourceRef?.bdaEmail}`);
        }}
        title={`supportscreen.email`}
        content={userSourceRef?.bdaEmail || ''}
      /> */}
    </Div>
  );
}

export default React.memo(SupportScreen);
