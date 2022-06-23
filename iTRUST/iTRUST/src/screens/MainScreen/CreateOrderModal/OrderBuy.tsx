import {Alert, ButtonBorder, Div} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {getListProduct} from 'reducer/investment';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {Log, widthScreen} from 'utils';
import OrderBuyStep1 from './OrderBuyStep1';
import OrderBuyStep2 from './OrderBuyStep2';
import OrderBuyStep3 from './OrderBuyStep3';

interface Props {
  setStepTimeLine: (a: number) => void;
  stepTimeLine?: number;
  initData?: any;
}

function OrderBuy({setStepTimeLine, stepTimeLine, initData}: Props) {
  // state order buy
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [product, setProduct] = useState<any>(null);
  const listProduct = useAppSelector(state => getListProduct(state));
  const [scheme, setScheme] = useState<any>(null);
  const [listScheme, setListScheme] = useState<Array<any>>([]);
  const [amount, setAmount] = useState<string>('');
  const [beginBuyAutoStartDate, setBeginBuyAutoStartDate] =
    useState<string>('');
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

  const onNext = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (stepTimeLine || 1) * widthScreen,
        animated: true,
      });
    }
  };
  const onPre = (step?: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: step
          ? (step - 1) * widthScreen
          : stepTimeLine
          ? (stepTimeLine - 2) * widthScreen
          : widthScreen,
        animated: true,
      });
    }
    if (step) {
      Promise.all([
        setProduct(null),
        setScheme(null),
        setExcuseTempVolumn(null),
        setAmount(''),
        setBeginBuyAutoStartDate(''),
      ]);
    }
  };

  const onScroll = (e: any) => {
    const offset = Math.round(e.nativeEvent.contentOffset.x / widthScreen) + 1;
    if (offset != stepTimeLine) {
      setStepTimeLine(offset);
    }
  };
  //

  const onExcuseTempVolumn = async () => {
    try {
      const res = await apiInvestment.excuseTempVolume({
        amount: amount.replace(/[,|.]/g, ''),
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
      const res = await apiInvestment.loadProductDetails({
        id: e.id,
      });
      const ses = await apiInvestment.checkOverCurrentSession({
        productId: e.id,
      });
      const aaa = await apiInvestment.loadBuy({
        id: e.id,
      });

      if (res.status == 200) {
        setListScheme(aaa.data);
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
        <OrderBuyStep1
          loading={loading}
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
          beginBuyAutoStartDate={beginBuyAutoStartDate}
          setBeginBuyAutoStartDate={setBeginBuyAutoStartDate}
          setAmount={setAmount}
          currentSession={currentSession}
          setCurrentSession={setCurrentSession}
          setExcuseTempVolumn={setExcuseTempVolumn}
          excuseTempVolumn={excuseTempVolumn}
          bankSuperVisory={bankSuperVisory}
          setBankSuperVisory={setBankSuperVisory}
        />
        <OrderBuyStep2
          stepTimeLine={stepTimeLine}
          onNext={onNext}
          onPre={onPre}
          product={product}
          beginBuyAutoStartDate={beginBuyAutoStartDate}
          scheme={scheme}
          amount={amount}
          currentSession={currentSession}
          excuseTempVolumn={excuseTempVolumn}
          bankSuperVisory={bankSuperVisory}
        />
        <OrderBuyStep3
          beginBuyAutoStartDate={beginBuyAutoStartDate}
          stepTimeLine={stepTimeLine}
          excuseTempVolumn={excuseTempVolumn}
          bankSuperVisory={bankSuperVisory}
          amount={amount}
          currentSession={currentSession}
          onPre={onPre}
          product={product}
          scheme={scheme}
        />
      </ScrollView>
    </Div>
  );
}

export default React.memo(OrderBuy);
