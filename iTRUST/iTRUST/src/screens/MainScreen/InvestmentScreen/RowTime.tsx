import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getDataNav, getProductFocus} from 'reducer/investment';
import {useAppSelector} from 'store/hooks';
import {joinObjectCalendar, Log} from 'utils';

const currentDate = new Date();
const D = currentDate.getDate();
const M = currentDate.getMonth() + 1;
const Y = currentDate.getFullYear();
const ArrayTime = [
  {
    title: 'investmentscreen.thang',
    cur: 1,
    date: joinObjectCalendar({
      date: D,
      month: M > 1 ? M - 1 : M + 11,
      year: M > 1 ? Y : Y - 1,
    }),
  },
  {
    title: 'investmentscreen.thang',
    cur: 3,
    date: joinObjectCalendar({
      date: D,
      month: M > 3 ? M - 3 : M + 9,
      year: M > 3 ? Y : Y - 1,
    }),
  },
  {
    title: 'investmentscreen.thang',
    cur: 6,
    date: joinObjectCalendar({
      date: D,
      month: M > 6 ? M - 6 : M + 6,
      year: M > 6 ? Y : Y - 1,
    }),
  },
  {
    title: 'investmentscreen.thang',
    cur: 12,
    date: joinObjectCalendar({
      date: D,
      month: M,
      year: Y - 1,
    }),
  },
];

function RowTime() {
  const dispatch = useDispatch();
  const productDetails = useAppSelector(state => getProductFocus(state));
  const [curForcus, setCurForcus] = useState(ArrayTime[1]);

  useEffect(() => {
    if (productDetails.id) {
      changeFocusTime(ArrayTime[1]);
    }
    return () => {};
  }, [productDetails.id]);

  const changeFocusTime = (i: any) => {
    const toDate = joinObjectCalendar({
      date: D,
      month: M,
      year: Y,
    });
    setCurForcus(i);
    dispatch(
      getDataNav({
        fromDate: i.date || toDate,
        toDate: toDate,
        productId: productDetails.id,
        isAllData: i.isAllData ? 1 : 0,
      }),
    );
  };

  return (
    <>
      <Div
        paddingVertical={17}
        paddingHorizontal={16}
        flexDirection={'row'}
        alignItems={'center'}>
        <Label fontWeight={'700'}>{`investmentscreen.tangtruongNAVCCQ`}</Label>
        <Label multilanguage={false} fontWeight={'700'}>
          {productDetails?.code || ''}
        </Label>
      </Div>
      <Div width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Div
          width={351}
          height={40}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          borderRadius={40}
          backgroundColor={Ecolors.disableColor}>
          {ArrayTime.map((item: any, index: number) => {
            const isFocus = curForcus?.cur == item?.cur;
            return (
              <Button
                key={index}
                onPress={() => {
                  changeFocusTime(item);
                }}
                width={84}
                flexDirection={'row'}
                height={34}
                borderRadius={40}
                alignItems={'center'}
                justifyContent={'center'}
                backgroundColor={
                  isFocus ? Ecolors.mainColor : Ecolors.transparent
                }>
                {!!item.cur && (
                  <Label
                    size={14}
                    multilanguage={false}
                    color={isFocus ? Ecolors.whiteColor : Ecolors.textColor}>
                    {`${item.cur} `}
                  </Label>
                )}

                <Label
                  size={14}
                  color={isFocus ? Ecolors.whiteColor : Ecolors.textColor}>
                  {item.title}
                </Label>
              </Button>
            );
          })}
        </Div>
      </Div>
    </>
  );
}

export default React.memo(RowTime);
