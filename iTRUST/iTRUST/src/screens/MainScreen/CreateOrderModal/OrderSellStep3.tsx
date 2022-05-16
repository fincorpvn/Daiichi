import {ButtonBorder, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {ScrollView} from 'react-native';
import {goBack} from 'services';
import {useAppSelector} from 'store/hooks';
import {convertAmount, convertNumber, convertTimestamp, Log} from 'utils';

interface Props {
  product: any;
  amount: any;
  scheme: any;
  currentSession: any;
  stepTimeLine?: number;
  onPre?: () => void;
}

function RowSpaceItem(p: {
  marginTop?: number;
  paddingHorizontal?: number;
  children: any;
  isBorderBottom?: boolean;
}) {
  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        width={'100%'}
        justifyContent={'space-between'}
        marginTop={p.marginTop || 0}
        paddingHorizontal={p.paddingHorizontal || 0}>
        {p.children && p.children}
      </Div>
      {p.isBorderBottom && (
        <Div
          marginTop={15}
          width={'100%'}
          height={1}
          backgroundColor={Ecolors.spaceColor}
        />
      )}
    </>
  );
}

const ComL = ({product, I18nState, currentSession}) => {
  if (product.completeTransactionDuration == 1) {
    return (
      <Div
        marginHorizontal={10}
        paddingTop={14}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}>
        <ImageView
          widthHeight={16}
          marginRight={14}
          source={Icons.warningamount}
          resizeMode={'contain'}
        />
        <Div flex={1}>
          <Label size={12} multilanguage={false}>
            {I18nState == 'vi'
              ? `Số tiền của lệnh bán sẽ được thanh toán trong ngày làm việc (ngày khớp lệnh)`
              : `The amount of the redemption order will be settled within the working day (trading date)`}
          </Label>
        </Div>
      </Div>
    );
  }

  return (
    <Div
      paddingTop={14}
      marginHorizontal={10}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'flex-start'}>
      <ImageView
        widthHeight={16}
        marginRight={14}
        source={Icons.warningamount}
        resizeMode={'contain'}
      />
      <Div flex={1}>
        <Label size={12} multilanguage={false}>
          {I18nState == 'vi'
            ? `Số tiền của lệnh bán sẽ được thanh toán trong vòng `
            : `The amount of the redemption order will be settled within `}
          <Label fontWeight={'700'} size={12} multilanguage={false}>
            {product.completeTransactionDuration}
          </Label>
          {I18nState == 'vi'
            ? ` ngày làm việc kể từ ngày khớp lệnh.`
            : ` working days from the trading date.`}
        </Label>
      </Div>
    </Div>
  );
};

function OrderSellStep3({
  product,
  stepTimeLine,
  amount,
  onPre,
  scheme,
  currentSession,
}: Props) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  if (stepTimeLine != 3) {
    return <Div screen={true} />;
  }
  return (
    <Div screen={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div
          width={'100%'}
          marginTop={27}
          paddingHorizontal={16}
          alignItems={'center'}
          justifyContent={'center'}>
          <ImageView
            source={Icons.createordersuccess}
            width={222}
            height={160}
            resizeMode={'contain'}
          />
          <Label
            size={18}
            fontWeight={'700'}
            textAlign={'center'}
            marginTop={11}>{`createordermodal.datlenhbanthanhcong`}</Label>
          <Label
            multilanguage={false}
            textAlign={'center'}
            marginHorizontal={55}>
            <Label
              size={14}
              marginTop={11}>{`createordermodal.camonquykhach`}</Label>
          </Label>
          <Div
            width={'100%'}
            marginTop={9}
            borderRadius={8}
            borderWidth={0.8}
            borderColor={Ecolors.bordercolor}
            backgroundColor={Ecolors.whiteColor}
            style={EStyle.shadowItem}
            paddingHorizontal={20}
            paddingTop={20}
            paddingBottom={24}>
            <RowSpaceItem isBorderBottom={true}>
              <Label size={14}>{`createordermodal.quydautu`}</Label>
              <Div
                flex={1}
                flexDirection={'row'}
                alignItems={'center'}
                paddingLeft={10}
                justifyContent={'flex-end'}>
                <Label size={14} multilanguage={false}>
                  {I18nState == 'vi' ? product?.name : product?.nameEn || ''}
                </Label>
              </Div>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.chuongtrinh`}</Label>
              <Div
                flex={1}
                flexDirection={'row'}
                alignItems={'center'}
                paddingLeft={10}
                justifyContent={'flex-end'}>
                <Label multilanguage={false} size={14}>
                  {I18nState == 'vi' ? scheme?.name : scheme?.nameEn || ''}
                </Label>
              </Div>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.loailenh`}</Label>
              <Label size={14}>{`createordermodal.ban`}</Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.ngaydatlenh`}</Label>
              <Label multilanguage={false} size={14}>
                {convertTimestamp(new Date().getTime(), 'DD/MM/yyyy, HH:mm')}
                {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.phiengiaodich`}</Label>
              <Label multilanguage={false} size={14}>
                {currentSession.tradingTimeString}
                {I18nState == 'vi' ? ' (Giờ VN)' : ' (VNT)'}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15}>
              <Label size={14}>{`createordermodal.soluongban`}</Label>
              <Label multilanguage={false} size={14}>
                {convertAmount(amount, true)}
              </Label>
            </RowSpaceItem>
          </Div>
          <ComL
            currentSession={currentSession}
            product={product}
            I18nState={I18nState}
            key={'12'}
          />
        </Div>
        <Div height={100} />
      </ScrollView>
      <RowSpaceItem paddingHorizontal={29} marginTop={10}>
        <ButtonBorder
          width={148}
          height={48}
          onPress={() => {
            onPre && onPre();
          }}
          title={`createordermodal.quaylai`}
          type={2}
        />
        <ButtonBorder
          width={148}
          onPress={() => {
            goBack();
          }}
          height={48}
          title={`createordermodal.hoantat`}
        />
      </RowSpaceItem>
      <Div height={200} />
    </Div>
  );
}

export default React.memo(OrderSellStep3);
