import styled from 'styled-components';
import {StyleProp, TextStyle} from 'react-native';
import {Text} from 'react-native';
import {ReactFragment} from 'react';
import {heightScale, widthScale, fontScale} from 'utils';
import {Ecolors, Efonts} from 'constant';

type typeColor = '#000000' | '#FFFFFF' | 'red';
type textAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
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

export type ILabelProps = {
  size?: number;
  children?: string | ReactFragment | any;
  color?: string | typeColor | any;
  style?: StyleProp<TextStyle>;
  textAlign?: textAlign;
  numberOfLines?: number;
  fontWeight?: fontWeight;
  multilanguage?: boolean;
  fontFamily?: any;
  lineHeight?: number;
  onPress?: () => void;
  margin?: number | string;
  marginVertical?: number | string;
  marginHorizontal?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  padding?: number | string;
  paddingVertical?: number | string;
  paddingHorizontal?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
};

export const ComponentLable = styled(Text)`
  font-size: ${({size}: ILabelProps) => fontScale(size || 15)}px;
  color: ${({color}: ILabelProps) => color || '#000000'};
  font-weight: ${({fontWeight}: ILabelProps) => fontWeight};
  text-align: ${({textAlign}: ILabelProps) => textAlign || 'left'};
  margin: ${({marginTop, marginRight, marginBottom, marginLeft}: ILabelProps) =>
    `${heightScale(marginTop || 0)}px ${widthScale(
      marginRight || 0,
    )}px ${heightScale(marginBottom || 0)}px ${widthScale(marginLeft || 0)}px`};
  ${({lineHeight}: ILabelProps) =>
    lineHeight && `line-height:${heightScale(lineHeight)}px`}
  ${({fontFamily}: ILabelProps) => fontFamily && `font-family:${fontFamily}`}
`;

ComponentLable.defaultProps = {
  size: 16,
  textAlign: 'left',
  fontWeight: '400',
  color: Ecolors.textColor,
  opacity: 1,
};
