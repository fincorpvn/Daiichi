import {Button} from 'components';
import React from 'react';
import {Keyboard} from 'react-native';
import {parseMargin, parsePadding} from 'utils/parseOptions';
import {ComponentDiv, IPropsDiv} from './ConstantComponent/DivComp';
// readme

function Div(props: IPropsDiv) {
  if (props.useKeyboard) {
    return (
      <Button
        isScale={false}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ComponentDiv
          {...parsePadding(props)}
          {...parseMargin(props)}
          {...props}
          ref={props.divRef && props.divRef}>
          {props.children && props.children}
        </ComponentDiv>
      </Button>
    );
  }
  return (
    <ComponentDiv
      {...parsePadding(props)}
      {...parseMargin(props)}
      {...props}
      ref={props.divRef && props.divRef}>
      {props.children && props.children}
    </ComponentDiv>
  );
}

export default React.memo(Div);
