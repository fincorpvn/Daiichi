import {Button, Div, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React from 'react';
import {useDispatch} from 'react-redux';
import {focusProduct} from 'reducer/investment';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {
  convertNav,
  convertNumber,
  convertPercent,
  convertTimestamp,
  Log,
} from 'utils';
interface IData {
  name: string;
  nameEn: string;
  tradingDayOfNavCurrently: string;
  valuationdate: string;
  navPre: string | number;
  navCurrently: string | number;
  navPercent: string | number;
  id: string | number;
  color: string;
}
interface IProps {
  data: IData;
}
function ItemListInvestment({data}: IProps) {
  const dispatch = useDispatch();
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {
    name,
    id,
    color,
    tradingDayOfNavCurrently,
    valuationdate,
    navPercent,
    navCurrently,
    nameEn,
  } = data;
  return (
    <Button
      isScale={false}
      onPress={() => {
        dispatch(
          focusProduct({
            data,
          }),
        );
        navigate('InvestmentDetailsScreen');
      }}
      paddingVertical={16}
      paddingHorizontal={21}
      minHeight={100}
      marginHorizontal={16}
      borderRadius={8}
      borderColor={Ecolors.bordercolor}
      style={EStyle.shadowItem}
      backgroundColor={Ecolors.whiteColor}
      borderWidth={0.8}>
      <Label multilanguage={false} fontWeight={'700'}>
        {I18nState == 'vi' ? name : nameEn}
      </Label>
      <Div
        paddingTop={10}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Div>
          <Label size={14}>{`investmentscreen.thaydoisovoidaunam`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}>
            <Label size={14}>{`investmentscreen.taingay`}</Label>
            <Label multilanguage={false}>{` ${
              valuationdate || tradingDayOfNavCurrently || ''
            }`}</Label>
          </Div>
        </Div>
        <Div>
          <Label
            multilanguage={false}
            color={
              navPercent && navPercent < 0
                ? Ecolors.redColor
                : Ecolors.greenColor
            }
            size={18}
            fontWeight={'700'}>
            {navPercent >= 0 && '+'}
            {`${convertPercent(navPercent)}`}
          </Label>
        </Div>
      </Div>
      {/*       
      <Div
        marginTop={8}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Div
          flex={1}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}>
          <Label
            size={14}
            color={
              Ecolors.grayColor
            }>{`investmentscreen.giadonviquykytruoc`}</Label>
        </Div>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Label
            size={14}
            color={Ecolors.grayColor}>{`investmentscreen.ngay`}</Label>
          <Label size={14} multilanguage={false} color={Ecolors.grayColor}>
            {` ${tradingDayOfNavCurrently}`}
          </Label>
        </Div>
      </Div> */}
      {/* <Div
        marginTop={3}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Label
          multilanguage={false}
          color={Ecolors.linkColor}
          size={18}
          fontWeight={'700'}>
          {convertNav(navCurrently)}
        </Label>
        <Label
          color={navPercent < 0 ? Ecolors.redColor : Ecolors.greenColor}
          // color={color}
          multilanguage={false}
          size={18}
          fontWeight={'700'}>
          {navPercent >= 0 && '+'}
          {convertPercent(navPercent)}
        </Label>
      </Div> */}
    </Button>
  );
}

export default React.memo(ItemListInvestment);
