import {Alert, ButtonBorder, Div} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {getListProduct} from 'reducer/investment';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {widthScreen} from 'utils';
import OrderTransferStep1 from './OrderTransferStep1';
import OrderTransferStep2 from './OrderTransferStep2';
import OrderTransferStep3 from './OrderTransferStep3';

interface Props {
  setStepTimeLine: (a: number) => void;
  stepTimeLine?: number;
  initData?: any;
}

function OrderTransfer({setStepTimeLine, stepTimeLine, initData}: Props) {
  // state order buy
  const [product, setProduct] = useState<any>(null);
  // const listProduct = useAppSelector(state => getListProduct(state));
  const listProduct = useAppSelector(state => state.asset.asset.productList);
  const [scheme, setScheme] = useState<any>(null);
  const [listScheme, setListScheme] = useState<Array<any>>([]);
  const [amount, setAmount] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [excuseTempVolumn, setExcuseTempVolumn] = useState<any>(null);
  const [bankSuperVisory, setBankSuperVisory] = useState<any>(null);

  // dest
  const [destProduct, setDestProduct] = useState<any>(null);
  const [destScheme, setDestScheme] = useState<any>(null);
  const [listDestScheme, setListDestScheme] = useState<Array<any>>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDest, setLoadingDest] = useState<boolean>(false);
  // control header
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
    return;
    try {
      const res = await apiInvestment.investmentExcuseTempMoney({
        volume: amount,
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
      console.log('error', {
        error,
        volume: amount,
        productId: product?.id,
        productProgramId: scheme.id,
      });
      setExcuseTempVolumn(null);
      Alert.show({
        content: error.message,
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

  const onChangeDestProduct = async (e: any) => {
    setLoadingDest(true);
    setDestProduct(e);
    setDestScheme(null);
    const res = await apiInvestment.loadBuy({
      id: e.id,
    });
    if (res.status == 200) {
      setListDestScheme(res.data);
    }
    try {
    } catch (error) {
    } finally {
      setLoadingDest(false);
    }
  };

  return (
    <Div backgroundColor={Ecolors.whiteColor} width={'100%'}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        snapToAlignment={'start'}
        onScroll={onScroll}
        scrollEnabled={false}
        snapToInterval={widthScreen}>
        <OrderTransferStep1
          loading={loading}
          loadingDest={loadingDest}
          onNext={onNext}
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
          // dest
          destProduct={destProduct}
          onChangeDestProduct={onChangeDestProduct}
          destScheme={destScheme}
          setDestScheme={setDestScheme}
          listDestScheme={listDestScheme}
        />
        <OrderTransferStep2
          scheme={scheme}
          onNext={onNext}
          product={product}
          stepTimeLine={stepTimeLine}
          currentSession={currentSession}
          destScheme={destScheme}
          destProduct={destProduct}
          amount={amount}
        />
        <OrderTransferStep3
          destScheme={destScheme}
          destProduct={destProduct}
          amount={amount}
          stepTimeLine={stepTimeLine}
          scheme={scheme}
          product={product}
        />
      </ScrollView>
    </Div>
  );
}

export default React.memo(OrderTransfer);