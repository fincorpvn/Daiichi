import {useRoute} from '@react-navigation/core';
import {Button, Div, HeaderBack, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {ScrollView} from 'react-native';
import ComBankContent from 'screens/MainScreen/CreateOrderModal/ComBankContent';
import {useAppSelector} from 'store/hooks';
import {convertNumber, convertTimestamp, copyToClipboard, Log} from 'utils';

function RowSpace(p: {title: string; content: string}) {
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      marginTop={9}
      justifyContent={'space-between'}>
      <Label size={14}>{p.title}</Label>
      <Label size={14} multilanguage={false}>
        {p.content}
      </Label>
    </Div>
  );
}

function RowItem(p: {title: string; content: string; isRow?: boolean}) {
  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Div flex={1}>
          <Label size={14} color={Ecolors.grayColor}>
            {p.title}
          </Label>
          <Label marginTop={5} size={14} multilanguage={false}>
            {p.content}
          </Label>
        </Div>
        <Button
          width={61}
          height={26}
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => {
            copyToClipboard(p.content);
          }}
          borderRadius={5}
          backgroundColor={Ecolors.yellowColor}>
          <Label size={14}>{`transactionscreen.copy`}</Label>
        </Button>
      </Div>
      {p.isRow && (
        <Div
          width={'100%'}
          marginVertical={10}
          height={0.7}
          backgroundColor={Ecolors.grayColor}
        />
      )}
    </>
  );
}

const ComL = (p: {
  nextClosedBookTime: any;
  nextCycleNumber: any;
  I18nState: any;
}) => {
  const {I18nState, nextCycleNumber, nextClosedBookTime} = p;
  return (
    <Div flex={1} padding={16}>
      <Label multilanguage={false} size={14}>
        {I18nState == 'vi' ? (
          <Label size={14} multilanguage={false}>
            {`Th???i ??i???m nh???n ti???n cu???i c??ng c???a k??? th??ng `}
            <Label size={14} fontWeight={'700'} multilanguage={false}>
              {nextCycleNumber}
            </Label>
            {` tr?????c `}
            <Label size={14} fontWeight={'700'} multilanguage={false}>
              {nextClosedBookTime}
              {`.`}
            </Label>
            <Label
              fontWeight={'700'}
              size={14}
              multilanguage={false}>{`\n\nL??u ??:\n`}</Label>
            <Label
              multilanguage={false}
              size={
                14
              }>{`- N???u qu?? kh??ch chuy???n ti???n s???m, l???nh s??? ???????c kh???p v???i c??c phi??n giao d???ch s???m h??n trong th??ng.\n- Qu?? kh??ch c?? th??? ch???n m???t ng??y b???t k??? trong th??ng l??m ng??y thanh to??n Ch????ng tr??nh ?????u t?? ?????nh k??? v?? c??? g???ng ?????m b???o vi???c duy tr?? ????ng ti???n theo k??? ho???ch ???? ????ng k??.\n- Qu?? Kh??ch c??ng c?? th??? chuy???n ti???n mua CCQ nhi???u l???n trong th??ng t??y theo k??? ho???ch ?????u t?? c???a m??nh.\n- Qu?? kh??ch kh??ng c???n t???o l???nh mua m?? ch??? th???c hi???n chuy???n ti???n v??o t??i kho???n nh???n ti???n c???a Qu??? ????? th???c hi???n l???nh mua ?????nh k???.`}</Label>
          </Label>
        ) : (
          <Label size={14} multilanguage={false}>
            {`You need to transfer money to invest for SIP of term `}
            <Label size={14} fontWeight={'700'} multilanguage={false}>
              {nextCycleNumber}
            </Label>
            {` before `}
            <Label size={14} fontWeight={'700'} multilanguage={false}>
              {nextClosedBookTime}
              {`.`}
            </Label>
            <Label
              fontWeight={'700'}
              size={14}
              multilanguage={false}>{`\n\nNotice: \n`}</Label>
            <Label
              multilanguage={false}
              size={
                14
              }>{`- If you transfer money early, the order will be matched with trading sessions earlier in the month.\n- You can choose any day of the month as your Recurring Investment Program payment date and try to ensure ensure the maintenance of payment according to the registered plan.\n- You can also transfer money to buy CCQ several times a month depending on your investment plan.\n- Qu?? Kh??ch c??ng c?? th??? chuy???n ti???n mua CCQ nhi???u l???n trong th??ng t??y theo k??? ho???ch ?????u t?? c???a m??nh.\n- Qu?? kh??ch kh??ng c???n t???o l???nh mua m?? ch??? th???c hi???n chuy???n ti???n v??o t??i kho???n nh???n ti???n c???a Qu??? ????? th???c hi???n l???nh mua ?????nh k???.`}</Label>
          </Label>
        )}
      </Label>
    </Div>
  );
};

