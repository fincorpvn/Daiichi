import {
  Alert,
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
import ComBankContent from 'screens/MainScreen/CreateOrderModal/ComBankContent';
import {goBack, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {
  convertStringVNTime,
  convertNumber,
  convertTimestamp,
  copyToClipboard,
  widthScale,
  widthScreen,
  heightScreen,
} from 'utils';

interface Props {
  product: any;
  amount: any;
  scheme: any;
  currentSession: any;
  bankSuperVisory: any;
  excuseTempVolumn: any;
  stepTimeLine?: number;
  beginBuyAutoStartDate?: string;
  onPre?: (t: number) => void;
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
  isBtn?: boolean;
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
      {p.isBtn ? (
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
      ) : (
        <Div width={61} height={26} />
      )}
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
  beginBuyAutoStartDate,
  excuseTempVolumn,
  onPre,
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
            textAlign={'center'}
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
            borderWidth={0.8}
            borderColor={Ecolors.bordercolor}
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
                <Label textAlign={'right'} multilanguage={false} size={14}>
                  {`${
                    I18nState == 'vi' ? scheme?.name : scheme?.nameEn
                  }`?.replace('(', `\n(`)}
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
                {convertStringVNTime(I18nState)}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15} isBorderBottom={true}>
              <Label size={14}>{`createordermodal.phiengiaodich`}</Label>
              <Label multilanguage={false} size={14}>
                {currentSession?.tradingTimeString || ''}
                {convertStringVNTime(I18nState)}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={15}>
              <Label size={14}>{`createordermodal.sotienmua`}</Label>
              <Label size={14} multilanguage={false}>
                {convertNumber(amount)}
              </Label>
            </RowSpaceItem>
            {scheme && scheme?.productSchemeIsAutoBuy && (
              <>
                <RowSpaceItem marginTop={15}>
                  <Label
                    size={14}>{`createordermodal.tudongtieptucdautu`}</Label>
                  <Label multilanguage={false} size={14}>
                    {I18nState == 'vi' ? 'Có' : 'Yes'}
                  </Label>
                </RowSpaceItem>
                <RowSpaceItem marginTop={8}>
                  <Label
                    size={
                      14
                    }>{`createordermodal.ngaythanhtoanhangthang`}</Label>
                  <Label multilanguage={false} size={14}>
                    {beginBuyAutoStartDate || ''}
                  </Label>
                </RowSpaceItem>
              </>
            )}
          </Div>
        </Div>
        <Div height={100} />
      </ScrollView>
      <RowSpaceItem paddingHorizontal={29} marginTop={10}>
        <ButtonBorder
          width={148}
          height={48}
          onPress={() => {
            onPre && onPre(1);
          }}
          title={`createordermodal.muathem`}
          type={2}
        />
        <ButtonBorder
          width={148}
          onPress={() => {
            // goBack();
            navigate('TransferContentStepModal', {
              bankSuperVisory,
              amount,
              excuseTempVolumn,
              beginBuyAutoStartDate,
              scheme,
              onConfirm: () => {
                goBack();
              },
            });
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
