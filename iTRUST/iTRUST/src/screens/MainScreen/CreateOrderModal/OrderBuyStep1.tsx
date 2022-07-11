import {
  ButtonBorder,
  Div,
  Button,
  Dropdown,
  ImageView,
  InputItem,
  Label,
  TimeFromNow,
  Alert,
} from 'components';
import { Ecolors, EStyle, Icons } from 'constant';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { goBack, navigate } from 'services';
import { apiInvestment } from 'services/apis/apiInvestment';
import { useAppSelector } from 'store/hooks';
import {
  convertAmount,
  convertNumber,
  convertPercent,
  Log,
  widthScreen,
} from 'utils';

interface Props {
  product: any;
  setProduct: (e: any) => void;
  scheme: any;
  setScheme: (e: any) => void;
  currentSession: any;
  excuseTempVolumn: any;
  bankSuperVisory: any;
  setCurrentSession: (e: any) => void;
  setListScheme: (e: any) => void;
  setBankSuperVisory: (e: any) => void;
  setExcuseTempVolumn: (e: any) => void;
  onChangeProduct: (e?: any) => void;
  onExcuseTempVolumn: (e?: any) => void;
  amount: string;
  loading: boolean;
  beginBuyAutoStartDate: string;
  listScheme: Array<any>;
  listProduct: Array<any>;
  setAmount: (e: string) => void;
  setBeginBuyAutoStartDate: (e: string) => void;
  onNext: () => void;
}

