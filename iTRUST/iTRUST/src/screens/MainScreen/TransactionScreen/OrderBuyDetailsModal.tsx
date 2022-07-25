import {useRoute} from '@react-navigation/core';
import {Alert, Button, Div, HeaderBack, Label} from 'components';
import {Ecolors, Efonts, EStyle, Icons} from 'constant';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteOrder} from 'reducer/transaction';
import ComBankContent from 'screens/MainScreen/CreateOrderModal/ComBankContent';
import {navigate} from 'services';
import {apiTransaction} from 'services/apis/apiTransaction';
import {useAppSelector} from 'store/hooks';
import {
  convertNav,
  convertNumber,
  convertReceiveAmount,
  convertTimestamp,
  copyToClipboard,
  Log,
} from 'utils';

function RowSpaceItem(p: {paddingTop?: number; children?: any}) {
  return (
    <Div
      paddingTop={p.paddingTop ?? 0}
      flexDirection={'row'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      {p.children && p.children}
    </Div>
  );
}

function ButtonCoppy(p: {onPress?: () => void}) {
  return (
    <Button
      onPress={() => p.onPress && p.onPress()}
      width={61}
      height={26}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={5}
      backgroundColor={Ecolors.yellowColor}>
      <Label size={14} multilanguage={false}>
        COPY
      </Label>
    </Button>
  );
}

function OrderBuyDetailsModal() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {bankAccount, investmentProfile} = currentUser;
  const {
    productProgramName,
    supervisoryBankAccountBranch,
    supervisoryBankAccountNote,
    supervisoryBankAccountNumber,
    supervisoryBankAccountRef,
    supervisoryBankAccountName,
    productProgramNameEn,
    productProgramTradeCode,
    dataBank,
    productNameEn,
    productName,
    orderType,
    statusName,
    note,
    createAt,
    lockAmount,
    closedBookTime,
    sessionTime,
    closedBankTime,
    id,
    receivedAmount,
    price,
    statusCode,
    code,
    transferContent,
  } = route?.params?.data;

  const bankNote = `${transferContent}`;

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
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const p = {
    bankSuperVisory: {
      dataBank,
      name: supervisoryBankAccountName,
      number: supervisoryBankAccountNumber,
      branch: supervisoryBankAccountBranch,
    },
    excuseTempVolumn: {
      transferContent: transferContent,
    },
    amount: `${lockAmount}`,
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        loading={loading}
        type={2}
        multilanguage={false}
        title={I18nState == 'vi' ? productProgramName : productProgramNameEn}
        iconRight={
          !(
            route?.params?.hideDelete ||
            receivedAmount ||
            statusCode == 'ORDER_REJECT'
          )
            ? Icons.delete
            : null
        }
        onRightPress={() => {
          onDeleteOrder();
        }}
      />
      <ScrollView>
        <Div paddingHorizontal={16}>
          {/* thon tin dau thu  */}
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
              <Div
                height={'100%'}
                flexDirection={'row'}
                justifyContent={'flex-end'}
                alignItems={'flex-start'}>
                <Label
                  size={14}
                  textAlign={'right'}
                  multilanguage={false}
                  fontWeight={'700'}>
                  {`${
                    I18nState == 'vi'
                      ? productProgramName
                      : productProgramNameEn
                  }`?.replace('(', `\n(`)}
                </Label>
              </Div>
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
                {I18nState == 'vi' ? orderType?.name : `Subscribe order` || ''}
              </Label>
              <Label size={14} multilanguage={false}>
                {code}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={10}>
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
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.sotienmua`}</Label>
              <Label
                size={14}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.navkytruoc`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={5}>
              <Label size={14} multilanguage={false}>
                {convertNumber(Math.round(lockAmount ?? 0))}
              </Label>
              <Label size={14} multilanguage={false}>
                {convertNav(price)}
              </Label>
            </RowSpaceItem>
          </Div>
          {/* thong tin chuyen khoan */}
          <Label
            size={16}
            fontWeight={'700'}
            marginTop={16}
            marginBottom={13}>{`transactionscreen.thongtinchuyenkhoan`}</Label>
          <Div
            borderRadius={8}
            borderWidth={0.8}
            borderColor={Ecolors.bordercolor}
            backgroundColor={Ecolors.whiteColor}
            style={EStyle.shadowItem}
            paddingHorizontal={16}
            paddingTop={17}
            paddingBottom={26}>
            <Label size={14}>{`transactionscreen.phuongthucchuyenkhoan`}</Label>
            <Div marginTop={5} flexDirection={'row'} alignItems={'center'}>
              <Label
                size={12}
                marginRight={8}
                color={
                  Ecolors.grayColor
                }>{`transactionscreen.trangthai`}</Label>
              {statusCode == 'ORDER_REJECT' ? (
                <Div>
                  <Label
                    color={Ecolors.redColor}
                    multilanguage={false}
                    size={12}>
                    {I18nState == 'vi'
                      ? statusName
                      : statusCode == 'ORDER_REJECT'
                      ? 'Not matched'
                      : statusCode == 'ORDER_RECONCILED'
                      ? `Matched`
                      : 'Pending'}
                  </Label>
                </Div>
              ) : (
                !route?.params?.hideStatusReceiveAmount && (
                  <Label
                    multilanguage={false}
                    size={12}
                    fontFamily={Efonts.italic}
                    color={
                      receivedAmount ? Ecolors.growColor : Ecolors.redColor
                    }>
                    {convertReceiveAmount(receivedAmount, I18nState)}
                  </Label>
                )
              )}
            </Div>
            {statusCode == 'ORDER_REJECT' && (
              <Label color={Ecolors.redColor} multilanguage={false} size={12}>
                {`${I18nState == 'vi' ? 'Lí do: ' : 'Reason: '}${note}`}
              </Label>
            )}
          </Div>

          <ComBankContent {...p} />
        </Div>
        <Div height={100} />
      </ScrollView>
    </Div>
  );
}

export default React.memo(OrderBuyDetailsModal);
