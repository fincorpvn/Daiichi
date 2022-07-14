import {
  ColorValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  PressableStateCallbackType,
  ReturnKeyTypeOptions,
  StyleProp,
  TextInputChangeEventData,
  TextInputContentSizeChangeEventData,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  TextInputScrollEventData,
  TextInputSelectionChangeEventData,
  TextInputSubmitEditingEventData,
  TextInputTextInputEventData,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
type fontWeight =
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
import styled from 'styled-components';
import {heightScale, widthScale, fontScale} from 'utils';
import {Ecolors, Efonts} from 'constant';

export interface IInputProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode)
    | any;
  allowFontScaling?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: any;
  underlineColorAndroid?: any;
  spellCheck?: any;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  caretHidden?: boolean;
  contextMenuHidden?: boolean;
  defaultValue?: string;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onChangeText?: (text: string) => void;
  onContentSizeChange?: (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  onPressIn?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onSelectionChange?: (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  onTextInput?: (e: NativeSyntheticEvent<TextInputTextInputEventData>) => void;
  onScroll?: (e: NativeSyntheticEvent<TextInputScrollEventData>) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  selectTextOnFocus?: boolean;
  selection?: {start: number; end?: number};
  selectionColor?: ColorValue;
  textAlign?: 'left' | 'center' | 'right';
  testID?: string;
  inputAccessoryViewID?: string;
  value?: string;
  maxFontSizeMultiplier?: number | null;
  fontSize?: number;
  fontWeight?: fontWeight;
  color?: string;
  backgroundColor?: string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  margin?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  inputRef?: any;
  flex?: number;
  numberOfLine?: number;
  fontFamily?: any;
  style?: StyleProp<ViewStyle>;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
}

export const ComponentInput = styled(TextInput)`
  font-size: ${({fontSize}: IInputProps) => fontScale(fontSize || 15)}px;
  font-weight: ${({fontWeight}: IInputProps) => fontWeight || '400'};
  color: ${({color}: IInputProps) => color || '#000000'};
  ${({backgroundColor}: IInputProps) =>
    backgroundColor && `background-color:${backgroundColor}`};
  padding: ${({
    paddingTop,
    paddingLeft,
    paddingBottom,
    paddingRight,
  }: IInputProps) =>
    ` ${
      typeof paddingTop == 'string'
        ? paddingTop
        : `${heightScale(paddingTop || 0)}px`
    } ${
      typeof paddingRight == 'string'
        ? paddingRight
        : `${widthScale(paddingRight || 0)}px`
    } ${
      typeof paddingBottom == 'string'
        ? paddingBottom
        : `${heightScale(paddingBottom || 0)}px ${
            typeof paddingLeft == 'string'
              ? paddingLeft
              : `${widthScale(paddingLeft || 0)}px`
          }`
    }`};
  margin: ${({marginTop, marginLeft, marginRight, marginBottom}: IInputProps) =>
    ` ${
      typeof marginTop == 'string'
        ? marginTop
        : `${heightScale(marginTop || 0)}px`
    } ${
      typeof marginRight == 'string'
        ? marginRight
        : `${widthScale(marginRight || 0)}px`
    } ${
      typeof marginBottom == 'string'
        ? marginBottom
        : `${heightScale(marginBottom || 0)}px ${
            typeof marginLeft == 'string'
              ? marginLeft
              : `${widthScale(marginLeft || 0)}px`
          }`
    }`};

  ${({width}: IInputProps) =>
    width &&
    `width:${typeof width == 'string' ? width : `${widthScale(width)}px`}`};
  ${({height}: IInputProps) =>
    height &&
    `height:${
      typeof height == 'string' ? height : `${heightScale(height)}px`
    }`};
  ${({minWidth}: IInputProps) =>
    minWidth &&
    `min-width:${
      typeof minWidth == 'string' ? minWidth : `${widthScale(minWidth)}px`
    }`};
  ${({minHeight}: IInputProps) =>
    minHeight &&
    `min-height:${
      typeof minHeight == 'string' ? minHeight : `${heightScale(minHeight)}px`
    }`};
  ${({maxWidth}: IInputProps) =>
    maxWidth &&
    `max-width:${
      typeof maxWidth == 'string' ? maxWidth : `${widthScale(maxWidth)}px`
    }`};
  ${({maxHeight}: IInputProps) =>
    maxHeight &&
    `max-height:${
      typeof maxHeight == 'string' ? maxHeight : `${heightScale(maxHeight)}px`
    }`};
  ${({flex}: IInputProps) => flex && `flex:${flex}`};
  ${({fontFamily}: IInputProps) => fontFamily && `font-family:${fontFamily}`}
`;
