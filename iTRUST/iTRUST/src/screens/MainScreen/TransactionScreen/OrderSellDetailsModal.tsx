import {useRoute} from '@react-navigation/core';
import {Alert, Div, HeaderBack, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteOrder} from 'reducer/transaction';
import {navigate} from 'services';
import {apiTransaction} from 'services/apis/apiTransaction';
import {useAppSelector} from 'store/hooks';
import {convertNumber, convertTimestamp, Log} from 'utils';

function RowSpaceItem(p: {paddingTop?: number; children?: any}) {
  return (
    <Div
      paddingTop={p.paddingTop ?? 0}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      {p.children && p.children}
    </Div>
  );
}

function OrderSellDetailsModal() {
  const route = useRoute<any>();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    productProgramName,
    productName,
    orderType,
    productNameEn,
    productProgramNameEn,
    createAt,
    lockAmount,
    id,
    volume,
    code,
    price,
    sessionTime,
    ordersDetailsInfo,
  } = route?.params?.data;
  Log('route?.params?.data', route?.params?.data);

  const onDeleteOrder = () => {
    Alert.show({
      content: `alert.xacnhanxoalenhgiaodich`,
      onConfirm: () => {
        onConfirmDelete();
      },
    });
  };

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      const res = await apiTransaction.deleteOrder({
        orderId: id,
      });
      if (res.status == 200) {
        dispatch(deleteOrder(id));
        Alert.show({
          content: `alert.xoalenh`,
          type: 2,
          titleClose: 'alert.dong',
          onConfirm: () => {
            navigate('TransactionScreen');
          },
        });
        return;
      }
      Alert.show({
        content: I18nState == 'vi' ? res.message : res.messageEn,
        multilanguage: false,
        onConfirm: () => {
          navigate('TransactionScreen');
        },
      });
    } catch (error: any) {
      Alert.show({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        loading={loading}
        type={2}
        multilanguage={false}
        title={I18nState == 'vi' ? productProgramName : productProgramNameEn}
        iconRight={Icons.delete}
        onRightPress={() => {
          onDeleteOrder();
        }}
      />
      <ScrollView>
        <Div paddingHorizontal={16}>
          <Label
            marginTop={16}
            marginBottom={13}
            size={16}
            fontWeight={'700'}>{`transactionscreen.thongtindautu`}</Label>
          <Div
            borderRadius={8}
            borderWidth={1}
            borderColor={Ecolors.grayColor}
            backgroundColor={Ecolors.whiteColor}
            style={EStyle.shadowItem}
            paddingHorizontal={16}
            paddingTop={17}
            paddingBottom={26}>
            <RowSpaceItem>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.quydautu`}</Label>
              <Label
                size={14}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.chuongtrinh`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Div paddingRight={10} flex={1}>
                <Label size={14} multilanguage={false}>
                  {I18nState == 'vi' ? productName : productNameEn}
                </Label>
              </Div>
              <Label size={14} multilanguage={false} fontWeight={'700'}>
                {I18nState == 'vi' ? productProgramName : productProgramNameEn}
              </Label>
            </RowSpaceItem>
            <Div
              width={'100%'}
              marginTop={10}
              marginBottom={7}
              backgroundColor={Ecolors.spaceColor}
              height={1}
            />
            <RowSpaceItem>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.loailenh`}</Label>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.malenh`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {I18nState == 'vi' ? orderType?.name : `Redeem order` || ''}
              </Label>
              <Label size={14} multilanguage={false}>
                {code}
              </Label>
            </RowSpaceItem>
            <Div
              width={'100%'}
              marginTop={10}
              marginBottom={7}
              backgroundColor={Ecolors.spaceColor}
              height={1}
            />
            <RowSpaceItem>
              <Label
                size={14}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.phiengiaodich`}</Label>
              <Label
                size={14}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.ngaydatlenh`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {convertTimestamp(sessionTime)}
              </Label>
              <Label size={14} multilanguage={false}>
                {convertTimestamp(createAt, 'DD/MM/yyyy, HH:mm')}
              </Label>
            </RowSpaceItem>
            <Div
              width={'100%'}
              marginTop={10}
              marginBottom={7}
              backgroundColor={Ecolors.spaceColor}
              height={1}
            />
            <RowSpaceItem>
              <Label
                size={14}
                color={Ecolors.grayColor}>{`transactionscreen.slban`}</Label>
              <Label
                size={14}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.navkytruoc`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {convertNumber(volume, true)}
              </Label>
              <Label size={14} multilanguage={false}>
                {convertNumber(price)}
              </Label>
            </RowSpaceItem>
          </Div>
          {/*  */}
          {ordersDetailsInfo?.map((item: any, index: number) => {
            const {createAt, percentFee, sellVolume, hodingTime} = item;
            return (
              <Div
                key={index}
                marginTop={16}
                borderRadius={8}
                borderWidth={1}
                borderColor={Ecolors.grayColor}
                backgroundColor={Ecolors.whiteColor}
                style={EStyle.shadowItem}
                shadow={true}
                paddingHorizontal={16}
                paddingTop={17}
                paddingBottom={26}>
                <RowSpaceItem>
                  <Label size={14}>{`transactionscreen.ngaymua`}</Label>
                  <Label size={14} multilanguage={false}>
                    {convertTimestamp(createAt, 'DD/MM/yyyy, HH:mm')}
                  </Label>
                </RowSpaceItem>
                <RowSpaceItem paddingTop={10}>
                  <Label size={14}>{`transactionscreen.tgnamgiu`}</Label>
                  <Label size={14} multilanguage={false}>
                    {`${hodingTime?.split('.')?.[0] || 0} ${
                      I18nState == 'vi' ? `ngày` : 'days'
                    }`}
                  </Label>
                </RowSpaceItem>
                <RowSpaceItem paddingTop={10}>
                  <Label size={14}>{`transactionscreen.slban`}</Label>
                  <Label size={14} multilanguage={false}>
                    {sellVolume || ''}
                  </Label>
                </RowSpaceItem>
                <RowSpaceItem paddingTop={10}>
                  <Label size={14}>{`transactionscreen.phi`}</Label>
                  <Label size={14} multilanguage={false}>
                    {`${percentFee || ''}%`}
                  </Label>
                </RowSpaceItem>
              </Div>
            );
          })}
        </Div>
        <Div height={100} />
      </ScrollView>
    </Div>
  );
}

export default React.memo(OrderSellDetailsModal);