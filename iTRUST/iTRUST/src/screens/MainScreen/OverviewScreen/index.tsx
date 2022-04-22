import {Button, Div, HeaderBack, ImageView, Label, NonData} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAsset, getProductList, loadAsset, loadBanner} from 'reducer/asset';
import {useAppSelector} from 'store/hooks';
import {convertNumber} from 'utils';
import Banner from './Banner';
import ChartPercentHeader from './ChartPercentHeader';
import ListAssetHori from './ListAssetHori';
import ListAssetVerti from './ListAssetVerti';

const Btn = (props: {isFocus: boolean; source: any; onPress: () => void}) => {
  return (
    <Button
      borderRadius={3}
      borderWidth={0.5}
      onPress={() => props.onPress()}
      borderColor={Ecolors.spaceColor}
      widthHeight={28}
      alignItems={'center'}
      justifyContent={'center'}>
      <ImageView
        source={props.source}
        width={20}
        height={16}
        resizeMode={'contain'}
        tintColor={props.isFocus ? Ecolors.textColor : Ecolors.grayColor}
      />
    </Button>
  );
};

function OverviewScreen() {
  const productList = useAppSelector(state => getProductList(state));
  const loadingProduct = useAppSelector(state => state.asset.loading);
  const asset = useAppSelector(state => getAsset(state));
  const dispatch = useDispatch();
  const [itemFocus, setItemFocus] = useState<any>({});
  const [listSwap, setListSwap] = useState<'hori' | 'verti'>('verti');

  useEffect(() => {
    dispatch(loadAsset({}));
    dispatch(loadBanner({}));
    return () => {};
  }, []);

  const onRefresh = () => {
    dispatch(loadAsset({}));
    dispatch(loadBanner({}));
  };

  const focus = (s: 'hori' | 'verti') => {
    setListSwap(s);
  };

  return (
    <Div screen={true} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={3} />
      <ScrollView
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={Ecolors.mainColor}
          />
        }>
        {!loadingProduct ? (
          <>
            {!loadingProduct && !productList.length ? (
              <NonData />
            ) : (
              <>
                <Div
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  justifyContent={'flex-start'}
                  paddingTop={16}
                  paddingHorizontal={30}>
                  <Label
                    size={14}>{`overviewscreen.tonggiatrithitruong`}</Label>
                  <Label
                    size={28}
                    color={Ecolors.mainColor}
                    multilanguage={false}
                    fontWeight={'700'}>
                    {convertNumber(Math.round(asset?.sumOfValueCurrently || 0))}
                  </Label>
                </Div>
                <ChartPercentHeader
                  itemFocus={itemFocus}
                  setItemFocus={setItemFocus}
                />
                <Div
                  paddingLeft={22}
                  paddingRight={25}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <Label fontWeight={'500'}>{`overviewscreen.taisan`}</Label>
                  <Div flexDirection={'row'} alignItems={'center'}>
                    <Btn
                      onPress={() => focus('hori')}
                      source={Icons.listhori}
                      isFocus={listSwap == 'hori'}
                    />
                    <Div width={4} />
                    <Btn
                      onPress={() => focus('verti')}
                      source={Icons.listverti}
                      isFocus={listSwap == 'verti'}
                    />
                  </Div>
                </Div>
                {listSwap == 'hori' ? (
                  <ListAssetHori
                    itemFocus={itemFocus}
                    setItemFocus={setItemFocus}
                  />
                ) : (
                  <ListAssetVerti
                    itemFocus={itemFocus}
                    setItemFocus={setItemFocus}
                  />
                )}
                <Banner />
                <Div height={120} />
              </>
            )}
          </>
        ) : (
          <Div />
        )}
      </ScrollView>
    </Div>
  );
}

export default React.memo(OverviewScreen);
