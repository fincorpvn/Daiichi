import {Button, Div, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React from 'react';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {convertNumber} from 'utils';

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

function ItemAutoInvestTransaction(p: {data: any}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const {
    productProgramName,
    productProgramNameEn,
    enable,
    minCycleLength,
    nextCycleNumber,
    missedContinuousCycle,
    minAmount,
    investedCycle,
  } = p.data;

  return (
    <Button
      onPress={() => {
        navigate('AutoInvestOrderDetailsModal', {
          data: p.data,
        });
      }}
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
        <Label size={14}>{`transactionscreen.quychuongtrinh`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.tinhtrang`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} fontWeight={'700'} size={14}>
          {I18nState == 'vi' ? productProgramName : productProgramNameEn}
        </Label>
        <Label
          color={enable ? Ecolors.greenColor : Ecolors.redColor}
          size={14}
          multilanguage={false}>
          {I18nState == 'vi'
            ? enable
              ? 'Đang tham gia'
              : 'Đã dừng'
            : enable
            ? 'Going'
            : 'Stop'}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.sotiendangkydautu`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.sokydaututoithieu`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {convertNumber(minAmount)}
        </Label>
        <Label size={14} multilanguage={false}>
          {`${minCycleLength} ${I18nState == 'vi' ? 'Tháng' : 'Month'}`}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={14}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.sokydadautu`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`transactionscreen.sokylientuckhongthamgia`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={6}>
        <Label multilanguage={false} size={14}>
          {investedCycle}
        </Label>
        <Label size={14} multilanguage={false}>
          {missedContinuousCycle}
        </Label>
      </RowSpaceItem>
      {enable && (
        <Div
          marginTop={8}
          width={309}
          paddingVertical={8}
          marginBottom={10}
          backgroundColor={'rgba(0, 189, 86, 0.1)'}
          borderRadius={8}
          alignItems={'center'}
          justifyContent={'center'}>
          <Label size={14}>{`transactionscreen.kydaututieptheo`}</Label>
          <Label
            multilanguage={false}
            fontWeight={'700'}
            color={Ecolors.greenColor}
            marginTop={2}>
            {nextCycleNumber}
          </Label>
        </Div>
      )}
    </Button>
  );
}

export default React.memo(ItemAutoInvestTransaction);
