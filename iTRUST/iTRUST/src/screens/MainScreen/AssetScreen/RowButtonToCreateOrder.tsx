import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {useAppSelector} from 'store/hooks';
import {checkApproveInvestmentProfile} from 'utils';

const II = (p: {
  action: (t: any) => void;
  width: number;
  orderType: string;
  title: string;
  icon: any;
}) => {
  const {action, width, orderType, title, icon} = p;
  return (
    <Button
      width={width || 83}
      flexDirection={'row'}
      alignItems={'center'}
      borderRadius={5}
      borderColor={Ecolors.bordercolor}
      borderWidth={0.8}
      justifyContent={'center'}
      backgroundColor={Ecolors.mainColor}
      height={36}
      onPress={() => {
        action(orderType || 'BUY');
      }}>
      <ImageView
        widthHeight={17}
        resizeMode={'contain'}
        source={icon || Icons.buy}
      />
      <Label marginLeft={6} size={14} color={Ecolors.whiteColor}>
        {title}
      </Label>
    </Button>
  );
};

function RowButtonToCreateOrder(p: {data: any}) {
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const action = (or: 'SELL' | 'TRANSFER' | 'BUY' | 'TRANSFER_BUY') => {
    checkApproveInvestmentProfile({
      currentUser,
      I18nState,
      initData: {
        product: p.data,
      },
      orderType: or || 'BUY',
    });
    return;
  };
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={20}
      paddingTop={14}
      justifyContent={'space-between'}>
      <II
        orderType={'BUY'}
        width={83}
        title={`createordermodal.mua`}
        action={action}
        icon={Icons.buy}
      />
      <II
        orderType={'SELL'}
        width={84}
        title={`createordermodal.ban`}
        action={action}
        icon={Icons.sell}
      />
      <II
        orderType={'TRANSFER'}
        width={121}
        title={`createordermodal.chuyendoi`}
        action={action}
        icon={Icons.transfer}
      />
    </Div>
  );
}

export default React.memo(RowButtonToCreateOrder);
