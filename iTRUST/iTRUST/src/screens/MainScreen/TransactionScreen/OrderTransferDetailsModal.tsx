import {useRoute} from '@react-navigation/core';
import {Alert, Div, HeaderBack, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteOrder} from 'reducer/transaction';
import {navigate} from 'services';
import {apiTransaction} from 'services/apis/apiTransaction';
import {useAppSelector} from 'store/hooks';
import {convertNumber, convertTimestamp} from 'utils';

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

function OrderTransferDetailsModal() {
  const route = useRoute<any>();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    supervisoryBankAccountBranch,
    supervisoryBankAccountNote,
    supervisoryBankAccountNumber,
    supervisoryBankAccountRef,
    supervisoryBankAccountName,
    dataBank,
    productName,
    orderType,
    productNameEn,
    createAt,
    productProgramNameEn,
    lockAmount,
    id,
    productCode,
    productProgramName,
    destOrderInfo,
    sessionTime,
  } = route?.params?.data;

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
            borderWidth={0.8}
            borderColor={Ecolors.bordercolor}
            style={EStyle.shadowItem}
            backgroundColor={Ecolors.whiteColor}
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
              <Div flex={1} paddingRight={10}>
                <Label size={14} multilanguage={false}>
                  {I18nState == 'vi' ? productName : productNameEn}
                </Label>
              </Div>
              <Label size={14} multilanguage={false} fontWeight={'700'}>
                {I18nState == 'vi' ? productProgramName : productProgramNameEn}
              </Label>
            </RowSpaceItem>
            {/*  */}
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
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.ngaydatlenh`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {I18nState == 'vi' ? orderType?.name : `Switch-Out order` || ''}
              </Label>
              <Label size={14} multilanguage={false}>
                {convertTimestamp(createAt, 'DD/MM/yyyy, HH:mm')}
              </Label>
            </RowSpaceItem>
            {/*  */}
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
                }>{`transactionscreen.socqqchuyendoi`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {convertTimestamp(sessionTime)}
              </Label>
              <Label size={14} multilanguage={false}>
                {convertNumber(lockAmount)}
              </Label>
            </RowSpaceItem>
          </Div>
          {/*  */}
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            marginTop={17}>
            <Div
              style={StyleSheet.absoluteFillObject}
              alignItems={'center'}
              justifyContent={'center'}
              elevation={999}>
              <ImageView
                widthHeight={28}
                resizeMode={'contain'}
                source={Icons.swap}
                tintColor={Ecolors.mainColor}
              />
            </Div>
            <Div
              borderRadius={8}
              borderWidth={0.8}
              borderColor={Ecolors.bordercolor}
              style={EStyle.shadowItem}
              backgroundColor={Ecolors.whiteColor}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              paddingHorizontal={22}
              width={165}
              height={68}>
              <Label textAlign={'center'} size={14} multilanguage={false}>
                {productCode}
              </Label>
              <Label size={14} textAlign={'center'} multilanguage={false}>
                {I18nState == 'vi' ? productProgramName : productProgramNameEn}
              </Label>
            </Div>
            <Div
              borderRadius={8}
              borderWidth={0.8}
              borderColor={Ecolors.bordercolor}
              style={EStyle.shadowItem}
              backgroundColor={Ecolors.whiteColor}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              paddingHorizontal={22}
              width={165}
              height={68}>
              <Label textAlign={'center'} size={14} multilanguage={false}>
                {destOrderInfo?.productCode}
              </Label>
              <Label size={14} textAlign={'center'} multilanguage={false}>
                {I18nState == 'vi'
                  ? destOrderInfo?.productProgramName
                  : destOrderInfo?.productProgramNameEn}
              </Label>
            </Div>
          </Div>
        </Div>
        <Div height={100} />
      </ScrollView>
    </Div>
  );
}

export default React.memo(OrderTransferDetailsModal);
