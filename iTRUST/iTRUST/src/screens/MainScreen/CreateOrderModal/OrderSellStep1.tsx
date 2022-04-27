import {
  Button,
  ButtonBorder,
  Div,
  Dropdown,
  ImageView,
  InputItem,
  Label,
  TimeFromNow,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {goBack, navigate} from 'services';
import {
  convertAmount,
  convertNav,
  convertNumber,
  convertPercent,
  convertTimestamp,
  Log,
} from 'utils';
import {useAppSelector} from 'store/hooks';

interface Props {
  product: any;
  setProduct: (e: any) => void;
  scheme: any;
  setScheme: (e: any) => void;
  currentSession: any;
  excuseTempVolumn: any;
  loading: boolean;
  bankSuperVisory: any;
  setCurrentSession: (e: any) => void;
  setListScheme: (e: any) => void;
  setBankSuperVisory: (e: any) => void;
  setExcuseTempVolumn: (e: any) => void;
  onChangeProduct: (e?: any) => void;
  onExcuseTempVolumn: (e?: any) => void;
  amount: string;
  listScheme: Array<any>;
  listProduct?: Array<any>;
  setAmount: (e: string) => void;
  onNext: () => void;
}

function RowSpaceItem(p: {
  marginTop?: number;
  children: any;
  isBorderBottom?: boolean;
}) {
  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}
        marginTop={p.marginTop ?? 0}>
        {p.children && p.children}
      </Div>
    </>
  );
}

