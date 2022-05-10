import {Div, HeaderBack} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {ScrollView} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {heightScreen} from 'utils';
import CardSignature from './CardSignature';
import DemoSignature from './DemoSignature';
import RowButtonAction from './RowButtonAction';

function DigitalSignatureScreen() {
  const currentUser = useAppSelector(state => state.authen.currentUser);

  const {investmentProfile} = currentUser;
  return (
    <Div backgroundColor={Ecolors.whiteColor} height={'100%'}>
      <HeaderBack type={2} title={`digitalsignature.hopdongdientu`} />
      {/* <ScrollView> */}
      <Div alignItems={'center'} flex={1} justifyContent={'space-between'}>
        <CardSignature />
        {/* <DemoSignature /> */}
        {!investmentProfile?.isReceivedHardProfile && <RowButtonAction />}
      </Div>
      {/* </ScrollView> */}
    </Div>
  );
}

export default React.memo(DigitalSignatureScreen);
