import React, {useEffect, useRef, useState} from 'react';
import {
  BottomSheetDialog,
  Button,
  ButtonBorder,
  Div,
  ImageView,
  Label,
} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import {goBack, navigate} from 'services';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {focusProduct, getListProduct} from 'reducer/investment';
import {useAppSelector} from 'store/hooks';
import {
  convertTimestamp,
  joinObjectCalendar,
  Log,
  reJoinObjectCalendar,
  widthScale,
  widthScreen,
} from 'utils';
import {useDispatch} from 'react-redux';
import {loadHistory} from 'reducer/transaction';
import {View, Platform} from 'react-native';
import {apiInvestment} from 'services/apis/apiInvestment';
import moment from 'moment';

function BtnAction(p: {
  isSelect?: boolean;
  title: string;
  onSelect: () => void;
}) {
  return (
    <Button
      onPress={() => p.onSelect && p.onSelect()}
      backgroundColor={p.isSelect ? Ecolors.mainColor : Ecolors.whiteColor}
      borderWidth={0.8}
      borderColor={Ecolors.mainColor}
      height={36}
      flexDirection={'row'}
      alignItems={'center'}
      borderRadius={50}
      marginTop={10}
      marginRight={10}
      justifyContent={'center'}
      paddingHorizontal={14}>
      <Label
        size={14}
        color={p.isSelect ? Ecolors.whiteColor : Ecolors.mainColor}>
        {p.title}
      </Label>
    </Button>
  );
}

function ButtonCalendar(p: {title?: string; onPress: () => void; value?: any}) {
  return (
    <Button
      width={143}
      onPress={() => p.onPress && p.onPress()}
      height={36}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={5}
      borderColor={Ecolors.bordercolor}
      paddingHorizontal={10}
      borderWidth={0.8}>
      <Label
        multilanguage={!p.value}
        size={14}
        // color={p.value ? Ecolors.textColor : Ecolors.grayColor}>
        color={Ecolors.textColor}>
        {!p.value ? p.title : convertTimestamp(p.value.getTime())}
      </Label>
      <ImageView
        heightWidth={17}
        source={Icons.calendar}
        resizeMode={'contain'}
      />
    </Button>
  );
}

const Arr = [
  {
    orderTypeId: 0,
    title: 'transactionscreen.tatca',
  },
  {
    orderTypeId: 1,
    title: 'transactionscreen.lenhmua',
  },
  {
    orderTypeId: 2,
    title: 'transactionscreen.lenhban',
  },
  {
    orderTypeId: 7,
    title: 'transactionscreen.lenhmuahoandoi',
  },
  {
    orderTypeId: 8,
    title: 'transactionscreen.lenhbanhoandoi',
  },
];

