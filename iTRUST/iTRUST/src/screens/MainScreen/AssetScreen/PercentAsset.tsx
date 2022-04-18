import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {getProductList} from 'reducer/asset';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {convertNumber} from 'utils';

function Item(p: {data: any; isBorderBottom?: boolean}) {
  const {color, code, holdingVolume, interestOrHole, programList} = p.data;
  const I18nState = useAppSelector(state => state.languages.I18nState);

  return (
    <>
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
              marginRight={8}
              widthHeight={11}
              borderRadius={11}
              backgroundColor={color}
            />
            <Label fontWeight={'700'} multilanguage={false}>
              {code}
            </Label>
          </Div>
          {/* hodl volumn */}
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            paddingLeft={19}
            justifyContent={'flex-start'}>
            <Label size={14}>{`assetscreen.sl`}</Label>
            <Label size={14} multilanguage={false}>
              {convertNumber(holdingVolume, true)}
              {` `}
            </Label>
            <Label size={14}>{`assetscreen.ccq`}</Label>
          </Div>
          {/* per price */}

          {/* <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            paddingLeft={19}>
            <ImageView
              width={6}
              height={12}
              resizeMode={'contain'}
              source={percentPrice < 0 ? Icons.pricedown : Icons.priceup}
            />
            <Label
              fontWeight={'500'}
              marginLeft={2}
              color={percentPrice < 0 ? Ecolors.redColor : Ecolors.greenColor}
              multilanguage={false}>{`${percentPrice} %`}</Label>
          </Div> */}
        </Div>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Button
            onPress={() => {
              navigate('CreateOrderModal', {
                orderType: 'BUY',
                initData: {
                  product: p.data,
                },
              });
            }}>
            <ImageView
              widthHeight={37}
              resizeMode={'contain'}
              source={Icons.buy}
            />
          </Button>
          <Button
            onPress={() => {
              navigate('CreateOrderModal', {
                orderType: 'SELL',
                initData: {
                  product: p.data,
                },
              });
            }}>
            <ImageView
              marginHorizontal={9}
              widthHeight={37}
              resizeMode={'contain'}
              source={Icons.sell}
            />
          </Button>
          <Button
            onPress={() => {
              navigate('CreateOrderModal', {
                orderType: 'TRANSFER',
                initData: {
                  product: p.data,
                },
              });
            }}>
            <ImageView
              widthHeight={37}
              resizeMode={'contain'}
              source={Icons.transfer}
            />
          </Button>
        </Div>
      </Div>
      {!!programList.length && (
        <Div paddingLeft={32} paddingRight={13}>
          <Label
            marginTop={11}
            size={14}
            fontWeight={'700'}>{`assetscreen.chuongtrinh`}</Label>
          {programList.map((i: any, index: number) => {
            return (
              <Button
                key={i.id}
                onPress={() => {
                  navigate('ProgramDetailsModal', {
                    data: i,
                  });
                }}
                paddingTop={10}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Label
                  size={14}
                  color={Ecolors.linkColor}
                  multilanguage={false}>
                  {I18nState == 'vi' ? i.name : i.nameEn}
                </Label>
                <Label size={14} multilanguage={false}>{`${convertNumber(
                  i.holdingVolume,
                  true,
                )} ${I18nState == 'vi' ? `CCQ` : 'Units'}`}</Label>
              </Button>
            );
          })}
        </Div>
      )}
      <Div height={15} />
      {p.isBorderBottom && (
        <Div width={'100%'} height={1} backgroundColor={Ecolors.grayColor} />
      )}
    </>
  );
}

function PercentAsset() {
  const productList = useAppSelector(state => getProductList(state));
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
        style={EStyle.shadowItem}
        backgroundColor={Ecolors.whiteColor}
        borderColor={Ecolors.grayColor}
        borderWidth={1}>
        {productList?.map((item: any, index: number) => {
          return (
            <Item
              key={item.id}
              data={item}
              isBorderBottom={index < productList.length - 1}
            />
          );
        })}
      </Div>
    </Div>
  );
}
export default React.memo(PercentAsset);