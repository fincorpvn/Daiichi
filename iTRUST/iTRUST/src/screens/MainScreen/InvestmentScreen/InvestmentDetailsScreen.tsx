import {Div, HeaderBack, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getProductFocus, unFocusProduct} from 'reducer/investment';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {convertNumber} from 'utils';
import ButtonCreateOrder from './ButtonCreateOrder';
import ListNav from './ListNav';

function IPrice(p: {title: string; content: string}) {
  return (
    <Div
      marginTop={18}
      width={108}
      paddingVertical={9}
      borderRadius={8}
      style={EStyle.shadowItem}
      backgroundColor={Ecolors.spaceColor}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Label size={14} color={Ecolors.grayColor}>
        {p.title}
      </Label>
      <Label
        multilanguage={false}
        size={18}
        color={Ecolors.linkColor}
        fontWeight={'700'}>
        {convertNumber(p.content)}
      </Label>
    </Div>
  );
}

function InvestmentDetailsScreen() {
  const dispatch = useDispatch();
  const productDetails = useAppSelector(state => getProductFocus(state));
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {name, nameEn} = productDetails;

  useEffect(() => {
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
      <ListNav />
      <ButtonCreateOrder />
    </Div>
  );
}

export default React.memo(InvestmentDetailsScreen);
