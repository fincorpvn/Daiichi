import {useFocusEffect} from '@react-navigation/core';
import {
  Button,
  Div,
  HeaderBack,
  ImageView,
  Input,
  InputItem,
  Label,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getListProduct, loadProduct} from 'reducer/investment';
import {useAppSelector} from 'store/hooks';
import {Log} from 'utils';
import ListInvestMent from './ListInvestMent';

function InvestmentScreen() {
  const dispatch = useDispatch();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [textFilter, setTextFilter] = useState<string>('');
  const inputRef = useRef<any>(null);
  const listProduct = useAppSelector(state => getListProduct(state));
  const debounceHandle = useRef<any>(null);
  const [data, setData] = useState<Array<any>>(listProduct);

  useFocusEffect(
    React.useCallback(() => {
      if (inputRef.current) {
        inputRef.current.clear();
        setTextFilter('');
      }
      return () => {};
    }, []),
  );

  useEffect(() => {
    dispatch(loadProduct({}));
    return () => {};
  }, []);

  useEffect(() => {
    controlDeboundHandle(textFilter);
    return () => {};
  }, [textFilter]);

  // useEffect(() => {
  //   setData([...listProduct]);
  //   return () => {};
  // }, [listProduct]);

  // useEffect(() => {
  //   if (!!textFilter.replace(/ /g, '')?.length) {
  //     const t = textFilter?.toLocaleLowerCase()?.replace(/ /g, '') || '';
  //     controlDeboundHandle(t);
  //   } else {
  //     setData([...listProduct]);
  //   }
  //   return () => {
  //     if (debounceHandle.current) {
  //       clearTimeout(debounceHandle.current);
  //     }
  //   };
  // }, [textFilter]);

  const controlDeboundHandle = (t: string) => {
    try {
      if (debounceHandle.current) {
        clearTimeout(debounceHandle.current);
      }
      debounceHandle.current = setTimeout(() => {
        dispatch(loadProduct({productCodeOrName: t}));
        // setData(
        //   [...listProduct].filter((a: any) => {
        //     const start = a.code.toLocaleLowerCase().replace(/ /g, '') || '';
        //     const end = t?.toLocaleLowerCase()?.replace(/ /g, '') || '';
        //     if (!t.length) {
        //       return true;
        //     }
        //     return start.includes(end);
        //   }),
        // );
      }, 300);
    } catch (error) {}
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack title={`investmentscreen.sanpham`} type={1}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          height={48}
          borderRadius={5}
          marginTop={12}
          borderWidth={0.8}
          overflow={'hidden'}
          borderColor={Ecolors.bordercolor}
          backgroundColor={Ecolors.whiteColor}
          marginHorizontal={16}>
          <Input
            flex={1}
            margin={0}
            paddingHorizontal={16}
            height={'100%'}
            width={'100%'}
            inputRef={inputRef}
            value={textFilter}
            autoCorrect={false}
            onChangeText={(t: string) => setTextFilter(t)}
            returnKeyType={'done'}
            placeholder={
              I18nState == 'vi' ? 'Tìm kiếm quỹ đầu tư' : 'Search fund'
            }
            placeholderTextColor={Ecolors.grayColor}
            keyboardType={'name-phone-pad'}
          />
          <Button
            widthHeight={48}
            alignItems={'center'}
            justifyContent={'center'}>
            <ImageView
              source={Icons.search}
              widthHeight={18}
              resizeMode={'contain'}
              tintColor={Ecolors.grayColor}
            />
          </Button>
        </Div>
      </HeaderBack>
      <ListInvestMent data={listProduct} />
    </Div>
  );
}

export default React.memo(InvestmentScreen);
