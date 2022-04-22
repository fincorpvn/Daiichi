import {Button, Div, ImageView, LoadingIndicator} from 'components';
import {Ecolors} from 'constant';
import React, {useRef, useState} from 'react';
import {Animated, FlatList, Platform, StyleSheet} from 'react-native';
import {getListProduct} from 'reducer/investment';
import {navigate} from 'services';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {linkToWeb, Log, widthScale, widthScreen} from 'utils';

function Item(p: {item: any}) {
  const listProduct = useAppSelector(state => getListProduct(state));
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const onPress = async () => {
    setLoading(true);
    try {
      if (p.item.typeCode == 'INTERNAL') {
        const ob = JSON.parse(p.item.description);
        let product: any = null;
        let scheme: any = null;
        if (ob?.productCode) {
          product = listProduct.find((a: any) => a.code == ob.productCode);
        }
        if (product && ob?.productSchemeCode) {
          const res = await apiInvestment.loadProductDetails({
            id: product?.id || 0,
          });
          product = res.data;
          if (res.status == 200) {
            scheme = res.data.productPrograms.find(
              (a: any) => a.productSchemeCode == ob?.productSchemeCode,
            );
          }
        }
        navigate('CreateOrderModal', {
          orderType: 'BUY',
          initData: {
            product,
            scheme,
          },
        });
        return;
      }
      linkToWeb(I18nState == 'vi' ? p.item.description : p.item.descriptionEn);
      return;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      isScale={false}
      onPress={onPress}
      style={{
        width: widthScreen,
      }}
      alignItems={'center'}
      justifyContent={'center'}>
      {loading && (
        <Div
          style={StyleSheet.absoluteFillObject}
          width={'100%'}
          zIndex={999}
          elevation={999}
          alignItems={'center'}
          justifyContent={'center'}>
          <LoadingIndicator color={Ecolors.mainColor} size={10} numdot={5} />
        </Div>
      )}
      <ImageView
        width={326}
        height={143}
        resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
        borderRadius={10}
        source={{
          uri: I18nState == 'vi' ? p.item.url : p.item.urlEn || p.item.url,
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