function OrderBuyStep1({
  product,
  listScheme,
  listProduct,
  scheme,
  setScheme,
  currentSession,
  excuseTempVolumn,
  amount,
  setAmount,
  setBankSuperVisory,
  onChangeProduct,
  onExcuseTempVolumn,
  onNext,
  loading,
  beginBuyAutoStartDate,
  setBeginBuyAutoStartDate,
}: Props) {
  const [loadingLocal, setLoadingLocal] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const onAccept = async () => {
    // check data nulll
    try {
      setLoadingLocal(true);
      const res = await apiInvestment.bankSuperVisory({
        productId: scheme?.id || 0,
      });
      if (res.status == 200) {
        setBankSuperVisory(res.data);
        onNext && onNext();
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <Div
      style={{
        width: widthScreen,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div paddingHorizontal={16}>
          <Label marginTop={33}>{`createordermodal.chonsanpham`}</Label>
          <Dropdown
            multiline={true}
            marginTop={6}
            paddingHorizontal={0}
            initData={listProduct}
            value={product}
            multilanguage={true}
            content={`createordermodal.chonsanpham`}
            isActive={true}
            onChange={onChangeProduct}
          />
          <Label marginTop={13}>{`createordermodal.chonchuongtrinh`}</Label>
          <Dropdown
            multiline={true}
            marginTop={6}
            paddingHorizontal={0}
            initData={listScheme}
            value={scheme}
            multilanguage={true}
            content={`createordermodal.chonchuongtrinh`}
            isActive={!!product && !!listProduct.length && !loading}
            onChange={e => {
              setScheme(e);
              setAmount('');
            }}
          />
          <Label marginTop={13}>{`createordermodal.nhapsotienmua`}</Label>
          <InputItem
            isInput={!!product && !!scheme}
            value={amount}
            onChangeText={(e: string) => {
              if (!e.length) {
                setAmount(e);
                return;
              }
              const t: string = e[e.length ? e.length - 1 : 0];
              const reg = /^[0-9|.]*$/;
              if (reg.test(t)) {
                setAmount(convertAmount(`${e}`, true));
              }
            }}
            keyboardType={'phone-pad'}
            marginTop={6}
            marginHorizontal={0}
            onHandleChange={() => {
              onExcuseTempVolumn();
            }}
          />
          {!!scheme?.buyMinValue && !!scheme && (
            <Div
              marginTop={7}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}>
              <ImageView
                source={Icons.warningamount}
                widthHeight={16}
                resizeMode={'contain'}
              />
              <Label
                marginLeft={5}
                size={12}>{`createordermodal.sotiendaututoithieu`}</Label>
              <Label marginLeft={5} size={12} multilanguage={false}>
                {convertNumber(scheme?.buyMinValue)}
              </Label>
            </Div>
          )}
          {!!scheme?.minContinuousCycle && !!scheme && (
            <Div
              marginTop={7}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}>
              <ImageView
                source={Icons.warningamount}
                widthHeight={16}
                resizeMode={'contain'}
              />
              <Label
                marginLeft={5}
                size={
                  12
                }>{`createordermodal.thoigiandautulientuctoithieu`}</Label>
              <Label marginLeft={5} size={12} multilanguage={false}>
                {scheme?.minContinuousCycle}
              </Label>
              <Label marginLeft={5} size={12}>{`createordermodal.thang`}</Label>
            </Div>
          )}

          {!!excuseTempVolumn && (
            <Div marginTop={17}>
              <Label>{`createordermodal.phimua`}</Label>
              <Div
                marginTop={6}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}>
                <Div
                  width={207}
                  paddingLeft={21}
                  height={48}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  borderRadius={5}
                  borderWidth={0.8}
                  borderColor={Ecolors.bordercolor}
                  backgroundColor={Ecolors.spaceColor}>
                  <Label multilanguage={false}>
                    {convertNumber(Math.round(excuseTempVolumn?.fee))}
                  </Label>
                </Div>
                <Button
                  onPress={() => {
                    navigate('FeeTableModal', {
                      data: {
                        productId: product.id,
                        productProgramId: scheme.id,
                        url: 'product-program/buy-fee',
                        content: `createordermodal.bieuphimua`,
                      },
                    });
                  }}>
                  <Label
                    color={
                      Ecolors.linkColor
                    }>{`createordermodal.xembieuphi`}</Label>
                </Button>
              </Div>
            </Div>
          )}

          {!!currentSession && !scheme?.productSchemeIsAutoBuy && (
            <Div
              width={'100%'}
              marginTop={17}
              borderRadius={5}
              paddingHorizontal={16}
              paddingVertical={21}
              backgroundColor={Ecolors.bgtime}>
              <Div
                flexDirection={'row'}
                alignItems={'flex-start'}
                justifyContent={'space-between'}>
                <Div
                  flex={1}
                  flexDirection={'row'}
                  justifyContent={'flex-start'}>
                  <Label
                    textAlign={'center'}
                    size={12}
                    fontWeight={
                      '700'
                    }>{`createordermodal.thoidiemdongsolenh`}</Label>
                </Div>
                <Div flex={1} flexDirection={'row'} justifyContent={'flex-end'}>
                  <Label
                    size={12}
                    textAlign={'center'}
                    fontWeight={
                      '700'
                    }>{`createordermodal.thoidiemdongsolenhnhantien`}</Label>
                </Div>
              </Div>
              <Div
                marginTop={5}
                flexDirection={'row'}
                alignItems={'flex-start'}
                justifyContent={'space-between'}>
                <Div
                  flex={1}
                  flexDirection={'row'}
                  justifyContent={'flex-start'}>
                  <Label size={12} multilanguage={false}>
                    {currentSession?.closedOrderBookTimeString}
                    {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                  </Label>
                </Div>
                <Div flex={1} flexDirection={'row'} justifyContent={'flex-end'}>
                  <Label size={12} textAlign={'center'} multilanguage={false}>
                    {currentSession?.closedBankNoteTimeString}
                    {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                  </Label>
                </Div>
              </Div>
              <Div
                marginTop={5}
                flexDirection={'row'}
                alignItems={'flex-start'}
                justifyContent={'space-between'}>
                <Div flex={1} alignItems={'flex-start'}>
                  <Label
                    size={12}
                    textAlign={'center'}
                    fontWeight={
                      '700'
                    }>{`createordermodal.phiengiaodich`}</Label>
                  <Label marginTop={6} size={12} multilanguage={false}>
                    {currentSession?.tradingTimeString}
                    {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                  </Label>
                </Div>
                <Div
                  paddingLeft={17}
                  flex={1}
                  flexDirection={'row'}
                  justifyContent={'flex-end'}>
                  <TimeFromNow toTime={currentSession?.closedOrderBookTime} />
                </Div>
              </Div>
              <Div
                style={StyleSheet.absoluteFillObject}
                alignItems={'center'}
                paddingVertical={20}
                justifyContent={'center'}>
                <Div
                  width={3}
                  height={'100%'}
                  backgroundColor={Ecolors.grayColor}
                  borderRadius={10}
                />
              </Div>
            </Div>
          )}

          {/* {!!currentSession && !scheme?.productSchemeIsAutoBuy && (
            <Div
              width={'100%'}
              marginTop={17}
              borderRadius={5}
              paddingHorizontal={16}
              paddingVertical={21}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              backgroundColor={Ecolors.spaceColor}>
              <Div
                paddingRight={16}
                height={'100%'}
                flexDirection={'column'}
                alignItems={'flex-start'}>
                <Div height={40}>
                  <Label
                    textAlign={'center'}
                    size={12}
                    fontWeight={
                      '700'
                    }>{`createordermodal.thoidiemdongsolenh`}</Label>
                </Div>

                <Label marginTop={6} size={12} multilanguage={false}>
                  {currentSession.closedOrderBookTimeString}
                  {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                </Label>
                <Div
                  flexDirection={'row'}
                  justifyContent={'flex-start'}
                  height={40}>
                  <Label
                    size={12}
                    marginTop={13}
                    textAlign={'center'}
                    fontWeight={
                      '700'
                    }>{`createordermodal.phiengiaodich`}</Label>
                </Div>
                <Label marginTop={6} size={12} multilanguage={false}>
                  {currentSession.tradingTimeString}
                  {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                </Label>
              </Div>
              <Div
                width={3}
                height={'100%'}
                backgroundColor={Ecolors.grayColor}
                borderRadius={10}
              />
              <Div
                height={'100%'}
                paddingLeft={16}
                flex={1}
                flexDirection={'column'}
                alignItems={'flex-start'}>
                <Div height={40}>
                  <Label
                    size={12}
                    textAlign={'center'}
                    fontWeight={
                      '700'
                    }>{`createordermodal.thoidiemdongsolenhnhantien`}</Label>
                </Div>
                <Label
                  marginBottom={10}
                  marginTop={6}
                  size={12}
                  multilanguage={false}>
                  {currentSession.closedBankNoteTimeString}
                  {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                </Label>
                <TimeFromNow toTime={currentSession.closedOrderBookTime} />
              </Div>
            </Div>
          )} */}

          {scheme && scheme?.productSchemeIsAutoBuy && (
            <Div marginTop={17}>
              <Label
                marginTop={10}>{`createordermodal.ngaybatdauthamgia`}</Label>
              <InputItem
                isInput={!!product && !!scheme}
                value={beginBuyAutoStartDate}
                onChangeText={(t: string) => {
                  setBeginBuyAutoStartDate(parseInt(t) >= 31 ? `31` : t);
                }}
                maxLength={2}
                keyboardType={'number-pad'}
                marginTop={6}
                marginHorizontal={0}
                onHandleChange={() => {
                  // onExcuseTempVolumn();
                }}
              />
              <Div
                marginTop={7}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'flex-start'}>
                <ImageView
                  source={Icons.warningamount}
                  widthHeight={16}
                  resizeMode={'contain'}
                />
                <Label
                  marginLeft={5}
                  size={
                    12
                  }>{`createordermodal.tudongtaolenhdinhkyhangthang`}</Label>
              </Div>

              <Div
                borderWidth={0.7}
                paddingHorizontal={8}
                marginTop={17}
                flexDirection={'row'}
                borderColor={Ecolors.bordercolor}
                borderRadius={5}
                paddingVertical={15}>
                <Div
                  width={4}
                  marginRight={17}
                  borderRadius={5}
                  marginVertical={1}
                  backgroundColor={Ecolors.mainColor}
                />
                <Div flex={1}>
                  <Label size={12} multilanguage={false}>
                    {I18nState == 'vi'
                      ? `Chương trình ${scheme?.productSchemeNameEn} là chương trình đầu tư tự động và liên tục`
                      : `${scheme?.productSchemeNameEn ||
                      scheme?.productSchemeNameEn
                      } programme is an automatic and continuous investment program`}
                  </Label>
                  <Label marginTop={8} size={12} multilanguage={false}>
                    {I18nState == 'vi'
                      ? `Quý khách vui lòng chuyển tiền vào tài khoản đầu tư vào ngày ${beginBuyAutoStartDate || ''
                      } hàng tháng`
                      : `Please transfer money to your investment account on ${beginBuyAutoStartDate || ''
                      } monthly`}
                  </Label>
                  <Label marginTop={8} size={12} multilanguage={false}>
                    {I18nState == 'vi'
                      ? `Nhà đầu tư đăng ký tham gia Chương trình Đầu tư Định kỳ cho Quỹ mở do DFVN phát hành và quản lý thì cũng được áp dụng cho các Quỹ mở khác do DFVN phát hành và quản lý.`
                      : `Nhà đầu tư đăng ký tham gia Chương trình Đầu tư Định kỳ cho Quỹ mở do DFVN phát hành và quản lý thì cũng được áp dụng cho các Quỹ mở khác do DFVN phát hành và quản lý.`}
                  </Label>
                  <Label marginTop={8} size={12} multilanguage={false}>
                    {I18nState == 'vi'
                      ? `Đối với Chương trình Đầu tư Định kỳ: Nhà đầu tư không cần tạo lệnh mua mà chỉ thực hiện chuyển tiền vào tài khoản nhận tiền của Quỹ để thực hiện lệnh mua Định kỳ.`
                      : `Đối với Chương trình Đầu tư Định kỳ: Nhà đầu tư không cần tạo lệnh mua mà chỉ thực hiện chuyển tiền vào tài khoản nhận tiền của Quỹ để thực hiện lệnh mua Định kỳ.`}
                  </Label>
                </Div>
              </Div>
            </Div>
          )}
        </Div>
        <Div height={100} />
      </ScrollView>
      <Div
        flexDirection={'row'}
        marginBottom={200}
        alignItems={'center'}
        marginTop={10}
        paddingHorizontal={29}
        justifyContent={'space-between'}
        width={'100%'}>
        <ButtonBorder
          onPress={() => {
            goBack();
          }}
          width={148}
          height={48}
          title={`createordermodal.quaylai`}
          type={2}
        />
        <ButtonBorder
          isDisable={
            (scheme?.productSchemeIsAutoBuy && !beginBuyAutoStartDate) ||
            !product ||
            !scheme ||
            !amount ||
            !currentSession ||
            !excuseTempVolumn
          }
          loading={loading || loadingLocal}
          onPress={() => {
            onAccept();
          }}
          width={148}
          height={48}
          title={`createordermodal.xacnhan`}
          type={1}
        />
      </Div>
    </Div>
  );
}

export default React.memo(OrderBuyStep1);
