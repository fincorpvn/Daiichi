import React from 'react';
import styled from 'styled-components/native';
import {
  FlexAlignType,
  LayoutChangeEvent,
  PressableAndroidRippleConfig,
  PressableStateCallbackType,
  View,
  ViewStyle,
  Image,
  ImageResizeMode,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageSourcePropType,
  ImageURISource,
  StyleProp,
} from 'react-native';
import {heightScale, widthScale} from 'utils';

interface Insets {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface IImageProps {
  progressiveRenderingEnabled?: boolean;
  resizeMode?: ImageResizeMode;
  resizeMethod?: 'auto' | 'resize' | 'scale';
  source: ImageSourcePropType;
  loadingIndicatorSource?: ImageURISource;
  nativeID?: string;
  defaultSource?: ImageURISource | number;
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
  tintColor?: string;
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
  imageRef?: any;

  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;
  onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  onLoadEnd?: () => void;
  onLoadStart?: () => void;
}

export const ComponentImage = styled(Image)`
  ${({opacity}: IImageProps) => `opacity:${opacity || 1}`};
  ${({flex}: IImageProps) => flex && `flex:${flex || 1}`};
  ${({flexDirection}: IImageProps) =>
    flexDirection && `flex-direction:${flexDirection}`};
  ${({alignItems}: IImageProps) => alignItems && `align-items:${alignItems}`};
  ${({justifyContent}: IImageProps) =>
    justifyContent && `justify-content:${justifyContent}`};
  ${({alignContent}: IImageProps) =>
    alignContent && `align-content:${alignContent}`};
  ${({alignSelf}: IImageProps) => alignSelf && `align-self:${alignSelf}`};

  ${({width}: IImageProps) =>
    width &&
    `width:${typeof width == 'string' ? width : `${widthScale(width)}px`}`};
  ${({height}: IImageProps) =>
    height &&
    `height:${
      typeof height == 'string' ? height : `${heightScale(height)}px`
    }`};
  ${({minWidth}: IImageProps) =>
    minWidth &&
    `min-width:${
      typeof minWidth == 'string' ? minWidth : `${widthScale(minWidth)}px`
    }`};
  ${({minHeight}: IImageProps) =>
    minHeight &&
    `min-height:${
      typeof minHeight == 'string' ? minHeight : `${heightScale(minHeight)}px`
    }`};
  ${({maxWidth}: IImageProps) =>
    maxWidth &&
    `max-width:${
      typeof maxWidth == 'string' ? maxWidth : `${widthScale(maxWidth)}px`
    }`};
  ${({maxHeight}: IImageProps) =>
    maxHeight &&
    `max-height:${
      typeof maxHeight == 'string' ? maxHeight : `${heightScale(maxHeight)}px`
    }`};

  ${({widthHeight}: IImageProps) =>
    widthHeight &&
    `width:${widthScale(widthHeight || 0)}px; height:${widthScale(
      widthHeight || 0,
    )}px`};
  ${({heightWidth}: IImageProps) =>
    heightWidth &&
    `width:${heightScale(heightWidth || 0)}px; height:${heightScale(
      heightWidth || 0,
    )}px`};

  padding: ${({
    paddingTop,
    paddingLeft,
    paddingBottom,
    paddingRight,
  }: IImageProps) =>
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
  margin: ${({marginTop, marginLeft, marginRight, marginBottom}: IImageProps) =>
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
        : `${heightScale(marginBottom || 0)}px 
      ${
        typeof marginLeft == 'string'
          ? marginLeft
          : `${widthScale(marginLeft || 0)}px`
      }`
    }`};

  ${({backgroundColor}: IImageProps) =>
    `background-color:${backgroundColor || 'transparent'}`};

  ${({borderWidth}: IImageProps) =>
    borderWidth && `border-width:${widthScale(borderWidth || 0)}px`};
  ${({borderTopWidth}: IImageProps) =>
    borderTopWidth && `border-top-width:${widthScale(borderTopWidth || 0)}px`};
  ${({borderBottomWidth}: IImageProps) =>
    borderBottomWidth &&
    `border-bottom-width:${widthScale(borderBottomWidth || 0)}px`};
  ${({borderLeftWidth}: IImageProps) =>
    borderLeftWidth &&
    `border-left-width:${widthScale(borderLeftWidth || 0)}px`};
  ${({borderRightWidth}: IImageProps) =>
    borderRightWidth &&
    `border-right-width:${widthScale(borderRightWidth || 0)}px`};

  ${({borderColor}: IImageProps) =>
    borderColor && `border-color:${borderColor}`};
  ${({borderTopColor}: IImageProps) =>
    borderTopColor && `border-top-color:${borderTopColor}`};
  ${({borderLeftColor}: IImageProps) =>
    borderLeftColor && `border-left-color:${borderLeftColor}`};
  ${({borderRightColor}: IImageProps) =>
    borderRightColor && `border-right-color:${borderRightColor}`};
  ${({borderBottomColor}: IImageProps) =>
    borderBottomColor && `border-bottom-color:${borderBottomColor}`};

  ${({borderRadius}: IImageProps) =>
    borderRadius && `border-radius:${widthScale(borderRadius || 0)}px`};
  ${({borderBottomLeftRadius}: IImageProps) =>
    borderBottomLeftRadius &&
    `border-bottom-left-radius:${widthScale(borderBottomLeftRadius || 0)}px`};
  ${({borderBottomRightRadius}: IImageProps) =>
    borderBottomRightRadius &&
    `border-bottom-right-radius:${widthScale(borderBottomRightRadius || 0)}px`};
  ${({borderTopLeftRadius}: IImageProps) =>
    borderTopLeftRadius &&
    `border-top-left-radius:${widthScale(borderTopLeftRadius || 0)}px`};
  ${({borderTopRightRadius}: IImageProps) =>
    borderTopRightRadius &&
    `border-top-right-radius:${widthScale(borderTopRightRadius || 0)}px`};
  ${({borderStyle}: IImageProps) =>
    borderStyle && `border-style:${borderStyle}`};

  ${({zIndex}: IImageProps) => zIndex && `z-index:${zIndex}`};
  ${({position}: IImageProps) => position && `position:${position}`};
  ${({elevation}: IImageProps) => elevation && `elevation:${elevation}`};
  ${({shadow}: IImageProps) => shadow && `box-shadow: 10px 10px 10px #888888`};

  ${({overflow}: IImageProps) => overflow && `overflow:${overflow}`};
  ${({display}: IImageProps) => display && `display:${display}`};
  ${({flexGrow}: IImageProps) => flexGrow && `flex-grow:${flexGrow}`};
  ${({flexShrink}: IImageProps) => flexShrink && `flex-shrink:${flexShrink}`};
  ${({flexWrap}: IImageProps) => flexWrap && `flex-wrap:${flexWrap}`};

  ${({left}: IImageProps) => left && `left:${widthScale(left || 0)}px`};
  ${({right}: IImageProps) => right && `left:${widthScale(right || 0)}px`};
  ${({top}: IImageProps) => top && `left:${heightScale(top || 0)}px`};
  ${({bottom}: IImageProps) => bottom && `left:${heightScale(bottom || 0)}px`};
  ${({tintColor}: IImageProps) => tintColor && `tintColor:${tintColor}`};
`;