function AutoInvestOrderDetails() {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const route = useRoute<any>();
  const {
    productProgramName,

    supervisoryBankAccountName,
    productProgramNameEn,
    supervisoryBankAccountBranch,
    investmentNumber,
    supervisoryBankAccountNumber,
    minAmount,
    dataBank,
    nextCycleNumber,
    enable,
    nextClosedBookTime,
    ordersInfo,
    transferContent,
  } = route.params.data;

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
    amount: `${minAmount}`,
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        // loading={loading}
        type={2}
        multilanguage={false}
        title={I18nState == 'vi' ? productProgramName : productProgramNameEn}
        // iconRight={Icons.delete}
        onRightPress={() => {}}
      />
      <ScrollView>
        {!!enable && (
          <Div paddingHorizontal={16}>
            <Label
              marginVertical={16}
              fontWeight={
                '700'
              }>{`transactionscreen.thongtinchuyenkhoan`}</Label>
            <ComBankContent {...p} />
            {/* <Div
              borderRadius={8}
              borderWidth={0.8}
              borderColor={Ecolors.bordercolor}
              backgroundColor={Ecolors.whiteColor}
              style={EStyle.shadowItem}
              paddingHorizontal={15}
              paddingTop={13}
              paddingBottom={18}
              minHeight={100}>
              <RowItem
                isRow={true}
                title={'transactionscreen.sotiendangkydautu'}
                content={convertNumber(minAmount)}
              />
              <RowItem
                isRow={true}
                title={'transactionscreen.nganhang'}
                content={I18nState == 'vi' ? dataBank.name : dataBank.nameEn}
              />
              <RowItem
                isRow={true}
                title={'transactionscreen.chinhanh'}
                content={supervisoryBankAccountBranch}
              />
              <RowItem
                isRow={true}
                title={'transactionscreen.nguoihuongthu'}
                content={supervisoryBankAccountName}
              />
              <RowItem
                isRow={true}
                title={'transactionscreen.sotaikhoan'}
                content={supervisoryBankAccountNumber}
              />
              <RowItem
                isRow={false}
                title={'transactionscreen.noidung'}
                content={transferContent}
              />
            </Div> */}
            <Div
              marginTop={20}
              backgroundColor={Ecolors.bgtime}
              borderRadius={5}
              minHeight={100}
              overflow={'hidden'}
              flexDirection={'row'}>
              <Div
                width={4}
                height={'100%'}
                backgroundColor={Ecolors.yellowColor}
              />
              <ComL
                I18nState={I18nState}
                nextClosedBookTime={nextClosedBookTime}
                nextCycleNumber={nextCycleNumber}
                key={'121'}
              />
            </Div>
          </Div>
        )}
        <Div
          width={'100%'}
          marginTop={20}
          height={0.7}
          backgroundColor={Ecolors.grayColor}
        />
        <Div paddingHorizontal={16}>
          <Label
            marginVertical={16}
            fontWeight={'700'}>{`transactionscreen.lichsukhoplenh`}</Label>
          {!!ordersInfo?.length &&
            ordersInfo.map((item: any, index: number) => {
              const {
                cycleNumber,
                statusName,
                lockAmount,
                sessionTime,
                statusCode,
              } = item;
              return (
                <Div
                  marginBottom={10}
                  borderRadius={8}
                  key={index}
                  borderWidth={0.8}
                  borderColor={Ecolors.bordercolor}
                  backgroundColor={Ecolors.whiteColor}
                  style={EStyle.shadowItem}
                  paddingHorizontal={15}
                  paddingTop={4}
                  paddingBottom={18}
                  minHeight={100}>
                  <RowSpace
                    title={'transactionscreen.kydautu'}
                    content={cycleNumber}
                  />
                  <RowSpace
                    title={'transactionscreen.sotiendautu'}
                    content={convertNumber(lockAmount)}
                  />
                  <RowSpace
                    title={'transactionscreen.trangthai'}
                    content={
                      I18nState == 'vi'
                        ? statusName
                        : statusCode == 'ORDER_REJECT'
                        ? 'Not matched'
                        : statusCode == 'ORDER_RECONCILED'
                        ? `Matched`
                        : 'Pending'
                    }
                  />
                  <RowSpace
                    title={'transactionscreen.ngaykhoplenh'}
                    content={convertTimestamp(sessionTime)}
                  />
                </Div>
              );
            })}
        </Div>
        <Div height={100} />
      </ScrollView>
    </Div>
  );
}

export default React.memo(AutoInvestOrderDetails);
