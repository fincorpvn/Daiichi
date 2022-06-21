import {Button, Div, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React from 'react';
import {navigate} from 'services';
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

function ItemListHistoryOrder(p: {data: any}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const {
    productProgramName,
    volume,
    createAt,
    netAmount,
    sessionTime,
    productProgramNameEn,
  } = p.data;
  return (
    <Button
      isScale={false}
      onPress={() => {
        navigate('OrderHistoryDetailsModal', {
          data: p.data,
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
      paddingBottom={18}>
      <RowSpaceItem>
        <Div flex={1}>
          <Label size={14} textAlign={'left'} multilanguage={false}>
            {`${
              I18nState == 'vi' ? productProgramName : productProgramNameEn
            }`?.replace('(', `\n(`)}
          </Label>
        </Div>
        <Label size={14}>{`transactionscreen.tongtien`}</Label>
      </RowSpaceItem>
      <RowSpaceItem paddingTop={5}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}>
          <Label color={Ecolors.grayColor} size={14} multilanguage={false}>
            <Label color={Ecolors.grayColor} size={14}>
              {`transactionscreen.phiengiaodich`}
            </Label>
            {` ${convertTimestamp(sessionTime)}`}
          </Label>
        </Div>

        <Label size={14} multilanguage={false}>
          {convertNumber(netAmount)}
        </Label>
      </RowSpaceItem>
    </Button>
  );
}

export default React.memo(ItemListHistoryOrder);
