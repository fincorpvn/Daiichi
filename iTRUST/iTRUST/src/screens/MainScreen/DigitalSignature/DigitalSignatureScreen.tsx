import { Div, HeaderBack, ImageView, Label } from 'components';
import { Ecolors, Icons } from 'constant';
import React from 'react';
import { ScrollView } from 'react-native';
import { useAppSelector } from 'store/hooks';
import { heightScreen } from 'utils';
import CardSignature from './CardSignature';
import DemoSignature from './DemoSignature';
import RowButtonAction from './RowButtonAction';

function DigitalSignatureScreen() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const {statusScreen} = useAppSelector(state => state.authen);

  const { investmentProfile } = currentUser;
  return (
    <Div backgroundColor={Ecolors.whiteColor} height={'100%'}>
      <HeaderBack
        isHideBack={statusScreen == 'unAuthorized'}
        type={2}
        title={`digitalsignature.hopdongdientu`}
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
