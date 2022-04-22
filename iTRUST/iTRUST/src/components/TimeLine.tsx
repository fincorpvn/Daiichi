import {Button, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';

function Btn(p: {isActive?: boolean}) {
  return (
    <Div
      widthHeight={20}
      borderRadius={30}
      backgroundColor={p.isActive ? Ecolors.mainColor : Ecolors.disableColor}
    />
  );
}

function TimeLine(Props: {marginTop?: number; index: number}) {
  return (
    <Div
      paddingHorizontal={50}
      marginTop={Props.marginTop ?? 23}
      paddingBottom={10}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'flex-start'}>
      <Div
        flexDirection={'row'}
        paddingHorizontal={17}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Btn isActive={Props.index > 0} />
        <Div
          flex={1}
          height={2}
          backgroundColor={
            Props.index > 1 ? Ecolors.mainColor : Ecolors.disableColor
          }
        />
        <Btn isActive={Props.index > 1} />
        <Div
          backgroundColor={
            Props.index > 2 ? Ecolors.mainColor : Ecolors.disableColor
          }
          flex={1}
          height={2}
        />
        <Btn isActive={Props.index > 2} />
      </Div>
      <Div
        marginTop={8}
        flexDirection={'row'}
        alignItems={'center'}
        width={'100%'}
        justifyContent={'space-between'}>
        <Label size={14}>{`createordermodal.datlenh`}</Label>
        <Label size={14}>{`createordermodal.xacnhan`}</Label>
        <Label size={14}>{`createordermodal.ketqua`}</Label>
      </Div>
    </Div>
  );
}
export default React.memo(TimeLine);
