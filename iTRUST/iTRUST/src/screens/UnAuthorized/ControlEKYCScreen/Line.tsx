import {Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';

function C(p: {isHideIcon?: boolean}) {
  return (
    <Div
      widthHeight={20}
      borderRadius={20}
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={Ecolors.mainColor}>
      {!p.isHideIcon && (
        <ImageView
          widthHeight={11}
          source={Icons.checkconfirminfo}
          tintColor={Ecolors.whiteColor}
          resizeMode={'contain'}
        />
      )}
    </Div>
  );
}
function L() {
  return (
    <Div
      width={29}
      height={1}
      backgroundColor={Ecolors.mainColor}
      marginHorizontal={4}
    />
  );
}

function Line() {
  return (
    <>
      <Div
        width={'100%'}
        alignItems={'center'}
        flexDirection={'row'}
        justifyContent={'center'}>
        <C />
        <L />
        <C />
        <L />
        <C />
        <L />
        <C isHideIcon={true} />
      </Div>
      <Div
        width={'100%'}
        marginTop={15}
        alignItems={'center'}
        flexDirection={'row'}
        justifyContent={'center'}>
        <Label size={14}>{`reviewinfoscreen.hoantathosodangky`}</Label>
      </Div>
    </>
  );
}

export default React.memo(Line);
