import {Div, HeaderBack, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getProductFocus, loadProduct, unFocusProduct} from 'reducer/investment';
import Chart from 'screens/MainScreen/InvestmentScreen/Chart';
import NavChange from 'screens/MainScreen/InvestmentScreen/NavChange';
import RowTime from 'screens/MainScreen/InvestmentScreen/RowTime';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {convertNumber} from 'utils';
import ButtonCreateOrder from './ButtonCreateOrder';
import ListNav from './ListNav';

function InvestmentDetailsScreen() {
  const dispatch = useDispatch();
  const productDetails = useAppSelector(state => getProductFocus(state));
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {name, nameEn} = productDetails;

  useEffect(() => {
    dispatch(loadProduct({}));
    return () => {
      dispatch(unFocusProduct({}));
    };
  }, []);

  return (
    <Div flex={1}>
      <HeaderBack
        type={'2'}
        multilanguage={false}
        title={I18nState == 'vi' ? name : nameEn || ''}
      />
      <ScrollView>
        <NavChange />
        <RowTime />
        <Chart />
        <ListNav />
      </ScrollView>
      <ButtonCreateOrder />
    </Div>
  );
}

export default React.memo(InvestmentDetailsScreen);
