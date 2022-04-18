import {Div, HeaderBack, TabViewComp} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import HistoryTransaction from './HistoryTransaction';
import OrderTransaction from './OrderTransaction';
import AutoInvestTranasction from './AutoInvestTranasction';

function TransactionScreen() {
  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack title={`transactionscreen.giaodich`} />
      <TabViewComp
        multilanguage={true}
        data={[
          {
            component: (a: any) => <OrderTransaction {...a} />,
            title: `transactionscreen.lenhchoxuly`,
            key: 'OrderTransaction',
          },
          {
            component: (a: any) => <HistoryTransaction {...a} />,
            title: `transactionscreen.lichsugiaodich`,
            key: 'HistoryTransaction',
          },
          {
            component: (a: any) => <AutoInvestTranasction {...a} />,
            title: `transactionscreen.dinhky`,
            key: 'AutoInvestTranasction',
          },
        ]}
      />
    </Div>
  );
}

export default React.memo(TransactionScreen);
