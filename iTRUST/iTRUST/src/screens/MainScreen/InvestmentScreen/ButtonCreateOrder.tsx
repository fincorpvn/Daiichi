import {ButtonBorder, Div} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getProductFocus} from 'reducer/investment';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {checkApproveInvestmentProfile} from 'utils';

function ButtonCreateOrder() {
  const insets = useSafeAreaInsets();
  const I18nState = useAppSelector(state => state.languages.I18nState);
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
          checkApproveInvestmentProfile({
            currentUser,
            I18nState,
            initData: {
              product: productDetails,
            },
            orderType: 'BUY',
          });
          return;
        }}
        width={317}
        height={48}
      />
    </Div>
  );
}

export default React.memo(ButtonCreateOrder);
