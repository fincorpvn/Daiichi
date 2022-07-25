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
    title: 'investmentscreen.thang',
    cur: 1,
    date: joinObjectCalendar({
      date: D,
      month: M > 1 ? M - 1 : 12 + M - 1,
      year: M > 1 ? Y : Y - 1,
    }),
    vi: `YTD`,
    en: `YTD`,
  },
  {
    title: 'investmentscreen.thang',
    cur: 3,
    date: joinObjectCalendar({
      date: D,
      month: M > 3 ? M - 3 : 12 + M - 3,
      year: M > 3 ? Y : Y - 1,
    }),
    vi: `1 năm`,
    en: `1 year`,
  },
  {
    title: 'investmentscreen.thang',
    cur: 6,
    date: joinObjectCalendar({
      date: D,
      month: M > 6 ? M - 6 : 12 + M - 6,
      year: M > 6 ? Y : Y - 1,
    }),
    vi: `3 năm`,
    en: `3 years`,
  },
  {
    title: 'investmentscreen.tatca',
    cur: 0,
    date: joinObjectCalendar({
      date: D,
      month: M > 1 ? M - 1 : 12 + M - 1,
      year: M > 1 ? Y : Y - 1,
    }),
    isAllData: true,
    vi: `5 năm`,
    en: `5 years`,
  },
];

function RowTime() {
  const dispatch = useDispatch();
  const productDetails = useAppSelector(state => getProductFocus(state));
  const [curForcus, setCurForcus] = useState(ArrayTime[3]);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  useEffect(() => {
    if (productDetails.id) {
      changeFocusTime(ArrayTime[3]);
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
                  {`${item.cur || ''} `}
                </Label>
                <Label
                  // multilanguage={false}
                  size={14}
                  color={isFocus ? Ecolors.whiteColor : Ecolors.textColor}>
                  {/* {I18nState == 'vi' ? item.vi : item.en} */}
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