function OrderSellStep1({
  product,
  listScheme,
  listProduct,
  scheme,
  setScheme,
  currentSession,
  excuseTempVolumn,
  amount,
  setAmount,
  onChangeProduct,
  onExcuseTempVolumn,
  onNext,
  loading,
}: Props) {
  const [loadingLocal, setLoadingLocal] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const onAccept = async () => {
    // check data null
    onNext && onNext();
    return;
    // try {
    //   setLoading(true);
    //   const res = await apiInvestment.bankSuperVisory({
    //     productId: product?.id || 0,
    //   });
    //   if (res.status == 200) {
    //     // setBankSuperVisory(res.data);
    //     onNext && onNext();
    //   }
    // } catch (error) {
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <Div screen={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div paddingHorizontal={16}>
          <Label marginTop={33}>{`createordermodal.chonsanpham`}</Label>
          <Dropdown
            marginTop={6}
            multiline={true}
            paddingHorizontal={0}
            initData={listProduct}
            value={product}
            content={`createordermodal.chonsanpham`}
            multilanguage={true}
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
            content={`createordermodal.chonchuongtrinh`}
            multilanguage={true}
            isActive={!!product && !!listScheme.length && !loading}
            onChange={e => {
              setScheme(e);
              setAmount('');
            }}
          />
          <Label marginTop={13}>{`createordermodal.nhapsoluongban`}</Label>
          <InputItem
            isInput={!!product && !!scheme}
            value={amount}
            onChangeText={(t: string) => {
              setAmount(convertAmount(t, true));
            }}
            keyboardType={'number-pad'}
            marginTop={6}
            marginHorizontal={0}
            onHandleChange={() => onExcuseTempVolumn()}
            renderButtonRight={() => {
              return (
                <Button
                  onPress={() => {
                    setAmount(
                      `${convertAmount(scheme?.volumeAvailable, true)}`,
                    );
                  }}
                  width={75}
                  height={29}
                  borderRadius={100}
                  backgroundColor={Ecolors.mainColor}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Label
                    size={14}
                    color={
                      Ecolors.whiteColor
                    }>{`createordermodal.tatca`}</Label>
                </Button>
              );
            }}
          />
          {!!scheme && (
            <>
              {!!scheme?.sellMin && (
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
                    }>{`createordermodal.soluongtoithieukhongduoi`}</Label>
                  <Label marginLeft={5} size={12} multilanguage={false}>
                    {convertNav(scheme?.sellMin, true)}
                  </Label>
                </Div>
              )}
              <Div
                marginTop={4}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}>
                <Label
                  marginLeft={5}
                  size={12}>{`createordermodal.soluongkhadung`}</Label>
                <Label marginLeft={5} size={12} multilanguage={false}>
                  {scheme?.volumeAvailable
                    ? convertNav(scheme?.volumeAvailable, true)
                    : '0.00'}
                </Label>
              </Div>
            </>
          )}

          {!!excuseTempVolumn && (
            <>
              <Div marginTop={17}>
                <Label>{`createordermodal.phiban`}</Label>
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
                      {convertNumber(Math.round(excuseTempVolumn?.totalFee))}
                    </Label>
                  </Div>
                  <Button
                    onPress={() => {
                      navigate('FeeTableModal', {
                        data: {
                          productId: product.id,
                          productProgramId: scheme.id,
                          url: 'product-program/sell-fee',
                          content: `createordermodal.bieuphiban`,
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
              {excuseTempVolumn?.details?.map((item: any, index: number) => {
                const {createAt, volumSell, feeRate, holdingDay} = item;
                return (
                  <Div
                    marginTop={14}
                    key={index}
                    borderRadius={5}
                    borderWidth={0.8}
                    borderColor={Ecolors.spaceColor}
                    paddingHorizontal={20}
                    paddingTop={12}
                    paddingBottom={15}>
                    <RowSpaceItem>
                      <Label size={14}>{`createordermodal.ngaymua`}</Label>
                      <Label size={14} multilanguage={false}>
                        {convertTimestamp(createAt, 'DD/MM/yyyy, HH:mm')}
                        {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                      </Label>
                    </RowSpaceItem>
                    <RowSpaceItem marginTop={10}>
                      <Label size={14}>{`createordermodal.tgnamgiu`}</Label>
                      <Label multilanguage={false} size={14}>{`${holdingDay} ${
                        I18nState == 'vi' ? 'ngày' : 'days'
                      }`}</Label>
                    </RowSpaceItem>
                    <RowSpaceItem marginTop={10}>
                      <Label size={14}>{`createordermodal.slban`}</Label>
                      <Label multilanguage={false} size={14}>
                        {convertNav(volumSell, true)}
                      </Label>
                    </RowSpaceItem>
                    <RowSpaceItem marginTop={10}>
                      <Label size={14}>{`createordermodal.phi`}</Label>
                      <Label size={14} multilanguage={false}>{`${convertPercent(
                        feeRate,
                      )}`}</Label>
                    </RowSpaceItem>
                  </Div>
                );
              })}
            </>
          )}

          {!!currentSession && (
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
                width={140}
                flexDirection={'column'}
                alignItems={'flex-start'}>
                <Label
                  size={12}
                  fontWeight={'700'}>{`createordermodal.phiengiaodich`}</Label>
                <Label marginTop={6} size={12} multilanguage={false}>
                  {currentSession.tradingTimeString}
                  {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                </Label>
                <TimeFromNow toTime={currentSession.closedOrderBookTime} />
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
                <Label
                  size={12}
                  fontWeight={
                    '700'
                  }>{`createordermodal.thoidiemdongsolenh`}</Label>
                <Label marginTop={6} size={12} multilanguage={false}>
                  {currentSession.closedOrderBookTimeString}
                  {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
                </Label>
                <Label
                  marginTop={12}
                  size={12}
                  fontWeight={'700'}>{`createordermodal.navccqkitruoc`}</Label>
                <Label marginTop={6} size={12} multilanguage={false}>
                  {convertNav(product?.navPre)}
                </Label>
              </Div>
            </Div>
          )}
        </Div>
        <Div height={100} />
      </ScrollView>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={29}
        marginTop={10}
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
      <Div height={200} />
    </Div>
  );
}

export default React.memo(OrderSellStep1);
