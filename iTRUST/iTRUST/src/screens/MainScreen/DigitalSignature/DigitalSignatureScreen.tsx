import {Div, HeaderBack} from 'components';
import React from 'react';
import {ScrollView} from 'react-native';
import CardSignature from './CardSignature';
import DemoSignature from './DemoSignature';
import RowButtonAction from './RowButtonAction';

function DigitalSignatureScreen() {
  return (
    <Div height={'100%'}>
      <HeaderBack type={2} title={`digitalsignature.chukyso`} />
      <ScrollView>
        <Div alignItems={'center'}>
          <CardSignature />
          <DemoSignature />
          <RowButtonAction />
        </Div>
      </ScrollView>
    </Div>
  );
}

export default React.memo(DigitalSignatureScreen);
