import {Ecolors, Efonts} from 'constant';
import React from 'react';
import {useAppSelector} from 'store/hooks';
import {parseMargin, parsePadding} from 'utils/parseOptions';
import {ComponentInput, IInputProps} from './ConstantComponent/InputComp';
/**
 *
 * @param props
 * padding
 * margin
 * value
 * placehoder
 * placehodertextcolor
 * color
 * fontsize
 * fontweight
 * onchangetext
 * inputref
 * @returns
 */
function Input(props: IInputProps): JSX.Element {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  return (
    <ComponentInput
      {...parsePadding(props)}
      {...parseMargin(props)}
      ref={props.inputRef && props.inputRef}
      {...props}>
      {props.children}
    </ComponentInput>
  );
}
Input.defaultProps = {
  fontSize: 16,
  color: Ecolors.textColor,
  padding: 0,
  margin: 0,
  fontFamily: Efonts.medium,
  textDecoration: 'none',
  autoCorrect: false,
  spellCheck: false,
  keyboardType: 'default',
  returnKeyType: 'done',
  underlineColorAndroid: 'transparent',
  autoComplete: 'off',
};

export default React.memo(Input);
