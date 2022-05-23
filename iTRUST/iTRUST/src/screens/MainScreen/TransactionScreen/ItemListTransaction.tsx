import {Alert, Button, Div, ImageView, Label} from 'components';
import {Ecolors, Efonts, EStyle, Icons} from 'constant';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteOrder} from 'reducer/transaction';
import {navigate} from 'services';
import {apiTransaction} from 'services/apis/apiTransaction';
import {useAppSelector} from 'store/hooks';
import {
  convertNav,
  convertNumber,
  convertReceiveAmount,
  convertTimestamp,
  Log,
} from 'utils';

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

function ISwap(p: {title: string}) {
  return (
    <Div
      width={149}
      height={68}
      borderWidth={0.7}
      style={EStyle.shadowItem}
      borderColor={Ecolors.bordercolor}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={8}
      backgroundColor={Ecolors.whiteColor}>
      <Label textAlign={'center'} multilanguage={false}>
        {p.title || ''}
      </Label>
    </Div>
  );
}

export function ItemOrderBuy(p: {
  data: any;
  hideDelete?: boolean;
  hideStatusReceiveAmount?: boolean;
}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {
    productProgramName,
    productProgramNameEn,
    lockAmount,
    sessionTime,
    createAt,
    statusName,
    receivedAmount,
    statusCode,
  } = p.data;
  return (
    <Button
      isScale={false}
      onPress={() => {
        navigate('OrderBuyDetailsModal', {
          data: p.data,
          hideDelete: p.hideDelete,
          hideStatusReceiveAmount: p.hideStatusReceiveAmount,
        });
      }}
      marginHorizontal={16}
      borderRadius={8}
      borderWidth={0.8}
      borderColor={Ecolors.bordercolor}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}
      paddingHorizontal={15}
      paddingTop={13}
      paddingBottom={18}
      minHeight={100}>
      <RowSpaceItem>
        <Label size={14}>{`transactionscreen.quychuongtrinh`}</Label>
        <Label size={14}>{`transactionscreen.sotienmua`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {I18nState == 'vi' ? productProgramName : productProgramNameEn}
        </Label>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {convertNumber(lockAmount, false)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.phiengiaodich`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.trangthai`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {convertTimestamp(sessionTime)}
        </Label>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Div
            widthHeight={10}
            marginRight={8}
            borderRadius={10}
            backgroundColor={Ecolors.yellowColor}
          />
          <Label multilanguage={false} size={14}>
            {I18nState == 'vi'
              ? statusName
              : statusCode == 'ORDER_REJECT'
              ? 'Not matched'
              : statusCode == 'ORDER_RECONCILED'
              ? `Matched`
              : 'Pending'}
          </Label>
        </Div>
      </RowSpaceItem>
      {!p.hideStatusReceiveAmount && (
        <RowSpaceItem paddingTop={3}>
          <Div />
          <Label
            multilanguage={false}
            size={12}
            fontFamily={Efonts.italic}
            color={receivedAmount ? Ecolors.growColor : Ecolors.redColor}>
            {convertReceiveAmount(receivedAmount, I18nState)}
          </Label>
        </RowSpaceItem>
      )}
    </Button>
  );
}

export function ItemOrderSell(p: {data: any}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {
    productProgramName,
    productProgramNameEn,
    volume,
    createAt,
    statusName,
    statusCode,
    sessionTime,
  } = p.data;

  return (
    <Button
      isScale={false}
      onPress={() => {
        navigate('OrderSellDetailsModal', {
          data: p.data,
        });
      }}
      marginHorizontal={16}
      borderRadius={8}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}
      borderWidth={0.8}
      borderColor={Ecolors.bordercolor}
      paddingHorizontal={15}
      paddingTop={13}
      paddingBottom={18}
      minHeight={100}>
      <RowSpaceItem>
        <Label size={14}>{`transactionscreen.quychuongtrinh`}</Label>
        <Label size={14}>{`transactionscreen.soluong`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {I18nState == 'vi' ? productProgramName : productProgramNameEn}
        </Label>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {convertNav(volume, true)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.phiengiaodich`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.trangthai`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {convertTimestamp(sessionTime)}
        </Label>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Div
            widthHeight={10}
            marginRight={8}
            borderRadius={10}
            backgroundColor={Ecolors.yellowColor}
          />
          <Label multilanguage={false} size={14}>
            {I18nState == 'vi'
              ? statusName
              : statusCode == 'ORDER_REJECT'
              ? 'Not matched'
              : statusCode == 'ORDER_RECONCILED'
              ? `Matched`
              : 'Pending'}
          </Label>
        </Div>
      </RowSpaceItem>
    </Button>
  );
}

export function ItemOrderTransfer(p: {data: any}) {
  const {
    productProgramName,
    volume,
    createAt,
    closedBookTime,
    statusName,
    productCode,
    destOrderInfo,
    statusCode,
    sessionTime,
    code,
    beginVolume,
    lockAmount,
    productProgramNameEn,
    id,
    price,
  } = p.data;
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const dispatch = useDispatch();
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
      // setLoading(true);
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
            dispatch(deleteOrder(id));
          },
        });
        dispatch(deleteOrder(id));
        return;
      }
      Alert.show({
        content: I18nState == 'vi' ? res.message : res.messageEn,
        multilanguage: false,
        onConfirm: () => {},
      });
    } catch (error: any) {
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
        onPress: () => {},
      });
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Button
      // onPress={() => {
      //   navigate('OrderTransferDetailsModal', {
      //     data: p.data,
      //   });
      // }}
      isScale={false}
      marginHorizontal={16}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}
      borderRadius={8}
      borderWidth={0.8}
      borderColor={Ecolors.bordercolor}
      paddingHorizontal={15}
      paddingTop={13}
      paddingBottom={18}
      minHeight={100}>
      <RowSpaceItem>
        <Label size={14}>{`transactionscreen.malenh`}</Label>
        <Label size={14}>{`transactionscreen.phiengiaodich`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {code}
        </Label>
        <Label size={14} fontWeight={'700'} multilanguage={false}>
          {convertTimestamp(sessionTime)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.soccq`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.trangthai`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {convertNav(beginVolume, true)}
        </Label>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Div
            widthHeight={10}
            marginRight={8}
            borderRadius={10}
            backgroundColor={Ecolors.yellowColor}
          />
          <Label multilanguage={false} size={14}>
            {I18nState == 'vi'
              ? statusName
              : statusCode == 'ORDER_REJECT'
              ? 'Not matched'
              : statusCode == 'ORDER_RECONCILED'
              ? `Matched`
              : 'Pending'}
          </Label>
        </Div>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`createordermodal.navkitruoc`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.giatriuoctinh`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {convertNav(price)}
        </Label>
        <Label multilanguage={false} size={14}>
          {convertNumber(Math.round(lockAmount ?? 0))}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Div flexDirection={'column'} alignItems={'flex-start'} flex={1}>
          <Label
            color={Ecolors.grayColor}
            size={14}>{`transactionscreen.ngaydatlenh`}</Label>
          <Label multilanguage={false} size={14}>
            {convertTimestamp(createAt, 'DD/MM/yyyy, HH:mm')}
          </Label>
        </Div>
        <Button
          width={66}
          height={30}
          onPress={() => {
            onDeleteOrder();
          }}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={Ecolors.spaceColor}
          borderRadius={5}>
          <ImageView
            widthHeight={15}
            marginRight={4}
            tintColor={Ecolors.textColor}
            source={Icons.delete}
            resizeMode={'contain'}
          />
          <Label size={14}>{`transactionscreen.xoa`}</Label>
        </Button>
      </RowSpaceItem>

      <Div
        flexDirection={'row'}
        marginTop={20}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Div
          position={'absolute'}
          zIndex={999}
          elevation={999}
          style={StyleSheet.absoluteFillObject}
          alignItems={'center'}
          justifyContent={'center'}>
          <ImageView
            widthHeight={28}
            resizeMode={'contain'}
            source={Icons.swap}
          />
        </Div>
        <ISwap
          title={I18nState == 'vi' ? productProgramName : productProgramNameEn}
        />
        <ISwap
          title={
            I18nState == 'vi'
              ? destOrderInfo?.productProgramName
              : destOrderInfo?.productProgramNameEn
          }
        />
      </Div>
    </Button>
  );

  return (
    <Button
      isScale={false}
      onPress={() => {
        navigate('OrderTransferDetailsModal', {
          data: p.data,
        });
      }}
      marginHorizontal={16}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}
      borderRadius={8}
      borderWidth={0.8}
      borderColor={Ecolors.bordercolor}
      paddingHorizontal={15}
      paddingTop={13}
      paddingBottom={18}
      minHeight={100}>
      <RowSpaceItem>
        <Label size={14}>{`transactionscreen.quychuongtrinh`}</Label>
        <Label size={14}>{`transactionscreen.ngaydatlenh`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {productProgramName}
        </Label>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {convertTimestamp(createAt)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.quymuctieu`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.chuongtrinh`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {productCode}
        </Label>
        <Label multilanguage={false} size={14}>
          {productProgramName}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.giatriuoctinh`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.trangthai`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {convertNumber(lockAmount)}
        </Label>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Div
            widthHeight={10}
            marginRight={8}
            borderRadius={10}
            backgroundColor={Ecolors.yellowColor}
          />
          <Label multilanguage={false} size={14}>
            {statusName}
          </Label>
        </Div>
      </RowSpaceItem>
    </Button>
  );
}

export function ItemOrderTransferBuy(p: {data: any}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const {
    productProgramName,
    volume,
    createAt,
    statusName,
    productCode,
    lockAmount,
    statusCode,
    sessionTime,
  } = p.data;

  return (
    <Button
      isScale={false}
      onPress={() => {
        navigate('OrderTransferDetailsModal', {
          data: p.data,
        });
      }}
      marginHorizontal={16}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}
      borderRadius={8}
      borderWidth={0.8}
      borderColor={Ecolors.bordercolor}
      paddingHorizontal={15}
      paddingTop={13}
      paddingBottom={18}
      minHeight={100}>
      <RowSpaceItem>
        <Label size={14}>{`transactionscreen.quychuongtrinh`}</Label>
        <Label size={14}>{`transactionscreen.phiengiaodich`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {productProgramName}
        </Label>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {convertTimestamp(sessionTime)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.quymuctieu`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.chuongtrinh`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {productCode}
        </Label>
        <Label multilanguage={false} size={14}>
          {productProgramName}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.giatriuoctinh`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.trangthai`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {convertNumber(lockAmount)}
        </Label>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}>
          <Div
            widthHeight={10}
            marginRight={8}
            borderRadius={10}
            backgroundColor={Ecolors.yellowColor}
          />
          <Label multilanguage={false} size={14}>
            {I18nState == 'vi'
              ? statusName
              : statusCode == 'ORDER_REJECT'
              ? 'Not matched'
              : statusCode == 'ORDER_RECONCILED'
              ? `Matched`
              : 'Pending'}
          </Label>
        </Div>
      </RowSpaceItem>
    </Button>
  );
}
