import {Alert, ButtonBorder, Div, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {goBack, navigate} from 'services';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {
  convertAmount,
  convertNav,
  convertNumber,
  convertTimestamp,
} from 'utils';

interface Props {
  product: any;
  scheme: any;
  amount: any;
  currentSession: any;
  excuseTempVolumn: any;
  bankSuperVisory: any;
  stepTimeLine?: number;
  onNext?: () => void;
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

function OrderSellStep2({
  product,
  scheme,
  amount,
  currentSession,
  excuseTempVolumn,
  bankSuperVisory,
  stepTimeLine,
  onNext,
}: Props) {
  const [loading, setLoading] = useState(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await apiInvestment.createSellOrder({
        amount: amount.replace(/[,]/g, '') || 0,
        closedBankNoteTime: currentSession?.closedBankNoteTime || 0,
        closedOrderBookTime: currentSession?.closedOrderBookTime || 0,
        closedOrderBookTimeString:
          currentSession?.closedOrderBookTimeString || '0',
        createdDate: new Date().getTime(),
        navCurrently: product?.navCurrently || 0, //
        productId: product?.id || 0,
        productName: product?.name || '',
        productProgramId: scheme?.id || 0,
        productSchemeCode: scheme?.productSchemeCode || '',
        productSchemeIsAutoBuy: scheme?.productSchemeIsAutoBuy || false,
        productSchemeNameEn: scheme?.productSchemeNameEn || '',
        tableFee: excuseTempVolumn?.details || [], //
        totalAmount: excuseTempVolumn?.totalAmount || 0, //
        totalFee: excuseTempVolumn?.totalFee || 0, //
        tradeCode: scheme?.tradeCode || '',
        tradingTime: currentSession?.tradingTime || 0,
        tradingTimeString: currentSession?.tradingTimeString || '',
        volume: amount.replace(/[,]/g, '') || 0, // 123123, //
        volumeAvailable: scheme?.volumeAvailable || 0, //
      });
      if (res.status == 200) {
        if (res.data.otpInfo) {
          navigate('OtpRequestModal', {
            data: {
              requestOnSendOtp: res.data.otpInfo,
              flowApp: 'CreateOrderSell',
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
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  if (stepTimeLine != 2) {
    return <Div screen={true} />;
  }
  return (
    <Div screen={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div paddingHorizontal={16}>
          <Label
            marginTop={33}
            fontWeight={'700'}>{`createordermodal.thongtindautu`}</Label>
          <Div
            width={'100%'}
            marginTop={9}
            borderRadius={8}
            borderWidth={0.8}
            borderColor={Ecolors.bordercolor}
            backgroundColor={Ecolors.whiteColor}
            style={EStyle.shadowItem}
            paddingHorizontal={20}
            paddingTop={20}
            paddingBottom={24}>
            <RowSpaceItem isBorderBottom={true}>
              <Label size={14}>{`createordermodal.quydautu`}</Label>
              <Div
                flex={1}
                flexDirection={'row'}
                alignItems={'center'}
                paddingLeft={10}
                justifyContent={'flex-end'}>
                <Label size={14} multilanguage={false}>
                  {I18nState == 'vi' ? product?.name : product?.nameEn || ''}
                </Label>
              </Div>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.chuongtrinh`}</Label>
              <Div
                flex={1}
                flexDirection={'row'}
                paddingLeft={10}
                alignItems={'center'}
                justifyContent={'flex-end'}>
                <Label multilanguage={false} size={14}>
                  {I18nState == 'vi'
                    ? scheme?.productSchemeName
                    : scheme?.productSchemeNameEn}
                </Label>
              </Div>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.loailenh`}</Label>
              <Label size={14}>{`createordermodal.ban`}</Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.ngaydatlenh`}</Label>
              <Label multilanguage={false} size={14}>
                {convertTimestamp(new Date().getTime(), 'DD/MM/yyyy, HH:mm')}
                {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.phiengiaodich`}</Label>
              <Label multilanguage={false} size={14}>
                {currentSession.tradingTimeString}
                {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15}>
              <Label size={14}>{`createordermodal.soluongban`}</Label>
              <Label multilanguage={false} size={14}>
                {convertAmount(amount, true)}
              </Label>
            </RowSpaceItem>
          </Div>

          <Label
            marginTop={18}
            fontWeight={
              '700'
            }>{`createordermodal.giatriuoctinhsauthuephi`}</Label>
          <Div
            width={344}
            height={64}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={8}
            borderColor={Ecolors.bordercolor}
            backgroundColor={Ecolors.whiteColor}
            style={EStyle.shadowItem}
            marginTop={16}
            borderWidth={0.8}>
            <Label size={24} fontWeight={'700'} multilanguage={false}>
              {convertNumber(Math.round(excuseTempVolumn?.totalAmount))}
            </Label>
          </Div>
        </Div>
        <Div height={100} />
      </ScrollView>
      <RowSpaceItem paddingHorizontal={29} marginTop={10}>
        <ButtonBorder
          width={148}
          height={48}
          type={2}
          onPress={() => {
            goBack();
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

export default React.memo(OrderSellStep2);
