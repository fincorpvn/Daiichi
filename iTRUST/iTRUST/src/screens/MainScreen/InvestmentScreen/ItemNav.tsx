import {Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {convertNumber} from 'utils';

function ItemNav(p: {item: any}) {
  return (
    <Div
      paddingHorizontal={16}
      height={55}
      paddingVertical={5}
      justifyContent={'space-between'}
      width={'100%'}>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Label
          size={14}
          color={Ecolors.grayColor}>{`investmentscreen.phiengiaodich`}</Label>
        <Label
          size={14}
          color={Ecolors.grayColor}>{`investmentscreen.navccq`}</Label>
      </Div>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Label size={14} multilanguage={false}>
          {p.item.navDate}
        </Label>
        <Label multilanguage={false} size={14}>
          {convertNumber(p.item.nav)}
        </Label>
      </Div>
    </Div>
  );
}

export default React.memo(ItemNav);
