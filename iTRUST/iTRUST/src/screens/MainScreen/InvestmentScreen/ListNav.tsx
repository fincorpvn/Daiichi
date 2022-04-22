import {Button, Div, Label, LoadingIndicator} from 'components';
import {Ecolors} from 'constant';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {getDataNavSelector} from 'reducer/investment/selector';
import {getProductFocus} from 'reducer/investment';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {convertTimestamp, heightScale, joinObjectCalendar, Log} from 'utils';
import Chart from './Chart';
import ItemNav from './ItemNav';
import NavChange from './NavChange';
import RowTime from './RowTime';

const ITEM_HEIGHT = heightScale(55);
const currentDate = convertTimestamp(new Date().toString()).split('/');
const D = parseInt(currentDate[0]);
const M = parseInt(currentDate[1]);
const Y = parseInt(currentDate[2]);

function ListNav(p: {}) {
  const flatlistRef = useRef<any>(null);
  // const dataNav = useSelector((state: any) => getDataNavSelector(state));
  // const [isSliceData, setIsSliceData] = useState<boolean>(true);
  const productDetails = useAppSelector(state => getProductFocus(state));
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getDataNav(1);
    return () => {};
  }, [productDetails?.id]);

  const getDataNav = async (t: number) => {
    try {
      setLoading(true);
      const toDate = joinObjectCalendar({
        date: D,
        month: M,
        year: Y,
      });
      let fromDate = '';
      if (t == 1) {
        fromDate = joinObjectCalendar({
          date: D > 7 ? D - 7 : 23 + D,
          month: D > 7 ? M : M - 1,
          year: D < 7 && M == 1 ? Y - 1 : Y,
        });
      } else {
        fromDate = joinObjectCalendar({
          date: D,
          month: M,
          year: Y - 1,
        });
      }

      const r = await apiInvestment.loadnav({
        fromDate: fromDate,
        toDate: toDate,
        productId: productDetails.id,
        isAllData: 0,
      });
      if (r.status == 200) {
        setData(r.data.reverse());
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const renderItem = useCallback((p: {item: any; index: number}) => {
    return <ItemNav item={p.item} />;
  }, []);

  const keyExtractor = (item: any, index: number) => `${item.id}`;

  const ListHeaderComponent = useCallback(() => {
    return (
      <>
        <NavChange />
        <RowTime />
        <Chart />
        <Div
          paddingTop={16}
          paddingBottom={23}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingHorizontal={16}>
          <Label
            fontWeight={
              '700'
            }>{`investmentscreen.danhsachphiengiaodich`}</Label>
          {loading ? (
            <ActivityIndicator size={'small'} color={Ecolors.mainColor} />
          ) : (
            <Button
              onPress={() => {
                getDataNav(12);
              }}>
              <Label
                size={14}
                color={Ecolors.linkColor}>{`investmentscreen.tatca`}</Label>
            </Button>
          )}
        </Div>
      </>
    );
  }, [loading]);

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
