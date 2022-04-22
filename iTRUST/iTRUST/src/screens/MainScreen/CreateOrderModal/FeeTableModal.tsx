import {useRoute} from '@react-navigation/core';
import {Button, Div, HeaderBack, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack} from 'services';
import {doGetAxios} from 'services/apis/axios';
import {useAppSelector} from 'store/hooks';
import {convertPercent, convertStringFeeSell, Log} from 'utils';

function FeeTableModal() {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const route = useRoute<any>();
  const insest = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      const url = `${route.params.data.url}/load?productId=${route.params.data.productId}&productProgramId=${route.params.data.productProgramId}`;
      setLoading(true);
      const res = await doGetAxios(url);
      if (res.status == 200) {
        setData(res.data);
      }
      Log('ress', res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const switchOrder = () => {
    switch (route.params.data.url) {
      case 'product-program/sell-fee':
        return (
          <Div paddingBottom={25}>
            <Div
              flexDirection={'row'}
              paddingTop={19}
              paddingBottom={11}
              borderBottomWidth={0.7}
              borderBottomColor={Ecolors.spaceColor}
              alignItems={'center'}
              justifyContent={'space-between'}
              marginHorizontal={17}>
              <Label
                fontWeight={'500'}
                size={14}>{`createordermodal.thoigiannamgiu`}</Label>
              <Label
                fontWeight={'500'}
                size={14}>{`createordermodal.phiban`}</Label>
            </Div>
            {data?.map((item: any, index: number) => {
              return (
                <Div
                  key={index}
                  width={'100%'}
                  paddingVertical={5}
                  alignItems={'center'}
                  paddingHorizontal={17}
                  flexDirection={'row'}
                  justifyContent={'space-between'}>
                  <Label size={14} multilanguage={false}>
                    {convertStringFeeSell({...item, I18nState: I18nState})}
                  </Label>
                  <Label size={14} multilanguage={false}>
                    {` ${convertPercent(item.rate)}`}{' '}
                  </Label>
                </Div>
              );
            })}
          </Div>
        );
      case 'product-program/buy-fee':
        return (
          <Div>
            {data?.map((item: any, index: number) => {
              return (
                <Div
                  key={index}
                  width={'100%'}
                  height={63}
                  alignItems={'center'}
                  flexDirection={'row'}
                  justifyContent={'center'}>
                  <Label>{`createordermodal.phimua`}</Label>
                  <Label multilanguage={false}>
                    {` ${convertPercent(item.rate)}`}{' '}
                  </Label>
                </Div>
              );
            })}
          </Div>
        );
      case 'product-program/switch-fee':
        return (
          <Div paddingBottom={25}>
            <Div
              flexDirection={'row'}
              paddingTop={19}
              paddingBottom={11}
              borderBottomWidth={0.7}
              borderBottomColor={Ecolors.spaceColor}
              alignItems={'center'}
              justifyContent={'space-between'}
              marginHorizontal={17}>
              <Label
                fontWeight={'500'}
                size={14}>{`createordermodal.thoigiannamgiu`}</Label>
              <Label
                fontWeight={'500'}
                size={14}>{`createordermodal.phichuyendoi`}</Label>
            </Div>
            {data?.map((item: any, index: number) => {
              return (
                <Div
                  key={index}
                  width={'100%'}
                  paddingVertical={5}
                  alignItems={'center'}
                  paddingHorizontal={17}
                  flexDirection={'row'}
                  justifyContent={'space-between'}>
                  <Label size={14} multilanguage={false}>
                    {convertStringFeeSell({...item, I18nState: I18nState})}
                  </Label>
                  <Label size={14} multilanguage={false}>
                    {` ${convertPercent(item.rate)}`}{' '}
                  </Label>
                </Div>
              );
            })}
          </Div>
        );
      default:
        return;
    }
  };

  return (
    <Button
      isScale={false}
      onPress={() => {
        goBack();
      }}>
      <Div
        height={'100%'}
        paddingTop={insest.top + 110}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        backgroundColor={Ecolors.transparentLoading}>
        <Div
          width={337}
          minHeight={100}
          backgroundColor={Ecolors.whiteColor}
          borderRadius={5}>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            height={47}
            borderBottomWidth={0.7}
            borderBottomColor={Ecolors.spaceColor}
            paddingLeft={20}
            justifyContent={'space-between'}>
            <Label fontWeight={'700'}>{route.params.data?.content}</Label>
            <Button
              onPress={() => {
                goBack();
              }}
              widthHeight={47}
              alignItems={'center'}
              justifyContent={'center'}>
              <ImageView
                widthHeight={18}
                resizeMode={'contain'}
                source={Icons.close}
              />
            </Button>
          </Div>
          {switchOrder()}
        </Div>
      </Div>
    </Button>
  );
}

export default React.memo(FeeTableModal);
