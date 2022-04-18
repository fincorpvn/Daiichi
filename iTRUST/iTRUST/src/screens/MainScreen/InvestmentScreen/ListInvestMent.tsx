import {Div, ImageView, NonData} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  getListProduct,
  getLoading,
  getLoadMore,
  loadProduct,
} from 'reducer/investment';
import {useAppSelector} from 'store/hooks';
import ItemListInvestment from './ItemListInvestment';

function ListInvestMent(p: {data: Array<any>}) {
  const dispatch = useDispatch();
  const loading = useAppSelector(state => getLoading(state));

  const renderItem = (p: {item: any; index: number}) => {
    return <ItemListInvestment data={p.item} />;
  };

  const keyExtractor = (item: any, index: number) => `key${item.id}`;

  const ItemSeparatorComponent = () => {
    return <Div height={10} />;
  };

  const ListFooterComponent = () => {
    return <Div height={10} />;
  };
  const ListHeaderComponent = () => {
    return <Div height={20} />;
  };

  const onLoadMore = () => {};

  const onRefresh = () => {
    dispatch(loadProduct({}));
  };

  const ListEmptyComponent = () => {
    return (
      <Div paddingTop={180} alignItems={'center'} justifyContent={'center'}>
        <ImageView
          source={Icons.nonassets}
          width={161}
          height={130}
          resizeMode={'contain'}
        />
      </Div>
    );
  };

  return (
    <FlatList
      keyboardShouldPersistTaps={'handled'}
      data={p.data}
      extraData={p.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      onEndReachedThreshold={0.4}
      onEndReached={onLoadMore}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={Ecolors.mainColor}
        />
      }
    />
  );
}

export default React.memo(ListInvestMent);
