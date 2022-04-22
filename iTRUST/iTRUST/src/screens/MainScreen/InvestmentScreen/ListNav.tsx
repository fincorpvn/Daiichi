import {Div, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {getDataNavSelector} from 'reducer/investment/selector';
import {heightScale, Log} from 'utils';
import Chart from './Chart';
import ItemNav from './ItemNav';
import NavChange from './NavChange';
import RowTime from './RowTime';

const ITEM_HEIGHT = heightScale(55);

function ListNav(p: {}) {
  const flatlistRef = useRef<any>(null);
  const dataNav = useSelector((state: any) => getDataNavSelector(state));
  const [data, setData] = useState<any>([]);
  const [isSliceData, setIsSliceData] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSliceData(false);
    }, 300);
    return () => {};
  }, []);

  useEffect(() => {
    if (!!dataNav.length) {
      let r = [...dataNav].reverse();
      if (isSliceData) {
        setData(r.slice(0, 10) || []);
      } else {
        setData(r);
      }
    }
    return () => {};
  }, [dataNav, isSliceData]);

  const renderItem = useCallback((p: {item: any; index: number}) => {
    return <ItemNav item={p.item} />;
  }, []);

  const keyExtractor = (item: any, index: number) => `${item.id}`;

  const controlScrollview = useCallback((e: boolean) => {
    if (flatlistRef.current) {
      flatlistRef.current.setNativeProps({
        scrollEnabled: e,
      });
    }
  }, []);

  const ListHeaderComponent = useCallback(() => {
    return (
      <>
        <NavChange />
        <RowTime />
        <Chart controlScrollview={controlScrollview} />
        <Div paddingTop={16} paddingBottom={23} paddingLeft={16}>
          <Label
            fontWeight={
              '700'
            }>{`investmentscreen.danhsachphiengiaodich`}</Label>
        </Div>
      </>
    );
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return (
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}
        paddingHorizontal={15}>
        <Div width={344} height={1} backgroundColor={Ecolors.spaceColor} />
      </Div>
    );
  }, []);

  return (
    <FlatList
      ref={flatlistRef}
      data={data}
      extraData={data}
      removeClippedSubviews={Platform.OS === 'android'}
      initialNumToRender={10}
      windowSize={10}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={10}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

export default React.memo(ListNav);
