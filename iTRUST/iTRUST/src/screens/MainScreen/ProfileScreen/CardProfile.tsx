import {Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect} from 'react';
import {useAppSelector} from 'store/hooks';

function CardProfile(Props: {}) {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {name, investmentProfile} = currentUser;
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const convertCodeProfile = () => {
    if (!investmentProfile?.status) {
      return I18nState == 'vi' ? 'Chưa xác thực' : 'Unconfirmed';
    }
    return investmentProfile?.status?.name;
    switch (investmentProfile?.status?.code) {
      case 'INVESTMENT_PROFILE_PENDING':
        return I18nState == 'vi' ? 'Chờ duyệt' : 'Pending';
      case 'INVESTMENT_PROFILE_APPROVE':
        return I18nState == 'vi' ? 'Đã duyệt' : 'Approve';
      case 'INVESTMENT_PROFILE_ACCEPT':
        return I18nState == 'vi' ? 'Đã duyệt' : 'Approve';
      case 'INVESTMENT_PROFILE_REJECT':
        return I18nState == 'vi' ? 'Từ chối' : 'Reject';
    }
  };

  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
        padding={16}
        backgroundColor={Ecolors.whiteColor}>
        <Div
          widthHeight={40}
          borderRadius={40}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Ecolors.grayColor}>
          <ImageView
            width={19}
            height={24}
            resizeMode={'contain'}
            source={Icons.profile}
            tintColor={Ecolors.textColor}
          />
        </Div>
        <Div
          paddingHorizontal={10}
          flexDirection={'column'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}>
          <Label multilanguage={false} fontWeight={'500'}>
            {name || ''}
          </Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}>
            <Label
              size={13}
              color={Ecolors.grayColor}>{`profile.sotaikhoan`}</Label>
            <Label size={13} multilanguage={false} color={Ecolors.grayColor}>
              {investmentProfile?.number || ''}
            </Label>
          </Div>
          <Div
            paddingVertical={5}
            paddingHorizontal={10}
            marginTop={7}
            borderRadius={50}
            backgroundColor={
              investmentProfile?.status?.code == 'INVESTMENT_PROFILE_APPROVE' ||
              investmentProfile?.status?.code == 'INVESTMENT_PROFILE_ACCEPT'
                ? 'rgba(22, 199, 154, 0.2)'
                : 'rgba(255, 0, 0, 0.2)'
            }>
            <Label
              size={13}
              multilanguage={false}
              color={
                investmentProfile?.status?.code ==
                  'INVESTMENT_PROFILE_APPROVE' ||
                investmentProfile?.status?.code == 'INVESTMENT_PROFILE_ACCEPT'
                  ? Ecolors.greenColor
                  : Ecolors.redColor
              }>
              {convertCodeProfile()}
            </Label>
          </Div>
        </Div>
      </Div>
      <Div height={7} backgroundColor={Ecolors.spaceColor} />
    </>
  );
}

export default React.memo(CardProfile);
