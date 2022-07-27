import {useRoute} from '@react-navigation/core';
import {Button, ButtonBorder, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ComBankContent from 'screens/MainScreen/CreateOrderModal/ComBankContent';
import {goBack} from 'services';

function TransferContentStepModal() {
  const route = useRoute<any>();
  const {
    bankSuperVisory,
    amount,
    excuseTempVolumn,
    beginBuyAutoStartDate,
    scheme,
    onConfirm,
  } = route?.params;
  return (
    <Div flex={1} alignItems={'center'} justifyContent={'center'}>
      <Div
        width={337}
        height={500}
        borderRadius={8}
        paddingHorizontal={5}
        borderWidth={0.8}
        borderColor={Ecolors.bordercolor}
        backgroundColor={Ecolors.whiteColor}
        style={EStyle.shadowItem}>
        <Div
          width={'100%'}
          paddingHorizontal={17}
          paddingTop={18}
          paddingBottom={10}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <Label
            fontWeight={'700'}>{`createordermodal.xacnhanthanhtoan`}</Label>
          <Button
            onPress={() => {
              goBack();
            }}>
            <ImageView
              widthHeight={18}
              tintColor={Ecolors.textColor}
              source={Icons.close}
            />
          </Button>
        </Div>
        <ScrollView>
          <ComBankContent
            bankSuperVisory={bankSuperVisory}
            amount={amount}
            excuseTempVolumn={excuseTempVolumn}
            beginBuyAutoStartDate={beginBuyAutoStartDate}
            scheme={scheme}
          />
        </ScrollView>

        <Div
          width={'100%'}
          paddingVertical={20}
          alignItems={'center'}
          justifyContent={'center'}>
          <ButtonBorder
            onPress={() => {
              goBack();
              onConfirm && onConfirm();
            }}
            width={303}
            title={`createordermodal.xacnhan`}
          />
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(TransferContentStepModal);
