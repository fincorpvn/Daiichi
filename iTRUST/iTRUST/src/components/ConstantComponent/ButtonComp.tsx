import styled from 'styled-components';
import {
  Animated,
  FlexAlignType,
  GestureResponderEvent,
  NativeSyntheticEvent,
  Pressable,
  PressableAndroidRippleConfig,
  PressableStateCallbackType,
  StyleProp,
  TargetedEvent,
  ViewStyle,
} from 'react-native';
import {heightScale, widthScale} from 'utils';

interface Insets {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface IPropsButton {
  onPress?: null | ((event: GestureResponderEvent) => void);
  onPressIn?: null | ((event: GestureResponderEvent) => void);
  onPressOut?: null | ((event: GestureResponderEvent) => void);
  onLongPress?: null | ((event: GestureResponderEvent) => void);
  onBlur?: null | ((event: NativeSyntheticEvent<TargetedEvent>) => void);
  onFocus?: null | ((event: NativeSyntheticEvent<TargetedEvent>) => void);
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  delayLongPress?: null | number;
  disabled?: null | boolean;
  hitSlop?: null | Insets | number;
  pressRetentionOffset?: null | Insets | number;
  android_disableSound?: null | boolean;
  android_ripple?: null | PressableAndroidRippleConfig;
  testOnly_pressed?: null | boolean;
  // view style
  backfaceVisibility?: 'visible' | 'hidden';
  backgroundColor?: string;
  borderBottomColor?: string;
  borderBottomEndRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomStartRadius?: number;
  borderColor?: string;
  borderEndColor?: string;
  borderLeftColor?: string;
  borderRadius?: number;
  borderRightColor?: string;
  borderStartColor?: string;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderTopColor?: string;
  borderTopEndRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderTopStartRadius?: number;
  opacity?: number;
  testID?: string;
  elevation?: number;
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  alignItems?: FlexAlignType;
  alignSelf?: 'auto' | FlexAlignType;
  aspectRatio?: number;
  borderBottomWidth?: number;
  borderEndWidth?: number | string;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderStartWidth?: number | string;
  borderTopWidth?: number;
  borderWidth?: number;
  bottom?: number | string;
  display?: 'none' | 'flex';
  end?: number | string;
  flex?: number;
  flexBasis?: number | string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  height?: number | string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  left?: number | string;
  margin?: number | string;
  marginBottom?: number | string;
  marginEnd?: number | string;
  marginHorizontal?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginStart?: number | string;
  marginTop?: number | string;
  marginVertical?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  overflow?: 'visible' | 'hidden' | 'scroll';
  padding?: number | string;
  paddingBottom?: number | string;
  paddingEnd?: number | string;
  paddingHorizontal?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingStart?: number | string;
  paddingTop?: number | string;
  paddingVertical?: number | string;
  position?: 'absolute' | 'relative';
  right?: number | string;
  start?: number | string;
  top?: number | string;
  width?: number | string;
  zIndex?: number;
  // shadow
  direction?: 'inherit' | 'ltr' | 'rtl';
  shadowColor?: string;
  shadowOffset?: {width: number; height: number};
  shadowOpacity?: number;
  shadowRadius?: number;
  widthHeight?: number;
  heightWidth?: number;
  shadow?: boolean;
  //
  style?: StyleProp<ViewStyle>;
  buttonRef?: any;
  isScale?: boolean;
}

export const ComponentButton = styled(Pressable)`
  ${({opacity}: IPropsButton) => `opacity:${opacity || 1}`};
  ${({flex}: IPropsButton) => flex && `flex:${flex || 1}`};
  ${({flexDirection}: IPropsButton) =>
    flexDirection && `flex-direction:${flexDirection}`};
  ${({alignItems}: IPropsButton) => alignItems && `align-items:${alignItems}`};
  ${({justifyContent}: IPropsButton) =>
    justifyContent && `justify-content:${justifyContent}`};
  ${({alignContent}: IPropsButton) =>
    alignContent && `align-content:${alignContent}`};
  ${({alignSelf}: IPropsButton) => alignSelf && `align-self:${alignSelf}`};

  ${({width}: IPropsButton) =>
    width &&
    `width:${typeof width == 'string' ? width : `${widthScale(width)}px`}`};
  ${({height}: IPropsButton) =>
    height &&
    `height:${
      typeof height == 'string' ? height : `${heightScale(height)}px`
    }`};
  ${({minWidth}: IPropsButton) =>
    minWidth &&
    `min-width:${
      typeof minWidth == 'string' ? minWidth : `${widthScale(minWidth)}px`
    }`};
  ${({minHeight}: IPropsButton) =>
    minHeight &&
    `min-height:${
      typeof minHeight == 'string' ? minHeight : `${heightScale(minHeight)}px`
    }`};
  ${({maxWidth}: IPropsButton) =>
    maxWidth &&
    `max-width:${
      typeof maxWidth == 'string' ? maxWidth : `${widthScale(maxWidth)}px`
    }`};
  ${({maxHeight}: IPropsButton) =>
    maxHeight &&
    `max-height:${
      typeof maxHeight == 'string' ? maxHeight : `${heightScale(maxHeight)}px`
    }`};

  ${({widthHeight}: IPropsButton) =>
    widthHeight &&
    `width:${widthScale(widthHeight || 0)}px; height:${widthScale(
      widthHeight || 0,
    )}px`};

  ${({heightWidth}: IPropsButton) =>
    heightWidth &&
    `width:${heightScale(heightWidth || 0)}px; height:${heightScale(
      heightWidth || 0,
    )}px`};

  padding: ${({
    paddingTop,
    paddingLeft,
    paddingBottom,
    paddingRight,
  }: IPropsButton) =>
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
  margin: ${({
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
  }: IPropsButton) =>
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

  ${({backgroundColor}: IPropsButton) =>
    `background-color:${backgroundColor || 'transparent'}`};

  ${({borderWidth}: IPropsButton) =>
    borderWidth && `border-width:${widthScale(borderWidth || 0)}px`};
  ${({borderTopWidth}: IPropsButton) =>
    borderTopWidth && `border-top-width:${widthScale(borderTopWidth || 0)}px`};
  ${({borderBottomWidth}: IPropsButton) =>
    borderBottomWidth &&
    `border-bottom-width:${widthScale(borderBottomWidth || 0)}px`};
  ${({borderLeftWidth}: IPropsButton) =>
    borderLeftWidth &&
    `border-left-width:${widthScale(borderLeftWidth || 0)}px`};
  ${({borderRightWidth}: IPropsButton) =>
    borderRightWidth &&
    `border-right-width:${widthScale(borderRightWidth || 0)}px`};

  ${({borderColor}: IPropsButton) =>
    borderColor && `border-color:${borderColor}`};
  ${({borderTopColor}: IPropsButton) =>
    borderTopColor && `border-top-color:${borderTopColor}`};
  ${({borderLeftColor}: IPropsButton) =>
    borderLeftColor && `border-left-color:${borderLeftColor}`};
  ${({borderRightColor}: IPropsButton) =>
    borderRightColor && `border-right-color:${borderRightColor}`};
  ${({borderBottomColor}: IPropsButton) =>
    borderBottomColor && `border-bottom-color:${borderBottomColor}`};

  ${({borderRadius}: IPropsButton) =>
    borderRadius && `border-radius:${widthScale(borderRadius || 0)}px`};
  ${({borderBottomLeftRadius}: IPropsButton) =>
    borderBottomLeftRadius &&
    `border-bottom-left-radius:${widthScale(borderBottomLeftRadius || 0)}px`};
  ${({borderBottomRightRadius}: IPropsButton) =>
    borderBottomRightRadius &&
    `border-bottom-right-radius:${widthScale(borderBottomRightRadius || 0)}px`};
  ${({borderTopLeftRadius}: IPropsButton) =>
    borderTopLeftRadius &&
    `border-top-left-radius:${widthScale(borderTopLeftRadius || 0)}px`};
  ${({borderTopRightRadius}: IPropsButton) =>
    borderTopRightRadius &&
    `border-top-right-radius:${widthScale(borderTopRightRadius || 0)}px`};
  ${({borderStyle}: IPropsButton) =>
    borderStyle && `border-style:${borderStyle}`};

  ${({zIndex}: IPropsButton) => zIndex && `z-index:${zIndex}`};
  ${({position}: IPropsButton) => position && `position:${position}`};
  ${({elevation}: IPropsButton) => elevation && `elevation:${elevation}`};
  ${({shadow}: IPropsButton) => shadow && `box-shadow: 10px 10px 10px #888888`};

  ${({overflow}: IPropsButton) => overflow && `overflow:${overflow}`};
  ${({display}: IPropsButton) => display && `display:${display}`};
  ${({flexGrow}: IPropsButton) => flexGrow && `flex-grow:${flexGrow}`};
  ${({flexShrink}: IPropsButton) => flexShrink && `flex-shrink:${flexShrink}`};
  ${({flexWrap}: IPropsButton) => flexWrap && `flex-wrap:${flexWrap}`};

  ${({left}: IPropsButton) => left && `left:${widthScale(left || 0)}px`};
  ${({right}: IPropsButton) => right && `left:${widthScale(right || 0)}px`};
  ${({top}: IPropsButton) => top && `left:${heightScale(top || 0)}px`};
  ${({bottom}: IPropsButton) => bottom && `left:${heightScale(bottom || 0)}px`};
`;
