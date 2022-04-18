import {Div, Label, LoadingIndicator, NonData} from 'components';
import {Ecolors} from 'constant';
import React, {useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  getHistory,
  getLoading,
  getLoadingHistory,
  getLoadMoreHistory,
  getTransaction,
  loadHistory,
  loadMoreHistory,
} from 'reducer/transaction';
import {useAppSelector} from 'store/hooks';
import {Log} from 'utils';
import ItemListHistoryOrder from './ItemListHistoryOrder';

function ListHistoryOrder(p: {onRefresh?: () => void}) {
  const dispatch = useDispatch();
  const history = useAppSelector(state => getHistory(state));
  const loading = useAppSelector(state => getLoadingHistory(state));
  const loadMore = useAppSelector(state => getLoadMoreHistory(state));
  const isCanLoadmore = useAppSelector(
    state => state.transaction.IsLoadMore['HISTORY'],
  );

  const keyExtractor = (item: any, index: number) => `key${item.id}`;

  const renderItem = (p: {item: any; index: number}) => {
    return <ItemListHistoryOrder data={p.item} />;
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
          {loading ? '' : history.pagination?.totalItemCount ?? '0'}
        </Label>
      </Div>
    );
  }, [loading]);

  const ItemSeparatorComponent = () => {
    return <Div height={10} />;
  };

  const onRefresh = () => {
    p.onRefresh && p.onRefresh();
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

  const ListFooterComponent = () => {
    return (
      <Div flexDirection={'column'} alignItems={'center'} paddingVertical={16}>
        {!loading && loadMore && <LoadingIndicator color={Ecolors.mainColor} />}
      </Div>
    );
  };

  const onLoadMore = () => {
    if (loadMore || loading || !isCanLoadmore) {
      return;
    }
    dispatch(
      loadMoreHistory({
        pagination: {
          ...history.pagination,
          currentPage: history.pagination?.currentPage
            ? history.pagination?.currentPage + 1
            : 1,
        },
        queries: history.queries,
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
      keyboardShouldPersistTaps={'handled'}
      data={history.items}
      extraData={history.items}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.4}
      onEndReached={onLoadMore}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={Ecolors.mainColor}
        />
      }
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
}

export default React.memo(ListHistoryOrder);
