import {Div, Label, LoadingIndicator, NonData} from 'components';
import {Ecolors} from 'constant';
import React, {useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  getIsLoadMoreTransaction,
  getLoading,
  getLoadmore,
  getTransaction,
  loadMoreTransaction,
  loadTransaction,
} from 'reducer/transaction';
import {useAppSelector} from 'store/hooks';
import {
  ItemOrderBuy,
  ItemOrderSell,
  ItemOrderTransfer,
  ItemOrderTransferBuy,
} from './ItemListTransaction';

function ListOrderTransaction() {
  const dispatch = useDispatch();

  const transaction = useAppSelector(state => getTransaction(state));
  const loading = useAppSelector(state => getLoading(state));
  const loadmore = useAppSelector(state => getLoadmore(state));
  const orderType = useAppSelector(state => state.transaction.orderType);
  const isCanLoadmore = useAppSelector(state =>
    getIsLoadMoreTransaction(state),
  );

  const keyExtractor = (item: any, index: number) => `key${item.id}`;

  const renderItem = (p: {item: any; index: number}) => {
    if (orderType == 'BUY') return <ItemOrderBuy data={p.item} />;
    if (orderType == 'SELL') return <ItemOrderSell data={p.item} />;
    if (orderType == 'TRANSFER') return <ItemOrderTransfer data={p.item} />;
    if (orderType == 'TRANSFER_BUY')
      return <ItemOrderBuy hideDelete={true} data={p.item} />;
    return <></>;
  };

  const ListHeaderComponent = useCallback(() => {
    return (
      <Div
        paddingVertical={18}
        paddingHorizontal={16}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}>
        <Label>{`transactionscreen.tongsolenh`}</Label>
        <Label multilanguage={false}>
          {loading ? '' : transaction.pagination?.totalItemCount || '0'}
        </Label>
      </Div>
    );
  }, [loading]);

  const ItemSeparatorComponent = () => {
    return <Div height={10} />;
  };

  const onRefresh = () => {
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
  };

  const ListFooterComponent = () => {
    return (
      <Div
        height={50}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}>
        {!loading && loadmore && <LoadingIndicator color={Ecolors.mainColor} />}
      </Div>
    );
  };

  const onLoadMore = () => {
    if (loadmore || loading || !isCanLoadmore) {
      return;
    }
    dispatch(
      loadMoreTransaction({
        pagination: {
          currentPage: (transaction.pagination?.currentPage || 0) + 1,
          itemsPerPage: 10,
        },
        queries: {
          orderType: orderType || 'BUY',
        },
      }),
    );
  };

  const ListEmptyComponent = useCallback(() => {
    return (
      <NonData
        loading={loading}
        content={`transactionscreen.chuacogiaodich`}
        paddingTop={30}
      />
    );
  }, [loading]);

  return (
    <FlatList
      data={transaction.items}
      extraData={transaction.items}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
          tintColor={Ecolors.mainColor}
        />
      }
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReachedThreshold={0.4}
      onEndReached={onLoadMore}
    />
  );
}

export default React.memo(ListOrderTransaction);
