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
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Session from 'screens/MainScreen/CreateOrderModal/Session';
import {goBack, navigate} from 'services';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {
  convertStringVNTime,
  convertAmount,
  convertNumber,
  convertPercent,
  Log,
  widthScreen,
  parseMultilanguage,
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
              const reg = /^[0-9]*$/;
              if (reg.test(t)) {
                setAmount(convertAmount(`${e}`, true));
              }
            }}
            keyboardType={'decimal-pad'}
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
            <Session
              type={'buy'}
              currentSession={currentSession}
              scheme={scheme}
            />
          )}
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
                      ? `Ch????ng tr??nh ${scheme?.productSchemeNameEn} l?? ch????ng tr??nh ?????u t?? t??? ?????ng v?? li??n t???c`
                      : `${
                          scheme?.productSchemeNameEn ||
                          scheme?.productSchemeNameEn
                        } programme is an automatic and continuous investment program`}
                  </Label>
                  <Label marginTop={8} size={12} multilanguage={false}>
                    {I18nState == 'vi'
                      ? `Qu?? kh??ch vui l??ng chuy???n ti???n v??o t??i kho???n ?????u t?? v??o ng??y ${
                          beginBuyAutoStartDate || ''
                        } h??ng th??ng`
                      : `Please transfer money to your investment account on ${
                          beginBuyAutoStartDate || ''
                        } monthly`}
                  </Label>
                  <Label marginTop={8} size={12} multilanguage={false}>
                    {I18nState == 'vi'
                      ? `Nh?? ?????u t?? ????ng k?? tham gia Ch????ng tr??nh ?????u t?? ?????nh k??? cho Qu??? m??? do DFVN ph??t h??nh v?? qu???n l?? th?? c??ng ???????c ??p d???ng cho c??c Qu??? m??? kh??c do DFVN ph??t h??nh v?? qu???n l??.`
                      : `Nh?? ?????u t?? ????ng k?? tham gia Ch????ng tr??nh ?????u t?? ?????nh k??? cho Qu??? m??? do DFVN ph??t h??nh v?? qu???n l?? th?? c??ng ???????c ??p d???ng cho c??c Qu??? m??? kh??c do DFVN ph??t h??nh v?? qu???n l??.`}
                  </Label>
                  {/* <Label marginTop={8} size={12} multilanguage={false}>
                    {I18nState == 'vi'
                      ? `?????i v???i Ch????ng tr??nh ?????u t?? ?????nh k???: Nh?? ?????u t?? kh??ng c???n t???o l???nh mua m?? ch??? th???c hi???n chuy???n ti???n v??o t??i kho???n nh???n ti???n c???a Qu??? ????? th???c hi???n l???nh mua ?????nh k???.`
                      : `?????i v???i Ch????ng tr??nh ?????u t?? ?????nh k???: Nh?? ?????u t?? kh??ng c???n t???o l???nh mua m?? ch??? th???c hi???n chuy???n ti???n v??o t??i kho???n nh???n ti???n c???a Qu??? ????? th???c hi???n l???nh mua ?????nh k???.`}
                  </Label> */}
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
