import {Div, HeaderBack, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {ScrollView} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {heightScreen} from 'utils';
import CardSignature from './CardSignature';
import DemoSignature from './DemoSignature';
import RowButtonAction from './RowButtonAction';

function DigitalSignatureScreen() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {investmentProfile} = currentUser;
  return (
    <Div backgroundColor={Ecolors.whiteColor} height={'100%'}>
      <HeaderBack type={2} title={`digitalsignature.hopdongdientu`} />
      <ScrollView>
        <Div alignItems={'center'} flex={1}>
          <CardSignature />
          {/* <Div
            borderRadius={10}
            paddingHorizontal={5}
            paddingVertical={10}
            borderColor={Ecolors.bordercolor}
            marginTop={10}
            borderWidth={0.8}>
            <ImageView
              source={Icons.demoesign}
              width={333}
              height={466}
              resizeMode={'contain'}
            />
          </Div> */}
        </Div>
      </ScrollView>
      {!investmentProfile?.isReceivedHardProfile && <RowButtonAction />}
    </Div>
  );
}

export default React.memo(DigitalSignatureScreen);
