import {Alert, Button, Div, HeaderBack, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {Linking} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {callPhone} from 'utils';

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
  const I18nState = useAppSelector(state => state.languages.I18nState);

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack title={`supportscreen.hotrokhachhang`} type={2} />
      <Div
        height={54}
        backgroundColor={Ecolors.spaceColor}
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={16}
        justifyContent={'flex-start'}>
        <Label
          fontWeight={'700'}>{`supportscreen.trungtamchamsockhachhang`}</Label>
      </Div>
      <Row
        onPress={() => {
          Alert.show({
            content: I18nState == 'vi' ? `Gọi 1900636553` : `Call 1900636553`,
            multilanguage: false,
            onConfirm: () => {
              callPhone('1900636553');
            },
          });
        }}
        title={`supportscreen.cskh`}
        content={'1900636553'}
      />
      <Row
        onPress={() => {
          Linking.openURL('mailto:irwm@vinacapital.com');
        }}
        title={`supportscreen.email`}
        content={'irwm@vinacapital.com'}
      />
      <Row
        onPress={() => {
          Linking.openURL('https://www.facebook.com/vinacapitalwm/');
        }}
        title={`supportscreen.facebook`}
        content={'fb.com/vinacapitalwm/'}
      />
      <Div
        height={54}
        backgroundColor={Ecolors.spaceColor}
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={16}
        justifyContent={'flex-start'}>
        <Label fontWeight={'700'}>{`supportscreen.chuyenvientrogiup`}</Label>
      </Div>
      <Row
        onPress={() => {
          // Linking.openURL('mailto:maivanthanh@vinacapital.com');
        }}
        title={`supportscreen.hoten`}
        content={'Mai Văn Thành'}
        contentColor={Ecolors.textColor}
      />
      <Row
        onPress={() => {
          Linking.openURL('mailto:maivanthanh@vinacapital.com');
        }}
        title={`supportscreen.email`}
        content={'maivanthanh@vinacapital.com'}
      />
    </Div>
  );
}

export default React.memo(SupportScreen);