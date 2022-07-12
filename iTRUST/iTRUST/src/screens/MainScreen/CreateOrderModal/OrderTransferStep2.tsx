import {ButtonBorder, Div, ImageView, Label, Alert} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {goBack, navigate} from 'services';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {
  converStringVNTime,
  convertAmount,
  convertNav,
  convertTimestamp,
} from 'utils';

interface Props {
  product: any;
  scheme: any;
  destProduct: any;
  destScheme: any;
  amount: any;
  stepTimeLine: any;
  currentSession: any;
  onNext: () => void;
  onPre: () => void;
}

function RowSpaceItem(p: {
  marginTop?: number;
  paddingHorizontal?: number;
  children?: any;
  isBorderBottom?: boolean;
}) {
  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={p.marginTop ?? 0}
        paddingHorizontal={p.paddingHorizontal ?? 0}>
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
      borderWidth={0.8}
      borderColor={Ecolors.bordercolor}
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

function OrderTransferStep2({
  product,
  scheme,
  destProduct,
  destScheme,
  amount,
  stepTimeLine,
  onPre,
  onNext,
  currentSession,
}: Props) {
  const [loading, setLoading] = useState(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await apiInvestment.switchCreate({
        amount: amount.replace(/[,]/g, ''),
        closedOrderBookTime: currentSession?.closedOrderBookTime || 0,
        closedOrderBookTimeString:
          currentSession?.closedOrderBookTimeString || '0',
        createdDate: new Date().getTime(),
        destProductId: destProduct?.id || 0,
        destProductProgramId: destScheme?.id || 0,
        productCode: product?.code || '',
        productId: product?.id || 0,
        productProgramId: scheme?.id || 0,
        productProgramCode: scheme?.productSchemeCode || '',
        tradingTime: currentSession?.tradingTime || 0,
        tradingTimeString: currentSession?.tradingTimeString || '',
        volume: amount.replace(/[,]/g, '') || '',
        transferProductCode: destProduct?.code || '',
        transferProductProgramCode: destScheme?.productSchemeCode || '',
      });
      // console.log('resss', res);
      if (res.status == 200) {
        if (res.data.otpInfo) {
          navigate('OtpRequestModal', {
            data: {
              requestOnSendOtp: res.data.otpInfo,
              flowApp: 'CreateOrderTransfer',
            },
            onConfirm: () => {
              onNext && onNext();
            },
          });
          return;
        }
        onNext && onNext();
        return;
      }
      Alert.showError({
        content: I18nState == 'vi' ? res.message : res.messageEn,
        multilanguage: false,
      });
      return;
    } catch (error: any) {
      // console.log('error', error);
      Alert.show({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
      });
      return;
    } finally {
      setLoading(false);
    }
  };
  // console.log('312312', {
  //   product,
  //   scheme,
  //   destProduct,
  //   destScheme,
  //   amount,
  // });
  if (stepTimeLine != 2) {
    return <Div screen={true} />;
  }
  return (
    <Div screen={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div paddingHorizontal={16}>
          <Label
            marginTop={14}
            fontWeight={'700'}>{`createordermodal.thongtinchuyendoi`}</Label>
          <Div
            marginTop={9}
            width={'100%'}
            paddingHorizontal={20}
            paddingTop={20}
            paddingBottom={28}
            borderRadius={5}
            borderColor={Ecolors.bordercolor}
            backgroundColor={Ecolors.whiteColor}
            style={EStyle.shadowItem}
            borderWidth={0.8}>
            <RowSpaceItem isBorderBottom={true}>
              <Label size={14}>{`createordermodal.loailenh`}</Label>
              <Label size={14}>{`createordermodal.chuyendoi`}</Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.ngaydatlenh`}</Label>
              <Label size={14} multilanguage={false}>
                {convertTimestamp(new Date().getTime(), 'DD/MM/yyyy, HH:mm')}
                {converStringVNTime(I18nState)}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15}>
              <Label size={14}>{`createordermodal.soluongchuyendoi`}</Label>
              <Label size={14} multilanguage={false}>
                {convertAmount(amount, true)}
              </Label>
            </RowSpaceItem>
          </Div>
          <RowSpaceItem marginTop={16}>
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
                tintColor={Ecolors.mainColor}
              />
            </Div>
          </RowSpaceItem>
        </Div>
        <Div height={100} />
      </ScrollView>
      <RowSpaceItem paddingHorizontal={29} marginTop={10}>
        <ButtonBorder
          width={148}
          height={48}
          type={2}
          onPress={() => {
            onPre && onPre();
          }}
          title={`createordermodal.quaylai`}
        />
        <ButtonBorder
          width={148}
          loading={loading}
          onPress={() => {
            onConfirm();
          }}
          height={48}
          title={`createordermodal.xacnhan`}
        />
      </RowSpaceItem>
      <Div height={200} />
    </Div>
  );
}

export default React.memo(OrderTransferStep2);
