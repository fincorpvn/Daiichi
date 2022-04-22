import {Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect} from 'react';
import {useAppSelector} from 'store/hooks';

function CardProfile(Props: {}) {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {name, investmentProfile} = currentUser;
  const I18nState = useAppSelector(state => state.languages.I18nState);

  useEffect(() => {
    return () => {};
  }, []);

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
              investmentProfile?.status
                ? 'rgba(22, 199, 154, 0.2)'
                : 'rgba(255, 0, 0, 0.2)'
            }>
            <Label
              size={13}
              multilanguage={false}
              color={
                !!investmentProfile?.status
                  ? Ecolors.greenColor
                  : Ecolors.redColor
              }>
              {!!investmentProfile?.status
                ? I18nState == 'vi'
                  ? investmentProfile?.status?.code ==
                    'INVESTMENT_PROFILE_PENDING'
                    ? 'Chờ duyệt'
                    : 'Đã duyệt'
                  : investmentProfile?.status?.code ==
                    'INVESTMENT_PROFILE_PENDING'
                  ? 'Pending'
                  : 'Approved'
                : I18nState == 'vi'
                ? 'Chưa xác thực'
                : 'Unconfirmed' || ''}
            </Label>
          </Div>
        </Div>
      </Div>
      <Div height={7} backgroundColor={Ecolors.spaceColor} />
    </>
  );
}

export default React.memo(CardProfile);
