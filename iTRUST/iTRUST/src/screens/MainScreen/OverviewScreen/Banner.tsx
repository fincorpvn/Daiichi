import {Button, Div, ImageView} from 'components';
import {Ecolors} from 'constant';
import React, {useRef, useState} from 'react';
import {Animated, FlatList, Platform} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {linkToWeb, widthScale, widthScreen} from 'utils';

function Item(p: {item: any}) {
  return (
    <Button
      isScale={false}
      onPress={() => {
        linkToWeb(p.item.description);
      }}
      style={{
        width: widthScreen,
      }}
      alignItems={'center'}
      justifyContent={'center'}>
      <ImageView
        width={326}
        height={143}
        resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
        borderRadius={10}
        source={{
          uri: p.item.url,
        }}
      />
    </Button>
  );
}

function Banner() {
  const banner = useAppSelector(state => state.asset.banner);
  const [itemFocus, setItemFocus] = useState<any>(banner[0] || null);
  const onViewableItemsChanged = React.useRef<any>((res: any) => {
    onChangeItemFocus(res?.viewableItems?.[0].item);
  });
  const scrollX = useRef<any>(new Animated.Value(0)).current;

  const onChangeItemFocus = (res: any) => {
    setItemFocus && setItemFocus(res);
  };
  const keyExtractor = (item: any, index: any) => `key${item.id}`;

  const renderItem = (p: {item: any; index: number}) => {
    return <Item item={p.item} />;
  };
  if (!banner?.length) {
    return <Div />;
  }
  return (
    <Div
      paddingTop={20}
      marginTop={20}
      paddingBottom={20}
      backgroundColor={'rgba(245,245,245,1)'}>
      <FlatList
        horizontal={true}
        data={banner}
        extraData={banner}
        onViewableItemsChanged={onViewableItemsChanged.current}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        snapToInterval={widthScreen}
        snapToAlignment={'start'}
      />
      <Div
        marginTop={25}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}>
        {banner?.map((item: any, index: number) => {
          const isFocus = itemFocus?.id == item?.id;
          return (
            <Div
              marginHorizontal={5}
              key={index}
              style={{
                backgroundColor: isFocus
                  ? Ecolors.mainColor
                  : Ecolors.grayColor,
                width: widthScale(10),
                height: widthScale(10),
                borderRadius: widthScale(10),
              }}
            />
          );
        })}
      </Div>
    </Div>
  );
}

export default React.memo(Banner);
