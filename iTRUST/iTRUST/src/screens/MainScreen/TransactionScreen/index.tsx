import {Div, HeaderBack, TabViewComp} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import HistoryTransaction from './HistoryTransaction';
import OrderTransaction from './OrderTransaction';
import AutoInvestTranasction from './AutoInvestTranasction';
import Statement from 'screens/MainScreen/TransactionScreen/Statement';
import {useDispatch} from 'react-redux';
import {loadHistory} from 'reducer/transaction';

function TransactionScreen() {
  const dispatch = useDispatch();

  const controlLoadHistory = () => {
    dispatch(
      loadHistory({
        pagination: {
          currentPage: 1,
          itemsPerPage: 10,
        },
        queries: {},
      }),
    );
  };
  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack title={`transactionscreen.giaodich`} />
      <TabViewComp
        onChange={e => {
          if (e == 1) {
            controlLoadHistory();
          }
        }}
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
          {
            component: (a: any) => <Statement {...a} />,
            title: `transactionscreen.saokegiaodich`,
            key: 'Statement',
          },
        ]}
      />
    </Div>
  );
}

export default React.memo(TransactionScreen);
