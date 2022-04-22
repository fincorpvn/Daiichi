import {Div, ImageView, Label, Button} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';

function HeaderBackType3() {
  const insests = useSafeAreaInsets();
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {name, bankAccount, investmentProfile} = currentUser;
  return (
    <Div
      paddingTop={insests.top + 15}
      paddingBottom={9}
      paddingLeft={19}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingRight={24}
      // backgroundColor={Ecolors.mainColor}
    >
      <Button
        onPress={() => {
          navigate('ProfileScreen');
        }}
        flexDirection={'row'}>
        <Div
          widthHeight={40}
          borderRadius={40}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Ecolors.spaceColor}>
          <ImageView
            source={Icons.profile}
            tintColor={Ecolors.textColor}
            width={18}
            height={24}
            resizeMode={'contain'}
          />
        </Div>
        <Div
          paddingHorizontal={11}
          flexDirection={'column'}
          alignItems={'flex-start'}
          justifyContent={'center'}>
          <Label
            size={16}
            color={Ecolors.whiteColor}
            multilanguage={false}
            fontWeight={'500'}>
            {name}
          </Label>
          <Div flexDirection={'row'} alignItems={'center'} flex={1}>
            <Label
              size={13}
              color={Ecolors.grayColor}>{`profile.sotaikhoan`}</Label>
            <Label size={13} multilanguage={false} color={Ecolors.grayColor}>
              {investmentProfile?.number || ''}
            </Label>
          </Div>
        </Div>
      </Button>
      {/* <Button
        onPress={() => {
          // navigate('NotificationScreen');
        }}
        widthHeight={40}
        alignItems={'center'}
        justifyContent={'center'}>
        <ImageView
          source={Icons.notification}
          tintColor={Ecolors.whiteColor}
          width={20}
          height={26}
          resizeMode={'contain'}
        />
      </Button> */}
    </Div>
  );
}

export default React.memo(HeaderBackType3);
