import {useIsFocused} from '@react-navigation/core';
import {Alert, ButtonBorder, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {getProductList} from 'reducer/asset';
import {
  changeOrderType,
  getTransaction,
  loadTransaction,
} from 'reducer/transaction';
import {navigate} from 'services';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {
  checkApproveInvestmentProfile,
  heightScale,
  Log,
  widthScreen,
} from 'utils';
import ListOrderTransaction from './ListOrderTransaction';

const convertTitleOrderType = (a: string) => {
  switch (a) {
    case 'BUY':
      return `transactionscreen.taolenhmua`;
    case 'SELL':
      return `transactionscreen.taolenhban`;
    case 'TRANSFER':
      return `transactionscreen.taolenhchuyendoi`;
    case 'TRANSFER_BUY':
      return `transactionscreen.taolenhchuyendoi`;
    default:
      return `transactionscreen.taolenhmua`;
  }
};

function OrderTransaction() {
  const dispatch = useDispatch();
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const orderType = useAppSelector(state => state.transaction.orderType);
  const isFocus = useIsFocused();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const productList = useAppSelector(state => getProductList(state));
  const onChangeOrderType = (
    a: 'BUY' | 'SELL' | 'TRANSFER' | 'TRANSFER_BUY',
  ) => {
    dispatch(changeOrderType(a));
    dispatch(
      loadTransaction({
        pagination: {
          currentPage: 1,
          itemsPerPage: 10,
        },
        queries: {
          orderType: a,
        },
      }),
    );
  };

  useEffect(() => {
    if (isFocus) {
      dispatch(
        loadTransaction({
          pagination: {
            currentPage: 1,
            itemsPerPage: 10,
          },
          queries: {
            orderType: orderType || 'BUY',
          },
        }),
      );
    }

    return () => {};
  }, [isFocus]);

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <Div
        position={'absolute'}
        backgroundColor={Ecolors.whiteColor}
        zIndex={999}
        elevation={999}
        top={0}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={s.scrollviewHeader}>
          <Div width={16} />
          <ButtonBorder
            size={14}
            width={125}
            height={36}
            onPress={() => {
              if (orderType == 'BUY') {
                return;
              }
              onChangeOrderType('BUY');
            }}
            type={orderType == 'BUY' ? 1 : 3}
            title={`transactionscreen.lenhchomua`}
          />
          <Div width={16} />

          <ButtonBorder
            size={14}
            width={125}
            height={36}
            onPress={() => {
              if (orderType == 'SELL') {
                return;
              }
              onChangeOrderType('SELL');
            }}
            type={orderType == 'SELL' ? 1 : 3}
            title={`transactionscreen.lenhchoban`}
          />
          <Div width={16} />

          <ButtonBorder
            size={14}
            width={175}
            height={36}
            onPress={() => {
              if (orderType == 'TRANSFER') {
                return;
              }
              onChangeOrderType('TRANSFER');
            }}
            type={orderType == 'TRANSFER' ? 1 : 3}
            title={`transactionscreen.lenhbanhoandoi`}
          />
          <Div width={16} />

          <ButtonBorder
            size={14}
            width={175}
            height={36}
            onPress={() => {
              if (orderType == 'TRANSFER_BUY') {
                return;
              }
              onChangeOrderType('TRANSFER_BUY');
            }}
            type={orderType == 'TRANSFER_BUY' ? 1 : 3}
            title={`transactionscreen.lenhmuahoandoi`}
          />
          <Div width={16} />
        </ScrollView>
      </Div>
      <Div flex={1}>
        <ListOrderTransaction />
      </Div>
      {(!!productList.length || orderType == 'BUY') && (
        <Div
          paddingVertical={16}
          width={'100%'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}>
          <ButtonBorder
            onPress={() => {
              checkApproveInvestmentProfile({
                currentUser,
                I18nState,
                orderType,
                initData: {},
              });
              return;
            }}
            type={1}
            title={convertTitleOrderType(orderType)}
          />
        </Div>
      )}
    </Div>
  );
}

const s = StyleSheet.create({
  scrollviewHeader: {
    width: widthScreen,
    height: heightScale(50),
    flexDirection: 'row',
  },
});

export default React.memo(OrderTransaction);
