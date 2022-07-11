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
      <Div
        borderColor={Ecolors.bordercolorBox}
        borderWidth={1}
        borderRadius={8}
        marginTop={15}>
        <Div paddingHorizontal={15} paddingTop={17}>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Div
              flex={1}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-start'}>
              <Div
                marginRight={8}
                widthHeight={11}
                borderRadius={11}
                backgroundColor={color}
              />
              <Label fontWeight={'700'} multilanguage={false}>
                {code}
              </Label>
            </Div>
            <Button
              backgroundColor={Ecolors.spaceColor}
              borderRadius={20}
              paddingVertical={5}
              paddingHorizontal={10}
              flexDirection={'row'}
              onPress={() => {
                navigate('ListAssetDetailsModal', {
                  data: p.data,
                });
              }}
              alignItems={'center'}
              justifyContent={'center'}>
              <Label
                size={12}
                marginRight={4}
                fontWeight={'700'}>{`assetscreen.chitiet`}</Label>
              <ImageView
                widthHeight={10}
                resizeMode={'contain'}
                source={Icons.details}
              />
            </Button>
          </Div>
          {/* hodl volumn */}
          <Div
            width={'100%'}
            flexDirection={'row'}
            paddingHorizontal={7}
            alignItems={'center'}
            paddingTop={5}
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
              color={interestOrHole < 0 ? Ecolors.redColor : Ecolors.greenColor}
              size={14}
              multilanguage={false}>
              {` (${interestOrHole < 0 ? '' : '+'}${convertPercent(
                interestOrHole,
              )})`}
            </Label>
          </Div>
        </Div>
        {!!programList.length && (
          <Div paddingLeft={20} paddingRight={13}>
            <Label
              marginTop={5}
              size={14}
              color={Ecolors.grayColor}>{`assetscreen.chuongtrinh`}</Label>
            {programList.map((i: any, index: number) => {
              return (
                <Button
                  key={i.id}
                  marginTop={2}
                  onPress={() => {
                    // navigate('ProgramDetailsModal', {
                    //   data: i,
                    // });
                  }}
                  alignItems={'flex-start'}>
                  <Label
                    size={14}
                    color={Ecolors.linkColor}
                    multilanguage={false}>
                    {I18nState == 'vi' ? i.name : i.nameEn}
                  </Label>
                  <Label
                    marginTop={4}
                    size={14}
                    multilanguage={false}>{`${convertNumber(
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
              backgroundColor={item.color}></Div>
          );
        })}
      </Div>
      <Div
        flexDirection={'column'}
        marginHorizontal={16}
        borderRadius={8}
        marginTop={15}
        minHeight={200}>
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
