import {useRoute} from '@react-navigation/core';
import {Button, Div, HeaderBack, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {ScrollView} from 'react-native';
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
            {`Thời điểm nhận tiền cuối cùng của kỳ tháng `}
            <Label size={14} fontWeight={'700'} multilanguage={false}>
              {nextCycleNumber}
            </Label>
            {` trước `}
            <Label size={14} fontWeight={'700'} multilanguage={false}>
              {nextClosedBookTime}
              {`.`}
            </Label>
            <Label
              fontWeight={'700'}
              size={14}
              multilanguage={false}>{`\n\nLưu ý: `}</Label>
            <Label
              multilanguage={false}
              size={
                14
              }>{`Nếu quý khách chuyển tiền sớm, lệnh sẽ được khớp với các phiên giao dịch sớm hơn trong tháng.`}</Label>
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
              multilanguage={false}>{`\n\nNotice: `}</Label>
            <Label
              multilanguage={false}
              size={
                14
              }>{`If you transfer money early this time, your SIP will be applied for closed trading session in month.`}</Label>
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
    nextClosedBookTime,
    ordersInfo,
  } = route.params.data;

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
        <Div paddingHorizontal={16}>
          <Label
            marginVertical={16}
            fontWeight={'700'}>{`transactionscreen.thongtinchuyenkhoan`}</Label>
          <Div
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
              content={investmentNumber}
            />
          </Div>
          <Div
            marginTop={20}
            backgroundColor={Ecolors.spaceColor}
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
