import {useRoute} from '@react-navigation/core';
import {Div, HeaderBack, TimeLine} from 'components';
import {Ecolors} from 'constant';
import React, {useRef, useState} from 'react';
import OrderBuy from './OrderBuy';
import OrderSell from './OrderSell';
import OrderTransfer from './OrderTransfer';

const switchTitleOrder = (t: 'BUY' | 'SELL' | 'TRANSFER' | 'TRANSFER_BUY') => {
  switch (t) {
    case 'BUY':
      return `createordermodal.datlenhmua`;
    case 'SELL':
      return `createordermodal.datlenhban`;
    case 'TRANSFER':
      return `createordermodal.datlenhchuyendoi`;
    case 'TRANSFER_BUY':
      return `createordermodal.datlenhchuyendoi`;
    default:
      return `createordermodal.datlenhban`;
  }
};

function CreateOrderModal() {
  const route = useRoute<any>();
  const orderType: 'BUY' | 'SELL' | 'TRANSFER' = route.params?.orderType;
  const initData: any = route.params?.initData;
  const [stepTimeLine, setStepTimeLine] = useState<number>(1);

  const swithTypeOrder = (
    type: 'BUY' | 'SELL' | 'TRANSFER' | 'TRANSFER_BUY',
  ) => {
    switch (type) {
      case 'BUY':
        return (
          <OrderBuy
            initData={initData}
            stepTimeLine={stepTimeLine}
            setStepTimeLine={setStepTimeLine}
          />
        );
      case 'SELL':
        return (
          <OrderSell
            initData={initData}
            stepTimeLine={stepTimeLine}
            setStepTimeLine={setStepTimeLine}
          />
        );
      case 'TRANSFER':
        return (
          <OrderTransfer
            initData={initData}
            stepTimeLine={stepTimeLine}
            setStepTimeLine={setStepTimeLine}
          />
        );
      case 'TRANSFER_BUY':
        return (
          <OrderTransfer
            initData={initData}
            stepTimeLine={stepTimeLine}
            setStepTimeLine={setStepTimeLine}
          />
        );
      default:
        return (
          <OrderBuy
            stepTimeLine={stepTimeLine}
            setStepTimeLine={setStepTimeLine}
          />
        );
    }
  };

  return (
    <Div screen={true} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={2} title={switchTitleOrder(orderType)} />
      <TimeLine index={stepTimeLine} />
      {swithTypeOrder(orderType)}
    </Div>
  );
}

export default React.memo(CreateOrderModal);
