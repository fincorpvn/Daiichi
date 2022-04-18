import {ButtonBorder, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {goBack} from 'services';
import {useAppSelector} from 'store/hooks';
interface Props {
  product: any;
  amount: any;
  scheme: any;
  stepTimeLine?: number;
  destScheme: any;
  destProduct: any;
}

function RowSpaceItem(p: {
  marginTop?: number;
  paddingHorizontal?: number;
  children: any;
  isBorderBottom?: boolean;
}) {
  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        width={'100%'}
        justifyContent={'space-between'}
        marginTop={p.marginTop || 0}
        paddingHorizontal={p.paddingHorizontal || 0}>
        {p.children && p.children}
      </Div>
      {p.isBorderBottom && (
        <Div
          marginTop={15}
          width={'100%'}
          height={1}
          backgroundColor={Ecolors.spaceColor}
        />
      )}
    </>
  );
}

function PConvert(p: {product: any; scheme: any}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  return (
    <Div
      width={166}
      height={68}
      paddingLeft={22}
      flexDirection={'column'}
      alignItems={'flex-start'}
      justifyContent={'center'}
      borderRadius={8}
      borderWidth={1}
      borderColor={Ecolors.grayColor}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}>
      <Label size={14} multilanguage={false}>
        {p.product?.code}
      </Label>
      <Label size={14} multilanguage={false}>
        {I18nState == 'vi' ? p.scheme?.name : p.scheme?.nameEn}
      </Label>
    </Div>
  );
}

function OrderTransferStep3({
  product,
  stepTimeLine,
  amount,
  scheme,
  destScheme,
  destProduct,
}: Props) {
  if (stepTimeLine != 3) {
    return <Div screen={true} />;
  }
  return (
    <Div screen={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div
          width={'100%'}
          marginTop={27}
          paddingHorizontal={16}
          alignItems={'center'}
          justifyContent={'center'}>
          <ImageView
            source={Icons.createordersuccess}
            width={222}
            height={160}
            resizeMode={'contain'}
          />
          <Label
            size={18}
            fontWeight={'700'}
            marginTop={
              11
            }>{`createordermodal.datlenhchuyendoithanhcong`}</Label>
          <Label
            size={14}
            marginTop={2}>{`createordermodal.camonquykhach`}</Label>

          <RowSpaceItem marginTop={18}>
            <PConvert product={product} scheme={scheme} />
            <PConvert product={destProduct} scheme={destScheme} />
            <Div
              position={'absolute'}
              zIndex={999}
              elevation={999}
              style={StyleSheet.absoluteFillObject}
              alignItems={'center'}
              justifyContent={'center'}>
              <ImageView
                widthHeight={30}
                resizeMode={'contain'}
                source={Icons.swap}
              />
            </Div>
          </RowSpaceItem>
        </Div>
        <Div height={200} />
      </ScrollView>
      <RowSpaceItem paddingHorizontal={29} marginTop={43}>
        <ButtonBorder
          width={148}
          height={48}
          onPress={() => {
            goBack();
          }}
          title={`createordermodal.quaylai`}
          type={2}
        />
        <ButtonBorder
          width={148}
          onPress={() => {
            goBack();
          }}
          height={48}
          title={`createordermodal.hoantat`}
        />
      </RowSpaceItem>
      <Div height={200} />
    </Div>
  );
}

export default React.memo(OrderTransferStep3);
