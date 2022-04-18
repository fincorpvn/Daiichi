import {Alert, ButtonBorder, Div} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {getListProduct} from 'reducer/investment';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {Log, widthScreen} from 'utils';
import OrderSellStep1 from './OrderSellStep1';
import OrderSellStep2 from './OrderSellStep2';
import OrderSellStep3 from './OrderSellStep3';

interface Props {
  setStepTimeLine: (a: number) => void;
  stepTimeLine?: number;
  initData?: any;
}

function OrderSell({setStepTimeLine, stepTimeLine, initData}: Props) {
  // state order buy
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const [product, setProduct] = useState<any>(null);
  // const listProduct = useAppSelector(state => getListProduct(state));
  const listProduct = useAppSelector(state => state.asset.asset.productList);
  const [scheme, setScheme] = useState<any>(null);
  const [listScheme, setListScheme] = useState<Array<any>>([]);
  const [amount, setAmount] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [excuseTempVolumn, setExcuseTempVolumn] = useState<any>(null);
  const [bankSuperVisory, setBankSuperVisory] = useState<any>(null);

  // control header
  const [loading, setLoading] = useState<boolean>(false);

  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    if (initData?.product) {
      onChangeProduct(initData?.product);
    }
    if (initData?.scheme) {
      setScheme(initData?.scheme);
    }
    return () => {};
  }, [initData]);

  const onScroll = (e: any) => {
    const offset = Math.round(e.nativeEvent.contentOffset.x / widthScreen) + 1;
    if (offset != stepTimeLine) {
      setStepTimeLine(offset);
    }
  };

  const onNext = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (stepTimeLine || 1) * widthScreen,
        animated: true,
      });
    }
  };

  const onExcuseTempVolumn = async () => {
    try {
      const res = await apiInvestment.investmentExcuseTempMoney({
        volume: amount.replace(/[,]/g, ''),
        productId: product?.id,
        productProgramId: scheme.id,
      });
      if (res.status == 200) {
        setExcuseTempVolumn(res.data);
        return;
      }
      setExcuseTempVolumn(null);
      return;
    } catch (error: any) {
      setExcuseTempVolumn(null);
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
      });
    }
  };

  const onChangeProduct = async (e: any) => {
    setLoading(true);
    setProduct(e);
    setScheme(null);
    setAmount('');
    try {
      const productDetails = await apiInvestment.loadProductDetails({
        id: e.id,
      });

      const res = await apiInvestment.investmentLoadScheme({
        productId: e.id,
      });
      const ses = await apiInvestment.checkOverCurrentSession({
        productId: e.id,
      });

      Log('ressss', res);
      if (productDetails.status == 200) {
        setProduct(productDetails.data);
      }
      if (res.status == 200) {
        setListScheme(res.data);
      }
      if (ses.status == 200) {
        setCurrentSession(ses.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div backgroundColor={Ecolors.whiteColor} width={'100%'}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        scrollEnabled={false}
        snapToAlignment={'start'}
        onScroll={onScroll}
        snapToInterval={widthScreen}>
        <OrderSellStep1
          onNext={onNext}
          loading={loading}
          product={product}
          listScheme={listScheme}
          setListScheme={setListScheme}
          onExcuseTempVolumn={onExcuseTempVolumn}
          onChangeProduct={onChangeProduct}
          listProduct={listProduct}
          setProduct={setProduct}
          scheme={scheme}
          setScheme={setScheme}
          amount={amount}
          setAmount={setAmount}
          currentSession={currentSession}
          setCurrentSession={setCurrentSession}
          setExcuseTempVolumn={setExcuseTempVolumn}
          excuseTempVolumn={excuseTempVolumn}
          bankSuperVisory={bankSuperVisory}
          setBankSuperVisory={setBankSuperVisory}
        />
        <OrderSellStep2
          stepTimeLine={stepTimeLine}
          onNext={onNext}
          product={product}
          scheme={scheme}
          amount={amount}
          currentSession={currentSession}
          excuseTempVolumn={excuseTempVolumn}
          bankSuperVisory={bankSuperVisory}
        />
        <OrderSellStep3
          currentSession={currentSession}
          stepTimeLine={stepTimeLine}
          amount={amount}
          product={product}
          scheme={scheme}
        />
        {/* <OrderBuyStep2 /> */}
      </ScrollView>
    </Div>
  );
}

export default React.memo(OrderSell);
