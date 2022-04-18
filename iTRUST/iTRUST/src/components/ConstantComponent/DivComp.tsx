import styled from 'styled-components/native';
import {
  FlexAlignType,
  LayoutChangeEvent,
  PressableAndroidRippleConfig,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {heightScale, heightScreen, widthScale, widthScreen} from 'utils';
import React from 'react';
import {Ecolors} from 'constant';

interface Insets {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface IPropsDiv {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  onLayout?: (event: LayoutChangeEvent) => void;
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
  shadow?: boolean;
  //
  widthHeight?: number;
  heightWidth?: number;
  style?: StyleProp<ViewStyle>;
  divRef?: any;
  screen?: boolean;
  useKeyboard?: boolean;
}

export const ComponentDiv = styled.View`
  ${({opacity}: IPropsDiv) => `opacity:${opacity || 1}`};
  ${({flex}: IPropsDiv) => flex && `flex:${flex || 1}`};
  ${({flexDirection}: IPropsDiv) =>
    flexDirection && `flex-direction:${flexDirection}`};
  ${({alignItems}: IPropsDiv) => alignItems && `align-items:${alignItems}`};
  ${({justifyContent}: IPropsDiv) =>
    justifyContent && `justify-content:${justifyContent}`};
  ${({alignContent}: IPropsDiv) =>
    alignContent && `align-content:${alignContent}`};
  ${({alignSelf}: IPropsDiv) => alignSelf && `align-self:${alignSelf}`};

  ${({width}: IPropsDiv) =>
    width &&
    `width:${typeof width == 'string' ? width : `${widthScale(width)}px`}`};
  ${({height}: IPropsDiv) =>
    height &&
    `height:${
      typeof height == 'string' ? height : `${heightScale(height)}px`
    }`};
  ${({minWidth}: IPropsDiv) =>
    minWidth &&
    `min-width:${
      typeof minWidth == 'string' ? minWidth : `${widthScale(minWidth)}px`
    }`};
  ${({minHeight}: IPropsDiv) =>
    minHeight &&
    `min-height:${
      typeof minHeight == 'string' ? minHeight : `${heightScale(minHeight)}px`
    }`};
  ${({maxWidth}: IPropsDiv) =>
    maxWidth &&
    `max-width:${
      typeof maxWidth == 'string' ? maxWidth : `${widthScale(maxWidth)}px`
    }`};
  ${({maxHeight}: IPropsDiv) =>
    maxHeight &&
    `max-height:${
      typeof maxHeight == 'string' ? maxHeight : `${heightScale(maxHeight)}px`
    }`};

  ${({widthHeight}: IPropsDiv) =>
    widthHeight &&
    `width:${widthScale(widthHeight || 0)}px; height:${widthScale(
      widthHeight || 0,
    )}px`};

  ${({heightWidth}: IPropsDiv) =>
    heightWidth &&
    `width:${heightScale(heightWidth || 0)}px; height:${heightScale(
      heightWidth || 0,
    )}px`};

  padding: ${({
    paddingTop,
    paddingLeft,
    paddingBottom,
    paddingRight,
  }: IPropsDiv) =>
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
  margin: ${({marginTop, marginLeft, marginRight, marginBottom}: IPropsDiv) =>
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

  ${({borderWidth}: IPropsDiv) =>
    borderWidth && `border-width:${widthScale(borderWidth || 0)}px`};
  ${({borderTopWidth}: IPropsDiv) =>
    borderTopWidth && `border-top-width:${widthScale(borderTopWidth || 0)}px`};
  ${({borderBottomWidth}: IPropsDiv) =>
    borderBottomWidth &&
    `border-bottom-width:${widthScale(borderBottomWidth || 0)}px`};
  ${({borderLeftWidth}: IPropsDiv) =>
    borderLeftWidth &&
    `border-left-width:${widthScale(borderLeftWidth || 0)}px`};
  ${({borderRightWidth}: IPropsDiv) =>
    borderRightWidth &&
    `border-right-width:${widthScale(borderRightWidth || 0)}px`};

  ${({borderColor}: IPropsDiv) => borderColor && `border-color:${borderColor}`};
  ${({borderTopColor}: IPropsDiv) =>
    borderTopColor && `border-top-color:${borderTopColor}`};
  ${({borderLeftColor}: IPropsDiv) =>
    borderLeftColor && `border-left-color:${borderLeftColor}`};
  ${({borderRightColor}: IPropsDiv) =>
    borderRightColor && `border-right-color:${borderRightColor}`};
  ${({borderBottomColor}: IPropsDiv) =>
    borderBottomColor && `border-bottom-color:${borderBottomColor}`};

  ${({borderRadius}: IPropsDiv) =>
    borderRadius && `border-radius:${widthScale(borderRadius || 0)}px`};
  ${({borderBottomLeftRadius}: IPropsDiv) =>
    borderBottomLeftRadius &&
    `border-bottom-left-radius:${widthScale(borderBottomLeftRadius || 0)}px`};
  ${({borderBottomRightRadius}: IPropsDiv) =>
    borderBottomRightRadius &&
    `border-bottom-right-radius:${widthScale(borderBottomRightRadius || 0)}px`};
  ${({borderTopLeftRadius}: IPropsDiv) =>
    borderTopLeftRadius &&
    `border-top-left-radius:${widthScale(borderTopLeftRadius || 0)}px`};
  ${({borderTopRightRadius}: IPropsDiv) =>
    borderTopRightRadius &&
    `border-top-right-radius:${widthScale(borderTopRightRadius || 0)}px`};
  ${({borderStyle}: IPropsDiv) => borderStyle && `border-style:${borderStyle}`};

  ${({zIndex}: IPropsDiv) => zIndex && `z-index:${zIndex}`};
  ${({position}: IPropsDiv) => position && `position:${position}`};
  ${({elevation}: IPropsDiv) => elevation && `elevation:${elevation}`};
  ${({shadow}: IPropsDiv) =>
    shadow && `box-shadow: 10px 10px 10px ${Ecolors.grayColor}`};

  ${({overflow}: IPropsDiv) => overflow && `overflow:${overflow}`};
  ${({display}: IPropsDiv) => display && `display:${display}`};
  ${({flexGrow}: IPropsDiv) => flexGrow && `flex-grow:${flexGrow}`};
  ${({flexShrink}: IPropsDiv) => flexShrink && `flex-shrink:${flexShrink}`};
  ${({flexWrap}: IPropsDiv) => flexWrap && `flex-wrap:${flexWrap}`};

  ${({left}: IPropsDiv) => left && `left:${widthScale(left || 0)}px`};
  ${({right}: IPropsDiv) => right && `left:${widthScale(right || 0)}px`};
  ${({top}: IPropsDiv) => top && `left:${heightScale(top || 0)}px`};
  ${({bottom}: IPropsDiv) => bottom && `left:${heightScale(bottom || 0)}px`};
  ${({backgroundColor}: IPropsDiv) =>
    `background-color:${backgroundColor || 'transparent'}`};
  ${({screen}: IPropsDiv) =>
    screen && `width:${widthScreen}px ; height:${heightScreen}px`};
`;
