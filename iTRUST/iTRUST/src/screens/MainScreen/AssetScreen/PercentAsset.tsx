import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {getProductList, getProductListSort} from 'reducer/asset';
import RowButtonToCreateOrder from 'screens/MainScreen/AssetScreen/RowButtonToCreateOrder';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {
  checkApproveInvestmentProfile,
  convertNav,
  convertNumber,
  convertPercent,
} from 'utils';

function Item(p: {data: any; isSpaceBottom?: boolean}) {
  const {color, code, interestOrHole, programList, sumOfValueNavCurrent} =
    p.data;
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);

  const I18nState = useAppSelector(state => state.languages.I18nState);
  return (
    <>
      <Div borderRadius={8} borderColor={Ecolors.bordercolor} borderWidth={0.8}>
        <Div
          flexDirection={'row'}
          paddingHorizontal={13}
          paddingTop={17}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Div
            flex={1}
            height={'100%'}
            flexDirection={'column'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}>
            {/* header */}
            <Div
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-start'}>
              <Div
                marginLeft={7}
                marginBottom={3}
                marginRight={8}
                widthHeight={11}
                borderRadius={11}
                backgroundColor={color}
              />
              <Div flex={1}>
                <Label fontWeight={'700'} multilanguage={false}>
                  {code}
                </Label>
              </Div>
            </Div>
            {/* hodl volumn */}
            <Div
              width={'100%'}
              flexDirection={'row'}
              paddingHorizontal={7}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`assetscreen.giatrihientai`}</Label>
              <Label
                color={Ecolors.grayColor}
                size={14}>{`assetscreen.loilo`}</Label>
            </Div>
            <Div
              marginTop={3}
              width={'100%'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              paddingHorizontal={7}>
              <Label size={14} multilanguage={false}>
                {convertNumber(Math.round(sumOfValueNavCurrent))}
              </Label>
              <Label
                color={
                  interestOrHole < 0 ? Ecolors.redColor : Ecolors.greenColor
                }
                size={14}
                multilanguage={false}>
                {` (${interestOrHole < 0 ? '' : '+'}${convertPercent(
                  interestOrHole,
                )})`}
              </Label>
            </Div>
          </Div>
        </Div>
        {!!programList.length && (
          <Div paddingLeft={20} paddingRight={13}>
            <Label
              marginTop={11}
              size={14}
              color={Ecolors.grayColor}
              fontWeight={'700'}>{`assetscreen.chuongtrinh`}</Label>
            {programList.map((i: any, index: number) => {
              return (
                <Button
                  key={i.id}
                  onPress={() => {
                    // navigate('ProgramDetailsModal', {
                    //   data: i,
                    // });
                  }}
                  paddingTop={10}
                  alignItems={'flex-start'}>
                  <Label
                    size={14}
                    color={Ecolors.linkColor}
                    multilanguage={false}>
                    {I18nState == 'vi' ? i.name : i.nameEn}
                  </Label>
                  <Label size={14} multilanguage={false}>{`${convertNumber(
                    Math.round(i.sumOfValueNavCurrent),
                  )}`}</Label>
                </Button>
              );
            })}
          </Div>
        )}
        <RowButtonToCreateOrder data={p.data} />
        <Div height={15} />
        {/* <Div height={15} />
      {p.isBorderBottom && (
        <Div width={'100%'} height={1} backgroundColor={Ecolors.grayColor} />
      )} */}
      </Div>
      {p.isSpaceBottom && <Div height={15} />}
    </>
  );
}

function PercentAsset() {
  const productList = useAppSelector(state => getProductListSort(state));
  if (productList?.length == 0) {
    return <Div />;
  }
  return (
    <Div>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        borderRadius={5}
        justifyContent={'space-between'}
        overflow={'hidden'}
        marginHorizontal={16}
        marginTop={11}>
        {productList?.map((item: any, index: number) => {
          const percent = Math.round(item.ratePercent * 100) / 100;
          return (
            <Div
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              key={index}
              width={`${percent}%`}
              height={26}
              backgroundColor={item.color}>
              {/* <Label
                fontWeight={'700'}
                color={Ecolors.whiteColor}
                multilanguage={false}>{`${percent}%`}</Label> */}
            </Div>
          );
        })}
      </Div>
      <Div
        flexDirection={'column'}
        marginHorizontal={16}
        borderRadius={8}
        marginTop={15}
        minHeight={200}
        // style={EStyle.shadowItem}
        // backgroundColor={Ecolors.whiteColor}
        // borderColor={Ecolors.bordercolor}
        // borderWidth={0.8}
      >
        {productList?.map((item: any, index: number) => {
          return (
            <Item
              key={item.id}
              data={item}
              isSpaceBottom={index < productList.length - 1}
            />
          );
        })}
      </Div>
    </Div>
  );
}
export default React.memo(PercentAsset);
