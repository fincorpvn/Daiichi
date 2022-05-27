import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Alert, Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getDataNav, getProductFocus} from 'reducer/investment';
import {useAppSelector} from 'store/hooks';
import {convertTimestamp, joinObjectCalendar, Log} from 'utils';

const currentDate = convertTimestamp(new Date().toString()).split('/');
const D = parseInt(currentDate[0]);
const M = parseInt(currentDate[1]);
const Y = parseInt(currentDate[2]);
const ArrayTime = [
  {
    title: 'YTD',
    cur: 0,
    date: joinObjectCalendar({
      date: 1,
      month: 1,
      year: Y,
    }),
    vi: `YTD`,
    en: `YTD`,
  },
  {
    title: 'investmentscreen.thang',
    cur: 1,
    date: joinObjectCalendar({
      date: D,
      month: M,
      year: Y - 1,
    }),
    vi: `1 năm`,
    en: `1 year`,
  },
  {
    title: 'investmentscreen.thang',
    cur: 3,
    date: joinObjectCalendar({
      date: D,
      month: M,
      year: Y - 3,
    }),
    vi: `3 năm`,
    en: `3 years`,
  },
  {
    title: 'investmentscreen.thang',
    cur: 5,
    date: joinObjectCalendar({
      date: D,
      month: M,
      year: Y - 5,
    }),
    vi: `5 năm`,
    en: `5 years`,
  },
];

function RowTime() {
  const dispatch = useDispatch();
  const productDetails = useAppSelector(state => getProductFocus(state));
  const [curForcus, setCurForcus] = useState(ArrayTime[1]);
  const I18nState = useAppSelector(state => state.languages.I18nState);

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
          {productDetails?.code}
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
                <Label
                  multilanguage={false}
                  size={14}
                  color={isFocus ? Ecolors.whiteColor : Ecolors.textColor}>
                  {I18nState == 'vi' ? item.vi : item.en}
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
