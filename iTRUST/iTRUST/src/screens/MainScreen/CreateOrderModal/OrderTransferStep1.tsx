import {
  Alert,
  Button,
  ButtonBorder,
  Div,
  Dropdown,
  ImageView,
  InputItem,
  Label,
} from 'components';
import {Ecolors, Icons} from 'constant';
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
  setProduct: (e: any) => void;
  scheme: any;
  loading: boolean;
  loadingDest: boolean;
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
  listScheme: Array<any>;
  listProduct: Array<any> | any;
  listProductDest: Array<any> | any;
  setAmount: (e: string) => void;
  onNext: () => void;
  //   dest
  destProduct?: any;
  destScheme?: any;
  setDestScheme?: (e: any) => void;
  onChangeDestProduct?: (e: any) => void;
  listDestScheme: Array<any>;
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

function OrderTransferStep1({
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
  //   dest
  destProduct,
  destScheme,
  listProductDest,
  onChangeDestProduct,
  listDestScheme,
  setDestScheme,
  loading,
  loadingDest,
}: Props) {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const [loadingLocal, setLoadingLocal] = useState<boolean>(false);

  const onAccept = async () => {
    try {
      setLoadingLocal(true);
      const res = await apiInvestment.switchCheck({
        productId: product?.id,
        destProductId: destProduct?.id,
        productProgramId: scheme.id,
        destProductProgramId: destScheme.id,
        volume: amount.replace(/[,]/g, ''),
      });
      if (res.status == 200) {
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
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <Div screen={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div
          width={'100%'}
          height={48}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingHorizontal={16}
          backgroundColor={'rgba(73, 85, 163, 0.1)'}>
          <Label
            fontWeight={'700'}>{`createordermodal.thongtinccqchuyendoi`}</Label>
          <Button
            onPress={() => {
              navigate('FeeTableModal', {
                data: {
                  productId: product?.id,
                  productProgramId: scheme?.id,
                  url: 'product-program/switch-fee',
                  content: `createordermodal.bieuphichuyendoi`,
                },
              });
            }}>
            <Label
              size={14}
              color={Ecolors.linkColor}>{`createordermodal.xembieuphi`}</Label>
          </Button>
        </Div>

        <Div paddingHorizontal={16}>
          <Label marginTop={33}>{`createordermodal.chonccqchuyendoi`}</Label>
          <Dropdown
            multiline={true}
            marginTop={6}
            paddingHorizontal={0}
            initData={listProduct}
            value={product}
            content={`createordermodal.chonccqchuyendoi`}
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
          {!!product && (
            <>
              <Label marginTop={13}>{`createordermodal.navkitruoc`}</Label>
              <InputItem
                isInput={false}
                value={convertNav(product?.navPre)}
                marginTop={6}
                marginHorizontal={0}
              />
            </>
          )}
          <Label marginTop={13}>{`createordermodal.soluongchuyendoi`}</Label>
          <InputItem
            isInput={!!product && !!scheme}
            value={amount}
            onChangeText={(t: string) => {
              setAmount(convertAmount(`${t}`, true));
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
              {!!scheme?.switchMin && (
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
                    {convertNav(scheme?.switchMin, true)}
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
        </Div>

        <Div
          width={'100%'}
          height={48}
          flexDirection={'row'}
          alignItems={'center'}
          marginTop={18}
          justifyContent={'space-between'}
          paddingHorizontal={16}
          backgroundColor={'rgba(73, 85, 163, 0.1)'}>
          <Label
            fontWeight={'700'}>{`createordermodal.thongtinccqmuctieu`}</Label>
        </Div>

        <Div paddingHorizontal={16}>
          <Label marginTop={17}>{`createordermodal.chonccqmuctieu`}</Label>
          <Dropdown
            multiline={true}
            marginTop={6}
            paddingHorizontal={0}
            initData={listProductDest}
            value={destProduct}
            content={`createordermodal.chonccqmuctieu`}
            multilanguage={true}
            isActive={true}
            onChange={onChangeDestProduct}
          />
          <Label marginTop={13}>{`createordermodal.chonchuongtrinh`}</Label>
          <Dropdown
            multiline={true}
            marginTop={6}
            paddingHorizontal={0}
            initData={listDestScheme}
            value={destScheme}
            content={`createordermodal.chonchuongtrinh`}
            multilanguage={true}
            isActive={!!destProduct && !!listDestScheme.length && !loadingDest}
            onChange={e => {
              setDestScheme && setDestScheme(e);
            }}
          />
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
            !excuseTempVolumn ||
            !destProduct ||
            !destScheme
          }
          loading={loadingLocal}
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

export default React.memo(OrderTransferStep1);