function FilterHistoryModal(props: {onBack?: () => void}) {
  const [listProduct, setProductList] = useState<any>([]);
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [orderTypeId, setOrderTypeId] = useState(0);
  const [productProgramId, setProductProgramId] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const value = useRef<'from' | 'to'>('from');
  const dispatch = useDispatch();
  const history = useAppSelector<any>(state => state.transaction.history);

  const pressBack = () => {
    if (props.onBack) {
      props.onBack();
      return;
    }
    goBack();
  };

  useEffect(() => {
    // investmentLoadScheme();
    bindData(history?.queries);
    return () => {};
    return () => {};
  }, [history?.queries]);

  const bindData = (t: any) => {
    setOrderTypeId(t?.orderTypeId || 0);
    if (t.fromDate) {
      setFromDate(new Date(moment(t.fromDate).utcOffset('+07:00')));
    }
    if (t.toDate) {
      setToDate(new Date(moment(t.toDate).utcOffset('+07:00')));
    }
  };

  const setProductFillter = (e: any, a: any) => {
    setCurrentIndex(a);
    setProductProgramId(e);
    console.log(e);
  };
  const onChange = (e: any, a: any) => {
    if (Platform.OS === 'android') {
      setIsShowCalendar(false);
    }
    if (a) {
      if (value.current == 'from') {
        setFromDate(a);
      } else {
        setToDate(a);
      }
    }
  };

  const onDeleteFilter = () => {
    dispatch(loadHistory({}));
    pressBack();
  };

  const onAcceptFilter = () => {
    let obj = {};
    if (productProgramId) {
      obj[`productProgramId`] = productProgramId;
    }
    if (orderTypeId) {
      obj[`orderTypeId`] = orderTypeId;
    }
    if (toDate) {
      obj[`toDate`] = joinObjectCalendar({
        date: toDate.getDate(),
        month: toDate.getMonth(),
        year: toDate.getFullYear(),
        isPicker: true,
      });
    }
    if (fromDate) {
      obj[`fromDate`] = joinObjectCalendar({
        date: fromDate.getDate(),
        month: fromDate.getMonth(),
        year: fromDate.getFullYear(),
        isPicker: true,
      });
    }
    dispatch(
      loadHistory({
        queries: obj,
        pagination: {
          currentPage: 1,
          itemsPerPage: 10,
        },
      }),
    );
    pressBack();
  };

  return (
    <Div screen={true} alignItems={'center'} justifyContent={'space-between'}>
      <Div height={100} />
      <Div
        width={337}
        minHeight={200}
        style={EStyle.shadow}
        borderRadius={5}
        backgroundColor={Ecolors.whiteColor}>
        {/* header */}
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottomWidth={1}
          borderBottomColor={Ecolors.spaceColor}>
          <Div heightWidth={46} />
          <Div
            flexDirection={'row'}
            flex={1}
            alignItems={'center'}
            justifyContent={'center'}>
            <Label fontWeight={'700'}>{`transactionscreen.locgiaodich`}</Label>
          </Div>
          <Button
            onPress={() => pressBack()}
            widthHeight={46}
            alignItems={'center'}
            justifyContent={'center'}>
            <ImageView
              source={Icons.close}
              widthHeight={20}
              resizeMode={'contain'}
            />
          </Button>
        </Div>
        {/* content */}
        <Div paddingHorizontal={20} paddingTop={18}>
          {/* <Label
            fontWeight={'700'}
            marginBottom={5}>{`createordermodal.chonsanpham`}</Label> */}
          {/* <Div paddingBottom={30}>
            {listProduct?.map((item: any, index: number) => {
              return (
                <Div>
                  <Button
                    onPress={() => setProductFillter(item?.id, index)}
                    flexDirection="column">
                    <Div flexDirection="row" alignItems="center">
                      {currentIndex != index ? (
                        <ImageView
                          source={Icons.unCheckPro}
                          widthHeight={20}
                          resizeMode={'contain'}
                        />
                      ) : (
                        <ImageView
                          source={Icons.checkPro}
                          widthHeight={20}
                          resizeMode={'contain'}
                        />
                      )}

                      <Label
                        size={14}
                        multilanguage={false}
                        marginHorizontal={15}
                        marginVertical={5}>
                        {I18nState == 'en' ? item.nameEn : item.name}
                      </Label>
                    </Div>
                  </Button>
                </Div>
              );
            })}
          </Div> */}
        </Div>
        <Div paddingHorizontal={20}>
          <Label
            fontWeight={
              '500'
            }>{`transactionscreen.theothoidiemgiaodich`}</Label>
          <Div
            paddingTop={8}
            paddingBottom={23}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <ButtonCalendar
              value={fromDate}
              onPress={() => {
                setIsShowCalendar(true);
                value.current = 'from';
              }}
              title={`transactionscreen.tungay`}
            />
            <ButtonCalendar
              value={toDate}
              onPress={() => {
                setIsShowCalendar(true);
                value.current = 'to';
              }}
              title={`transactionscreen.toingay`}
            />
          </Div>

          <Label fontWeight={'500'}>{`transactionscreen.theoloailenh`}</Label>
          <Div flexDirection={'row'} paddingBottom={37} flexWrap={'wrap'}>
            {Arr.map((item: any, index: number) => {
              return (
                <BtnAction
                  onSelect={() => setOrderTypeId(item.orderTypeId)}
                  title={item.title}
                  key={index}
                  isSelect={orderTypeId == item.orderTypeId}
                />
              );
            })}
          </Div>
        </Div>
        {/* footer */}
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderTopWidth={1}
          paddingHorizontal={10}
          paddingBottom={22}
          paddingTop={19}
          borderTopColor={Ecolors.spaceColor}>
          <ButtonBorder
            width={148}
            height={48}
            type={2}
            onPress={onDeleteFilter}
            title={`transactionscreen.huy`}
          />
          <ButtonBorder
            width={148}
            height={48}
            type={1}
            onPress={onAcceptFilter}
            title={`transactionscreen.apdung`}
          />
        </Div>
      </Div>
      <Div
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: widthScale(90),
          width: '100%',
          backgroundColor:
            Platform.OS === 'android'
              ? Ecolors.transparent
              : isShowCalendar
              ? Ecolors.spaceColor
              : Ecolors.transparent,
        }}>
        {Platform.OS === 'android'
          ? (isShowCalendar && (
              <RNDateTimePicker
                themeVariant="dark"
                display={'spinner'}
                textColor={'#000'}
                value={
                  value.current == 'from'
                    ? fromDate || new Date()
                    : toDate || new Date()
                }
                onChange={onChange}
              />
            )) || <></>
          : (isShowCalendar && (
              <>
                <Div
                  flexDirection={'row'}
                  alignItems={'center'}
                  backgroundColor={Ecolors.whiteColor}
                  justifyContent={'flex-end'}>
                  <Button
                    padding={10}
                    onPress={() => {
                      setIsShowCalendar(false);
                      if (value.current == 'from') {
                        if (!fromDate) {
                          setFromDate(new Date());
                        }
                      } else {
                        if (!toDate) {
                          setToDate(new Date());
                        }
                      }
                    }}>
                    <Label
                      fontWeight={'bold'}
                      color={Ecolors.linkColor}>{`alert.lichxong`}</Label>
                  </Button>
                </Div>
                <RNDateTimePicker
                  themeVariant="dark"
                  display={'spinner'}
                  textColor={'#000'}
                  value={
                    value.current == 'from'
                      ? fromDate || new Date()
                      : toDate || new Date()
                  }
                  onChange={onChange}
                />
              </>
            )) || <></>}
      </Div>
    </Div>
  );
}
export default React.memo(FilterHistoryModal);
