import {useIsFocused} from '@react-navigation/core';
import {
  BottomSheetDialog,
  Button,
  Div,
  ImageView,
  Input,
  InputItem,
} from 'components';
import {Ecolors, Icons} from 'constant';
import {filter} from 'domutils';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  getPaginationHistory,
  getQueriesHistory,
  loadHistory,
} from 'reducer/transaction';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {Log, parseMultilanguage} from 'utils';
import FilterHistoryModal from './FilterHistoryModal';
import ListHistoryOrder from './ListHistoryOrder';

function HistoryTransaction(p: {activeTab: any}) {
  const dispatch = useDispatch();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [orderCode, setOrderCode] = useState<string>('');
  const queries = useAppSelector(state => getQueriesHistory(state));
  const pagination = useAppSelector(state => getPaginationHistory(state));
  const bottomSheetRef = useRef<{
    show: () => void;
    hide: () => void;
  }>(null);
  // handle search on type
  const debounceHandle = useRef<any>(null);
  const isFocus = useIsFocused();
  const orderCodeRef = useRef<any>();

  useEffect(() => {
    controlDeboundHandle(orderCode.replace(/ /g, ''));
    return () => {
      if (debounceHandle.current) {
        clearTimeout(debounceHandle.current);
      }
    };
  }, [orderCode]);

  useEffect(() => {
    if (!isFocus || p.activeTab != 1) {
      setOrderCode('');
      if (orderCodeRef.current) {
        orderCodeRef.current.clear();
      }
    }
    return () => {};
  }, [isFocus, p.activeTab]);

  const controlDeboundHandle = (t: string) => {
    if (debounceHandle.current) {
      clearTimeout(debounceHandle.current);
    }
    debounceHandle.current = setTimeout(() => {
      getData({
        orderCode: t,
        pagination: {
          currentPage: 1,
        },
      });
    }, 200);
  };

  const getData = (p: {orderCode?: string; pagination?: any}) => {
    dispatch(
      loadHistory({
        queries: {
          ...(queries || {}),
          orderCode: p.orderCode || '',
        },
        pagination: {...(pagination || {}), ...p.pagination} || {},
      }),
    );
  };

  return (
    <>
      <BottomSheetDialog
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        ref={bottomSheetRef}>
        <FilterHistoryModal
          onBack={() => {
            if (bottomSheetRef.current) {
              bottomSheetRef.current.hide();
            }
          }}
        />
      </BottomSheetDialog>
      <Div flex={1}>
        <Div
          flexDirection={'row'}
          paddingHorizontal={16}
          paddingTop={20}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Div
            width={300}
            borderRadius={5}
            borderColor={Ecolors.grayColor}
            borderWidth={1}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingLeft={15}
            paddingRight={14}
            height={36}>
            <Input
              inputRef={orderCodeRef}
              margin={0}
              value={orderCode}
              onChangeText={(e: string) => setOrderCode(e)}
              padding={0}
              color={Ecolors.textColor}
              placeholder={parseMultilanguage(`transactionscreen.nhapmalenh`)}
              placeholderTextColor={Ecolors.grayColor}
              keyboardType={'name-phone-pad'}
              flex={1}
            />
            <ImageView
              heightWidth={19}
              source={Icons.search}
              resizeMode={'contain'}
            />
          </Div>
          <Button
            onPress={() => {
              navigate('FilterHistoryModal');
              // if (bottomSheetRef.current) {
              //   bottomSheetRef.current.show();
              // }
            }}
            heightWidth={36}
            alignItems={'center'}
            justifyContent={'center'}
            borderWidth={1}
            borderColor={Ecolors.grayColor}
            borderRadius={5}>
            <ImageView
              source={Icons.filter}
              heightWidth={19}
              resizeMode={'contain'}
            />
          </Button>
        </Div>
        <ListHistoryOrder
          onRefresh={() => {
            setOrderCode('');
          }}
        />
      </Div>
    </>
  );
}

export default React.memo(HistoryTransaction);
