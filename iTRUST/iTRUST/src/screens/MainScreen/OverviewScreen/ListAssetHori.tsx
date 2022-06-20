import {Div} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList} from 'react-native';
import {getProductList, getProductListSort} from 'reducer/asset';
import {useAppSelector} from 'store/hooks';
import {widthScale, widthScreen} from 'utils';
import ItemListAsset from './ItemListAsset';

interface Props {
  itemFocus: any;
  setItemFocus?: (e: any) => void;
}

const widthItem = widthScale(259);

function ListAssetHori({itemFocus, setItemFocus}: Props) {
  const productList = useAppSelector(state => getProductListSort(state));
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = React.useRef((res: any) => {
    onChangeItemFocus(res?.viewableItems?.[0].item);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const onChangeItemFocus = (res: any) => {
    setItemFocus && setItemFocus(res);
  };

  useEffect(() => {
    setItemFocus && setItemFocus(productList[0]);
    return () => {};
  }, [productList]);

  const keyExtractor = (item: any, index: number) => `key${item.id}${index}`;

  const renderItem = (p: {item: any; index: number}) => {
    const inputRange = [
      (p.index - 1) * widthItem,
      p.index * widthItem,
      (p.index + 1) * widthItem,
    ];
    const outputRange = [1, 1, 1];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange,
    });
    return <ItemListAsset scale={scale} data={p.item} />;
  };

  const ListHeaderComponent = () => {
    return <Div width={17} />;
  };

  const ListFooterComponent = () => {
    return <Div width={17} />;
  };
  const ItemSeparatorComponent = () => {
    return <Div width={20} />;
  };

  return (
    <Div marginTop={20}>
      <Animated.FlatList
        data={productList}
        extraData={productList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
        bouncesZoom={true}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={widthScale(259) + widthScale(20)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
      {/* <Div
        marginTop={25}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}>
        {productList?.map((item: any, index: number) => {
          const Arr = Math.floor(productList.length / 2);
          const InitArr = Array(Arr * 2 + 1)
            .fill(0)
            .map((item: any, i: number) => {
              return {
                input: widthItem * (index + i - Arr),
                output: i == Arr ? 1.5 : 1,
              };
            });
          const inputRange = InitArr.map(item => item.input);
          const outputRange = InitArr.map(item => item.output);
          const isFocus = itemFocus?.id == item?.id;
          const scale = scrollX.interpolate({
            inputRange,
            outputRange,
          });
          return (
            <Animated.View
              key={index}
              style={{
                backgroundColor: isFocus
                  ? Ecolors.mainColor
                  : Ecolors.grayColor,
                width: widthScale(10),
                height: widthScale(10),
                borderRadius: widthScale(10),
                marginHorizontal: widthScale(5),
                transform: [{scale: scale}],
              }}
            />
          );
        })}
      </Div> */}
    </Div>
  );
}

export default React.memo(ListAssetHori);
