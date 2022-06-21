import {Div} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList} from 'react-native';
import {getProductList, getProductListSort} from 'reducer/asset';
import {useAppSelector} from 'store/hooks';
import {widthScale, widthScreen} from 'utils';
import ItemListAssetVerti from './ItemListAssetVerti';

interface Props {
  itemFocus: any;
  setItemFocus?: (e: any) => void;
}

function ListAssetVerti({setItemFocus}: Props) {
  const productList = useAppSelector(state => getProductListSort(state));

  const keyExtractor = (item: any, index: number) => `key${item.id}${index}`;

  const renderItem = (p: {item: any; index: number}) => {
    return <ItemListAssetVerti data={p.item} />;
  };

  const ListHeaderComponent = () => {
    return <Div width={17} />;
  };

  const ListFooterComponent = () => {
    return <Div height={17} />;
  };
  const ItemSeparatorComponent = () => {
    return <Div height={10} />;
  };

  return (
    <Div marginTop={20} flex={1}>
      <FlatList
        scrollEnabled={false}
        data={productList}
        extraData={productList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </Div>
  );
}

export default React.memo(ListAssetVerti);
