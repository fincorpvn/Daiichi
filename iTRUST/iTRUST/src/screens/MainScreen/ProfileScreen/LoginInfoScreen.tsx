import {Button, Div, HeaderBack, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';

function IRow(p: {
  title: string;
  onPress?: () => void;
  isChange?: boolean;
  hide?: boolean;
  content?: string;
}) {
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderTopColor={Ecolors.gray2x}
      borderTopWidth={0.5}
      height={60}
      marginHorizontal={15}>
      <Div flex={1}>
        <Label numberOfLines={1} multilanguage={false}>
          <Label>{p.title}</Label>
          {` : ${p.content || ''}`}
        </Label>
      </Div>
      {p.isChange ? (
        <Button
          onPress={() => p.onPress && p.onPress()}
          height={40}
          width={85}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Ecolors.gray3x}
          borderRadius={5}>
          <Label size={14}>{`profile.change`}</Label>
        </Button>
      ) : p.hide ? (
        <></>
      ) : (
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <ImageView
            source={Icons.error}
            tintColor={Ecolors.red}
            widthHeight={22}
          />
          <Label marginLeft={5} size={14}>{`profile.cannotchange`}</Label>
        </Div>
      )}
    </Div>
  );
}

function LoginInfoScreen() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {userRefCode, phone, email} = currentUser;

  return (
    <Div screen={true} useKeyboard={true}>
      <HeaderBack title={`profile.logininfo`} />
      <Div margin={10}>
        <Label size={14} color={Ecolors.gray} textAlign={'center'}>
          {`profile.contentlogininfo`}
        </Label>
      </Div>
      <IRow
        isChange={true}
        onPress={() => navigate('ChangeEmailScreen')}
        title={'profile.email'}
        content={email || '-'}
      />
      <IRow isChange={false} title={'profile.phone'} content={phone || '-'} />
      <IRow
        isChange={true}
        onPress={() => navigate('ChangePasswordScreen')}
        title={'profile.password'}
        content={'* * * * * *'}
      />
      <IRow
        hide={true}
        title={'profile.userref'}
        content={userRefCode || '-'}
      />
    </Div>
  );
}

export default React.memo(LoginInfoScreen);
