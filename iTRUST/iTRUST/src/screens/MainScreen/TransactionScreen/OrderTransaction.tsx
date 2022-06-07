import {useIsFocused} from '@react-navigation/core';
import {Alert, ButtonBorder, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  changeOrderType,
  getTransaction,
  loadTransaction,
} from 'reducer/transaction';
import {navigate} from 'services';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {heightScale, Log} from 'utils';
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
  const {
    email,
    phone,
    riskInfo,
    bankAccountIsFull,
    userInfoIsFull,
    userAddressIsFull,
  } = currentUser;
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
      <ScrollView
        style={s.scrollviewHeader}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <Div width={16} />
        <ButtonBorder
          marginTop={20}
          size={14}
          width={125}
          height={36}
          onPress={() => onChangeOrderType('BUY')}
          type={orderType == 'BUY' ? 1 : 3}
          title={`transactionscreen.lenhchomua`}
        />
        <Div width={16} />
        <ButtonBorder
          marginTop={20}
          size={14}
          width={125}
          height={36}
          onPress={() => onChangeOrderType('SELL')}
          type={orderType == 'SELL' ? 1 : 3}
          title={`transactionscreen.lenhchoban`}
        />
        <Div width={16} />
        <ButtonBorder
          marginTop={20}
          size={14}
          width={125}
          height={36}
          onPress={() => onChangeOrderType('TRANSFER')}
          type={orderType == 'TRANSFER' ? 1 : 3}
          title={`transactionscreen.lenhhoandoi`}
        />
        <Div width={16} />
        <ButtonBorder
          marginTop={20}
          size={14}
          width={125}
          height={36}
          onPress={() => onChangeOrderType('TRANSFER_BUY')}
          type={orderType == 'TRANSFER_BUY' ? 1 : 3}
          title={`transactionscreen.lenhmuahoandoi`}
        />
        <Div width={16} />
      </ScrollView>
      <Div flex={1}>
        <ListOrderTransaction />
      </Div>
      <Div
        paddingVertical={16}
        width={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}>
        <ButtonBorder
          onPress={() => {
            if (!currentUser?.investmentProfile?.status) {
              if (!userInfoIsFull && !bankAccountIsFull && !userAddressIsFull) {
                navigate('ControlEKYCScreen', {
                  // onBack: () => {
                  //   navigate('TransactionScreen');
                  // },
                });
              } else {
                navigate('AccountVerifyScreen');
              }
              return;
            }
            if (
              (orderType == 'SELL' || orderType == 'TRANSFER') &&
              !currentUser?.investmentProfile?.isReceivedHardProfile
            ) {
              const content =
                I18nState == 'vi'
                  ? `Tài khoản của quý khách hiện tại chưa được duyệt hoặc chưa nhận được hồ sơ gốc/chưa ký hợp đồng điện tử. Nên không thể thực hiện lệnh bán/ chuyển đổi.`
                  : `You cannot create redemption/switching transaction due to pending account approval or not received hardcopy Open Account Contract/ unsigned e-Contract`;
              if (
                currentUser?.investmentProfile?.status?.code !=
                  `INVESTMENT_PROFILE_APPROVE` ||
                (currentUser?.investmentProfile?.status?.code ==
                  'INVESTMENT_PROFILE_APPROVE' &&
                  !currentUser?.investmentProfile?.isReceivedHardProfile)
              ) {
                Alert.show({
                  content: content,
                  multilanguage: false,
                  type: 2,
                  titleClose: 'alert.dongy',
                  onCancel: () => {},
                  onConfirm: () => {
                    navigate('DigitalSignatureScreen');
                  },
                });
                return;
              }
            }
            navigate('CreateOrderModal', {
              orderType,
            });
            return;
          }}
          type={1}
          title={convertTitleOrderType(orderType)}
        />
      </Div>
    </Div>
  );
}

const s = StyleSheet.create({
  scrollviewHeader: {
    maxHeight: heightScale(60),
    marginBottom: heightScale(10),
  },
});

export default React.memo(OrderTransaction);
