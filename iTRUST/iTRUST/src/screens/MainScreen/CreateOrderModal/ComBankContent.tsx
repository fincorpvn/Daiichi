import {Button, Div, Label, QRCode} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {useAppSelector} from 'store/hooks';
import {convertNumber, copyToClipboard, Log} from 'utils';
function RowSpaceItem(p: {
  marginTop?: number;
  paddingHorizontal?: number;
  children?: any;
  isBorderBottom?: boolean;
}) {
  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={p.marginTop ?? 0}
        paddingHorizontal={p.paddingHorizontal ?? 0}>
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
  contentCopy?: any;
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
            copyToClipboard(p.contentCopy || p.content);
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

function ComBankContent(p: {
  bankSuperVisory?: any;
  excuseTempVolumn?: any;
  scheme?: any;
  beginBuyAutoStartDate?: any;
  amount?: any;
}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const {
    bankSuperVisory,
    excuseTempVolumn,
    scheme,
    beginBuyAutoStartDate,
    amount,
  } = p;
  const data = {
    amount: amount?.replace(/,/g, ''),
    accountName: bankSuperVisory?.dataBank?.name,
    accountNo: bankSuperVisory?.number,
    transferContent: ` ${excuseTempVolumn?.transferContent}`,
    bankId: bankSuperVisory?.dataBank?.binCode,
    bankName: bankSuperVisory?.dataBank?.name,
  };

  return (
    <Div>
      <Div
        width={'100%'}
        marginTop={9}
        borderRadius={8}
        borderWidth={0.8}
        borderColor={Ecolors.bordercolor}
        backgroundColor={Ecolors.whiteColor}
        paddingHorizontal={20}
        paddingTop={20}
        paddingBottom={24}>
        <ContentCoppy
          title={`createordermodal.tenthuhuong`}
          isBtn={true}
          content={
            I18nState == 'vi'
              ? bankSuperVisory?.name
              : bankSuperVisory?.nameEn || bankSuperVisory?.name
          }
          isBorderBottom={true}
        />
        <ContentCoppy
          marginTop={11}
          isBtn={true}
          title={`createordermodal.sotaikhoan`}
          content={bankSuperVisory?.number || ''}
          isBorderBottom={true}
        />
        <ContentCoppy
          marginTop={11}
          title={`createordermodal.nganhang`}
          isBtn={false}
          content={
            I18nState == 'vi'
              ? bankSuperVisory?.dataBank?.name
              : bankSuperVisory?.dataBank?.nameEn || ''
          }
          isBorderBottom={true}
        />
        <ContentCoppy
          marginTop={11}
          title={`transactionscreen.chinhanh`}
          isBtn={false}
          content={
            I18nState == 'vi'
              ? bankSuperVisory?.branch
              : bankSuperVisory?.branch || ''
          }
          isBorderBottom={true}
        />
        <ContentCoppy
          marginTop={11}
          title={`transactionscreen.sotien`}
          isBtn={true}
          content={convertNumber(amount)}
          contentCopy={amount}
          isBorderBottom={true}
        />
        <ContentCoppy
          marginTop={11}
          isBtn={true}
          isBorderBottom={!!scheme?.productSchemeIsAutoBuy}
          title={`createordermodal.noidung`}
          content={`${excuseTempVolumn?.transferContent}` || ''}
        />

        {scheme && scheme?.productSchemeIsAutoBuy && (
          <>
            <RowSpaceItem marginTop={11}>
              <Label size={14}>{`createordermodal.tudongtieptucdautu`}</Label>
              <Label multilanguage={false} size={14}>
                {I18nState == 'vi' ? 'Có' : 'Yes'}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem marginTop={8}>
              <Label
                size={14}>{`createordermodal.ngaythanhtoanhangthang`}</Label>
              <Label multilanguage={false} size={14}>
                {beginBuyAutoStartDate || ''}
              </Label>
            </RowSpaceItem>
          </>
        )}
      </Div>
      <Div
        flexDirection={'row'}
        marginVertical={15}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Div height={0.8} width={133} backgroundColor={Ecolors.bordercolor} />
        <Label>{`createordermodal.hoac`}</Label>
        <Div height={0.8} width={133} backgroundColor={Ecolors.bordercolor} />
      </Div>
      <QRCode data={data} />
    </Div>
  );
}

export default React.memo(ComBankContent);
