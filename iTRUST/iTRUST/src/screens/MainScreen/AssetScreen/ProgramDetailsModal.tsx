import {useRoute} from '@react-navigation/core';
import {
  Alert,
  Button,
  Div,
  ImageView,
  Label,
  LoadingIndicator,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack} from 'services';
import {apiInvestment} from 'services/apis/apiInvestment';
import {useAppSelector} from 'store/hooks';
import {convertNav, convertNumber, Log} from 'utils';

function T(p: {
  title: string;
  content: string;
  isLine?: boolean;
  contentColor?: any;
}) {
  return (
    <>
      <Div
        paddingHorizontal={17}
        paddingVertical={15}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Label size={14}>{p.title}</Label>
        <Label
          size={14}
          multilanguage={false}
          color={p.contentColor || Ecolors.textColor}>
          {p.content ?? ''}
        </Label>
      </Div>
      {p.isLine && (
        <Div
          marginHorizontal={17}
          height={0.7}
          backgroundColor={Ecolors.spaceColor}
        />
      )}
    </>
  );
}

function ProgramDetailsModal() {
  const insests = useSafeAreaInsets();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await apiInvestment.getProductDetails({
        id: route.params.data.id,
      });
      if (res.status == 200) {
        setData(res.data);
      }
    } catch (error: any) {
      Alert.showError({
        content: error.message,
        multilanguage: false,
        onPress: () => {
          getData();
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const route = useRoute<any>();
  const {name, nameEn} = route.params.data;
  return (
    <Button
      isScale={false}
      onPress={() => {
        goBack();
      }}>
      <Div
        height={'100%'}
        backgroundColor={Ecolors.transparentLoading}
        flexDirection={'column'}
        alignItems={'center'}
        paddingTop={insests.top + 110}
        justifyContent={'flex-start'}>
        <Div
          width={337}
          minHeight={100}
          overflow={'hidden'}
          backgroundColor={Ecolors.whiteColor}
          borderRadius={5}>
          {loading && (
            <Div
              position={'absolute'}
              zIndex={999}
              flex={1}
              elevation={999}
              width={'100%'}
              height={'100%'}
              alignItems={'center'}
              justifyContent={'center'}>
              <LoadingIndicator color={Ecolors.mainColor} numdot={5} />
            </Div>
          )}
          {/*  */}
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            height={47}
            borderBottomWidth={0.7}
            borderBottomColor={Ecolors.spaceColor}
            justifyContent={'space-between'}>
            <Label marginLeft={20} multilanguage={false} fontWeight={'700'}>
              {I18nState == 'vi' ? name : nameEn}
            </Label>
            <Button
              onPress={() => {
                goBack();
              }}
              widthHeight={47}
              alignItems={'center'}
              justifyContent={'center'}>
              <ImageView
                widthHeight={18}
                resizeMode={'contain'}
                source={Icons.close}
              />
            </Button>
          </Div>
          {/*  */}
          <T
            title={`assetscreen.sotkdautu`}
            content={data?.accountNo || ''}
            isLine={true}
          />
          <T
            title={`assetscreen.giatrithitruong`}
            content={convertNumber(Math.round(data?.marketValue ?? 0))}
            isLine={true}
          />
          <T
            title={`assetscreen.sldonviquy`}
            content={convertNav(data?.totalOfUnit ?? 0, true)}
            isLine={true}
          />
          <T
            title={`assetscreen.sotiendadautu`}
            content={convertNumber(
              Math.round(data?.principalInvestmentAmount ?? 0),
            )}
            isLine={true}
          />
          <T
            title={`assetscreen.sotiendadautuconlai`}
            content={convertNumber(
              Math.round(data?.balanceInvestmentCost ?? 0),
            )}
            isLine={true}
          />
          <T
            title={`assetscreen.ngaygiaodichdautien`}
            content={data?.fistTransactionDate ?? ''}
            isLine={true}
          />
          <T
            title={`assetscreen.lailodathuchien`}
            content={convertNumber(Math.round(data?.realizedGainLoss ?? 0))}
            contentColor={
              data?.realizedGainLoss < 0
                ? Ecolors.redColor
                : Ecolors.greenColor || Ecolors.greenColor
            }
            isLine={true}
          />
          <T
            title={`assetscreen.lailochuathuchien`}
            contentColor={
              data?.unRealizedGainLoss < 0
                ? Ecolors.redColor
                : Ecolors.greenColor || Ecolors.greenColor
            }
            content={convertNumber(Math.round(data?.unRealizedGainLoss ?? 0))}
          />
        </Div>
      </Div>
    </Button>
  );
}

export default React.memo(ProgramDetailsModal);
