import {Button, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {getProductFocus} from 'reducer/investment';
import {useAppSelector} from 'store/hooks';
import {convertNumber, convertPercent, linkToWeb, Log} from 'utils';

function ComNav(p: {string: string; date?: string; value: string | number}) {
  return (
    <Div
      width={108}
      borderRadius={8}
      height={90}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={10}
      backgroundColor={Ecolors.spaceColor}>
      <Div flex={1}>
        <Label size={14}>{p.string ?? ''}</Label>
        {p.date && (
          <Label multilanguage={false} size={14}>
            {p.date ?? ''}
          </Label>
        )}
      </Div>
      <Label fontWeight={'700'} multilanguage={false}>
        {convertNumber(p.value ?? '')}
      </Label>
    </Div>
  );
}

function NavChange() {
  const productDetails = useAppSelector(state => getProductFocus(state));
  const {
    tradingDayOfNavCurrently,
    navPercent,
    navMax,
    navMin,
    navCurrently,
    website,
  } = productDetails;
  return (
    <Div>
      {/* nav change */}
      <Div
        paddingHorizontal={16}
        paddingTop={19}
        paddingBottom={16}
        borderBottomWidth={1}
        borderBottomColor={Ecolors.spaceColor}
        flexDirection={'row'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}>
        <Div>
          <Label
            size={16}
            fontWeight={'700'}>{`investmentscreen.thaydoisovoidaunam`}</Label>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            marginTop={3}
            justifyContent={'flex-start'}>
            <Label size={14}>{`investmentscreen.taingay`}</Label>
            <Label multilanguage={false}>{` ${
              tradingDayOfNavCurrently ?? ''
            }`}</Label>
          </Div>
        </Div>
        <Div>
          <Label
            multilanguage={false}
            color={
              navPercent && navPercent < 0
                ? Ecolors.redColor
                : Ecolors.greenColor
            }
            size={18}
            fontWeight={'700'}>
            {navPercent >= 0 && '+'}
            {`${convertPercent(navPercent)}`}
          </Label>
        </Div>
      </Div>
      {/* link to web */}
      <Div
        paddingHorizontal={16}
        paddingTop={19}
        paddingBottom={16}
        borderBottomWidth={1}
        borderBottomColor={Ecolors.spaceColor}
        flexDirection={'row'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}>
        <Label fontWeight={'700'}>{`investmentscreen.thongtinquy`}</Label>
        <Button
          onPress={() => {
            linkToWeb(website);
          }}>
          <Label
            color={Ecolors.linkColor}
            size={14}>{`investmentscreen.xemchitiet`}</Label>
        </Button>
      </Div>
      {/* nav cur */}
      <Label
        marginTop={16}
        marginHorizontal={16}
        fontWeight={'700'}>{`investmentscreen.giatriNAVCCQ`}</Label>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingTop={11}
        borderBottomWidth={1}
        paddingBottom={23}
        borderBottomColor={Ecolors.spaceColor}
        paddingHorizontal={16}>
        <ComNav
          string={`investmentscreen.NAVtaingay`}
          date={tradingDayOfNavCurrently}
          value={navCurrently}
        />
        <ComNav string={`investmentscreen.NAVcaonhat`} value={navMax} />
        <ComNav string={`investmentscreen.NAVthapnhat`} value={navMin} />
      </Div>
    </Div>
  );
}

export default React.memo(NavChange);
