import {Div, Label, TimeFromNow} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {convertNav, convertStringVNTime} from 'utils';

function Session(p: {
  currentSession: any;
  scheme?: any;
  product?: any;
  type: 'buy' | 'sell' | 'transfer';
}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {currentSession, scheme, type, product} = p;
  if (type == 'buy') {
    return (
      <Div
        backgroundColor={Ecolors.bgtime}
        marginTop={17}
        width={343}
        paddingVertical={21}
        flexDirection={'row'}
        borderRadius={5}>
        <Div width={139} flexDirection={'column'} alignItems={'center'}>
          <Div height={60}>
            <Label
              textAlign={'center'}
              size={12}
              marginHorizontal={10}
              fontWeight={'700'}>{`createordermodal.thoidiemdongsolenh`}</Label>
          </Div>
          <Label marginBottom={10} size={12} multilanguage={false}>
            {currentSession?.closedOrderBookTimeString}
            {convertStringVNTime(I18nState)}
          </Label>
          <Label
            size={12}
            textAlign={'center'}
            fontWeight={'700'}>{`createordermodal.phiengiaodich`}</Label>
          <Label marginTop={6} size={12} multilanguage={false}>
            {currentSession?.tradingTimeString}
            {convertStringVNTime(I18nState)}
          </Label>
        </Div>
        <Div
          width={3}
          flex={1}
          backgroundColor={Ecolors.grayColor}
          borderRadius={10}
        />
        <Div width={201} alignItems={'center'}>
          <Div height={60}>
            <Label
              textAlign={'center'}
              size={12}
              marginHorizontal={20}
              fontWeight={
                '700'
              }>{`createordermodal.thoidiemdongsolenhnhantien`}</Label>
          </Div>
          <Label
            marginBottom={10}
            size={12}
            textAlign={'center'}
            multilanguage={false}>
            {currentSession?.closedBankNoteTimeString}
            {convertStringVNTime(I18nState)}
          </Label>
          <TimeFromNow toTime={currentSession?.closedOrderBookTime} />
        </Div>
      </Div>
    );
  }
  if (type == 'sell') {
    return (
      <Div
        backgroundColor={Ecolors.bgtime}
        marginTop={17}
        width={343}
        paddingVertical={21}
        flexDirection={'row'}
        borderRadius={5}>
        <Div width={190} alignItems={'center'}>
          <Label
            size={12}
            textAlign={'center'}
            marginBottom={5}
            fontWeight={'700'}>{`createordermodal.phiengiaodich`}</Label>
          <Label marginBottom={10} size={12} multilanguage={false}>
            {currentSession.tradingTimeString}
            {convertStringVNTime(I18nState)}
          </Label>
          <TimeFromNow toTime={currentSession.closedOrderBookTime} />
        </Div>
        <Div
          width={3}
          flex={1}
          backgroundColor={Ecolors.grayColor}
          borderRadius={10}
        />
        <Div width={150} alignItems={'center'}>
          <Label
            marginBottom={5}
            textAlign={'center'}
            size={12}
            fontWeight={'700'}>{`createordermodal.thoidiemdongsolenh`}</Label>
          <Label marginBottom={10} size={12} multilanguage={false}>
            {currentSession.closedOrderBookTimeString}
            {convertStringVNTime(I18nState)}
          </Label>
          <Label
            size={12}
            marginBottom={5}
            fontWeight={'700'}>{`createordermodal.navccqkitruoc`}</Label>
          <Label size={12} multilanguage={false}>
            {convertNav(product?.navCurrently)}
          </Label>
        </Div>
      </Div>
    );
  }
  return (
    <TimeFromNow isHidden={true} toTime={currentSession?.closedOrderBookTime} />
  );
}

export default React.memo(Session);
