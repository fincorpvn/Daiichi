import {useRoute} from '@react-navigation/core';
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
  const {statusScreen} = useAppSelector(state => state.authen);

  const {investmentProfile} = currentUser;
  const route = useRoute<any>();

  return (
    <Div backgroundColor={Ecolors.whiteColor} height={'100%'}>
      <HeaderBack
        isHideBack={!!route.params?.isHideBack}
        type={2}
        title={`digitalsignature.hopdongdientutype2`}
      />
      <ScrollView>
        <Div alignItems={'center'} flex={1}>
          <CardSignature />
        </Div>
      </ScrollView>
      {!investmentProfile?.isReceivedHardProfile && <RowButtonAction />}
    </Div>
  );
}

export default React.memo(DigitalSignatureScreen);
