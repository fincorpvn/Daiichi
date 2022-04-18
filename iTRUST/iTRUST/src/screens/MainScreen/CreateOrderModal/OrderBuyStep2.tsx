import {Alert, Button, ButtonBorder, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {goBack, navigate} from 'services';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {convertNumber, convertTimestamp, copyToClipboard} from 'utils';

interface Props {
  product: any;
  scheme: any;
  amount: any;
  beginBuyAutoStartDate: any;
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

function ContentCoppy(p: {
  title: string;
  content: string;
  isBorderBottom?: boolean;
  marginTop?: number;
}) {
  return (
    <RowSpaceItem marginTop={p.marginTop} isBorderBottom={p.isBorderBottom}>
      <Div flex={1}>
        <Label color={Ecolors.grayColor} size={14}>
          {p.title}
        </Label>
        <Label marginTop={5} multilanguage={false} size={14}>
          {p.content}
        </Label>
      </Div>
      <Button
        onPress={() => {
          copyToClipboard(p.content);
        }}
        width={61}
        height={26}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={5}
        backgroundColor={Ecolors.yellowColor}>
        <Label size={14} multilanguage={false}>
          COPY
        </Label>
      </Button>
    </RowSpaceItem>
  );
}

function OrderBuyStep2({
  product,
  scheme,
  amount,
  currentSession,
  excuseTempVolumn,
  bankSuperVisory,
  stepTimeLine,
  beginBuyAutoStartDate,
  onNext,
}: Props) {
  // console.log('adasda', {
  //   product,
  //   scheme,
  //   amount,
  //   currentSession,
  //   excuseTempVolumn,
  //   bankSuperVisory,
  // });
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const currentUser = useAppSelector(state => state.authen.currentUser);

  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await apiInvestment.createBuyOrder({
        amount: amount.replace(/[,]/g, '') || 0,
        beginBuyAutoStartDate: parseInt(beginBuyAutoStartDate) || null,
        closedBankNoteTime: currentSession?.closedBankNoteTime || 0,
        closedOrderBookTime: currentSession?.closedOrderBookTime || 0,
        closedBankNoteTimeString:
          currentSession?.closedBankNoteTimeString || '0',
        closedOrderBookTimeString:
          currentSession?.closedOrderBookTimeString || '0',
        createdDate: new Date().getTime(),
        investmentNumber: excuseTempVolumn?.investmentNumber || '0',
        isBuyAuto: scheme.productSchemeIsAutoBuy ? 1 : 0 || 0,
        productId: product?.id || 0,
        productName: product?.name || '',
        productProgramId: scheme?.id || 0,
        productSchemeCode: scheme?.productSchemeCode || '',
        productSchemeIsAutoBuy: scheme?.productSchemeIsAutoBuy || false,
        productSchemeNameEn: scheme?.productSchemeNameEn || '',
        tradeCode: scheme?.tradeCode || '',
        tradingTime: currentSession?.tradingTime || 0,
        tradingTimeString: currentSession?.tradingTimeString || '',
      });
      if (res.status == 200) {
        if (res.data.otpInfo) {
          navigate('OtpRequestModal', {
            data: {
              requestOnSendOtp: res.data.otpInfo,
              flowApp: 'CreateOrderBuy',
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
              <Label size={14}>{`createordermodal.mua`}</Label>
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
              <Label size={14}>{`createordermodal.sotienmua`}</Label>
              <Label multilanguage={false} size={14}>
                {convertNumber(amount)}
              </Label>
            </RowSpaceItem>
          </Div>
          <Label
            fontWeight={'700'}
            marginTop={18}>{`createordermodal.phuongphapthanhtoan`}</Label>

          {/* thong tin chuyen khoan */}
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            marginTop={13}
            justifyContent={'flex-start'}>
            <Div
              widthHeight={20}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={20}
              borderWidth={0.8}
              marginRight={8}
              borderColor={Ecolors.mainColor}>
              <Div
                widthHeight={12}
                backgroundColor={Ecolors.mainColor}
                borderRadius={20}
              />
            </Div>
            <Label>{`createordermodal.chuyenkhoanquanganhang`}</Label>
          </Div>
          <Div
            paddingLeft={28}
            flexDirection={'row'}
            marginTop={8}
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'flex-start'}>
            <Label multilanguage={false}>
              <Label
                size={14}>{`createordermodal.vuilongchuyentientruoc`}</Label>
              <Label
                size={14}
                color={Ecolors.linkColor}
                multilanguage={false}
                marginLeft={3}>
                {` ${currentSession.closedBankNoteTimeString}`}
                {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
              </Label>
            </Label>
          </Div>
          <Label
            fontWeight={'700'}
            marginTop={18}>{`createordermodal.thongtinchuyenkhoan`}</Label>
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
            <ContentCoppy
              title={`createordermodal.tenthuhuong`}
              content={
                I18nState == 'vi'
                  ? bankSuperVisory?.name
                  : bankSuperVisory?.nameEn || bankSuperVisory?.name
              }
              isBorderBottom={true}
            />
            <ContentCoppy
              marginTop={11}
              title={`createordermodal.sotaikhoan`}
              content={bankSuperVisory?.number || ''}
              isBorderBottom={true}
            />
            <ContentCoppy
              marginTop={11}
              title={`createordermodal.nganhang`}
              content={
                I18nState == 'vi'
                  ? bankSuperVisory?.dataBank?.name
                  : bankSuperVisory?.dataBank?.nameEn || ''
              }
              isBorderBottom={true}
            />
            <ContentCoppy
              marginTop={11}
              isBorderBottom={!!scheme.productSchemeIsAutoBuy}
              title={`createordermodal.noidung`}
              // content={`${currentUser?.name || ''}-${
              //   excuseTempVolumn?.investmentNumber
              // }-${scheme?.tradeCode || ''}`}
              content={excuseTempVolumn?.investmentNumber || ''}
            />
            {scheme && scheme.productSchemeIsAutoBuy && (
              <>
                <RowSpaceItem marginTop={11}>
                  <Label
                    size={14}>{`createordermodal.tudongtieptucdautu`}</Label>
                  <Label multilanguage={false} size={14}>
                    {I18nState == 'vi' ? 'Có' : 'Yes'}
                  </Label>
                </RowSpaceItem>
                <RowSpaceItem marginTop={8}>
                  <Label
                    size={
                      14
                    }>{`createordermodal.ngaythanhtoanhangthang`}</Label>
                  <Label multilanguage={false} size={14}>
                    {beginBuyAutoStartDate || ''}
                  </Label>
                </RowSpaceItem>
              </>
            )}
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

export default React.memo(OrderBuyStep2);
