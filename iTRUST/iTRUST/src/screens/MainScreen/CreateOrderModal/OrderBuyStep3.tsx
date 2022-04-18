import {
  BottomSheetDialog,
  Button,
  ButtonBorder,
  Div,
  ImageView,
  Label,
} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {goBack} from 'services';
import {useAppSelector} from 'store/hooks';
import {
  convertNumber,
  convertTimestamp,
  copyToClipboard,
  widthScale,
  widthScreen,
} from 'utils';

interface Props {
  product: any;
  amount: any;
  scheme: any;
  currentSession: any;
  bankSuperVisory: any;
  excuseTempVolumn: any;
  stepTimeLine?: number;
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

function ContentCoppy(p: {
  title: string;
  content: string;
  isBorderBottom?: boolean;
  marginTop?: number;
}) {
  return (
    <RowSpaceItem marginTop={p.marginTop} isBorderBottom={p.isBorderBottom}>
      <Div flex={1}>
        <Label color={Ecolors.grayColor} size={14}>
          {p.title}
        </Label>
        <Label marginTop={5} multilanguage={false} size={14}>
          {p.content}
        </Label>
      </Div>
      <Button
        onPress={() => {
          copyToClipboard(p.content);
        }}
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
    </RowSpaceItem>
  );
}

function OrderBuyStep3({
  product,
  stepTimeLine,
  amount,
  scheme,
  currentSession,
  bankSuperVisory,
  excuseTempVolumn,
}: Props) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const bottomsheet = useRef<any>(null);
  if (stepTimeLine != 3) {
    return <Div screen={true} />;
  }
  return (
    <Div screen={true}>
      <BottomSheetDialog
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        ref={bottomsheet}>
        <Div
          width={337}
          borderRadius={8}
          borderWidth={1}
          borderColor={Ecolors.grayColor}
          backgroundColor={Ecolors.whiteColor}
          style={EStyle.shadowItem}>
          <Div
            width={'100%'}
            paddingHorizontal={17}
            paddingTop={18}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexDirection={'row'}>
            <Label
              fontWeight={'700'}>{`createordermodal.xacnhanthanhtoan`}</Label>
            <Button
              onPress={() => {
                bottomsheet.current.hide();
              }}>
              <ImageView
                widthHeight={18}
                tintColor={Ecolors.textColor}
                source={Icons.close}
              />
            </Button>
          </Div>
          <Div
            marginTop={13}
            height={1}
            width={'100%'}
            backgroundColor={Ecolors.grayColor}
          />
          <Label
            fontWeight={'700'}
            marginHorizontal={17}
            size={14}
            marginTop={18}>{`createordermodal.contentxacnhanthanhtoan`}</Label>
          <Div
            borderRadius={8}
            marginHorizontal={18}
            borderWidth={1}
            style={EStyle.shadowItem}
            backgroundColor={Ecolors.whiteColor}
            marginTop={20}
            borderColor={Ecolors.grayColor}
            paddingHorizontal={20}
            paddingTop={20}
            paddingBottom={24}>
            <ContentCoppy
              title={`createordermodal.tenthuhuong`}
              content={
                I18nState == 'vi'
                  ? bankSuperVisory?.name
                  : bankSuperVisory?.nameEn || bankSuperVisory?.name
              }
              isBorderBottom={true}
            />
            <ContentCoppy
              marginTop={11}
              title={`createordermodal.sotaikhoan`}
              content={bankSuperVisory?.number || ''}
              isBorderBottom={true}
            />
            <ContentCoppy
              marginTop={11}
              title={`createordermodal.nganhang`}
              content={
                I18nState == 'vi'
                  ? bankSuperVisory?.dataBank?.name
                  : bankSuperVisory?.dataBank?.nameEn || ''
              }
              isBorderBottom={true}
            />
            <ContentCoppy
              marginTop={11}
              title={`createordermodal.noidung`}
              content={excuseTempVolumn?.investmentNumber || ''}
            />
          </Div>
          <Div
            width={'100%'}
            paddingVertical={20}
            alignItems={'center'}
            justifyContent={'center'}>
            <ButtonBorder
              onPress={() => {
                bottomsheet.current.hide();
                goBack();
              }}
              width={303}
              title={`createordermodal.xacnhan`}
            />
          </Div>
        </Div>
      </BottomSheetDialog>
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
            marginTop={11}>{`createordermodal.datlenhmuathanhcong`}</Label>
          <Div width={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Label
              size={14}
              marginTop={11}
              textAlign={
                'center'
              }>{`createordermodal.camonquykhachdadautuvao`}</Label>
            <Label
              multilanguage={false}
              textAlign={'center'}
              marginHorizontal={55}>
              {I18nState == 'vi' ? product?.name : product?.nameEn || ''}
            </Label>
          </Div>
          <Div
            marginTop={23}
            paddingHorizontal={20}
            marginHorizontal={0}
            paddingTop={20}
            width={'100%'}
            paddingBottom={23}
            borderRadius={8}
            borderWidth={1}
            borderColor={Ecolors.grayColor}
            backgroundColor={Ecolors.whiteColor}
            style={EStyle.shadowItem}>
            <RowSpaceItem isBorderBottom={true}>
              <Label size={14}>{`createordermodal.quydautu`}</Label>
              <Div
                flex={1}
                flexDirection={'row'}
                alignItems={'center'}
                paddingLeft={10}
                justifyContent={'flex-end'}>
                <Label size={14} multilanguage={false}>
                  {I18nState == 'vi' ? product?.name : product?.nameEn}
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
                <Label size={14} multilanguage={false}>
                  {I18nState == 'vi' ? scheme?.name : scheme?.nameEn}
                </Label>
              </Div>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.loailenh`}</Label>
              <Label size={14}>{`createordermodal.mua`}</Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.ngaydatlenh`}</Label>
              <Label size={14} multilanguage={false}>
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
              <Label size={14}>{`createordermodal.sotienmua`}</Label>
              <Label size={14} multilanguage={false}>
                {convertNumber(amount)}
              </Label>
            </RowSpaceItem>
          </Div>
        </Div>
        <Div height={200} />
      </ScrollView>
      <RowSpaceItem paddingHorizontal={29} marginTop={10}>
        <ButtonBorder
          width={148}
          height={48}
          onPress={() => {
            goBack();
            // bottomsheet.current.show();
          }}
          title={`createordermodal.muathem`}
          type={2}
        />
        <ButtonBorder
          width={148}
          onPress={() => {
            // goBack();
            bottomsheet.current.show();
          }}
          height={48}
          title={`createordermodal.hoantat`}
        />
      </RowSpaceItem>
      <Div height={200} />
    </Div>
  );
}

export default React.memo(OrderBuyStep3);
