import {ButtonBorder, Div} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getProductFocus} from 'reducer/investment';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';

function ButtonCreateOrder() {
  const insets = useSafeAreaInsets();
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const productDetails = useAppSelector(state => getProductFocus(state));
  return (
    <Div
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      paddingTop={18}
      paddingBottom={insets.bottom + 30}
      backgroundColor={Ecolors.whiteColor}>
      <ButtonBorder
        title={`investmentscreen.taolenhmua`}
        onPress={() => {
          if (currentUser.investmentProfile?.isReceivedHardProfile === 0) {
            navigate('ControlEKYCScreen');
            return;
          }
          navigate('CreateOrderModal', {
            orderType: 'BUY',
            initData: {
              product: productDetails,
              // scheme: item,
            },
          });
        }}
        width={317}
        height={48}
      />
    </Div>
  );
}

export default React.memo(ButtonCreateOrder);
