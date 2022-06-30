import {StyleSheet, Appearance} from 'react-native';

export enum WhiteColor {
  textColor = '#231F20',
  linkColor = '#5046BB',
  focusColor = '#0E85D9',
  whiteColor = '#FFFFFF',
  grayColor = '#C4C5CE',
  mainColor = '#8A7864',
  mainColorSpace = '#8A7864',
  bordercolor = '#D0C4B3',
  disableColor = '#EFE8DF',
  greenColor = '#16C79A',
  redColor = '#ED1C24',
  growColor = '#00BC08',
  yellowColor = '#FEE005',
  spaceColor = '#EFE8DF',
  blue = '#007bff',
  bgtime = '#F0F0F0',
  red = 'red',
  gray = 'gray',
  gray2x = 'rgba(0,0,0,0.3)',
  gray3x = '#e0e0e0',
  green = '#3cbc98',
  black = '#000000',
  white = '#ffffff',
  placeHoderColor = '#888888',
  transparentLoading = 'rgba(0,0,0,0.2)',
  transparent = 'transparent',
}
export enum DarkColor {
  textColor = '#FFFFFF',
  focusColor = '#4955A3',
  linkColor = '#239AD6',
  whiteColor = '#000000',
  grayColor = '#C4C5CE',
  mainColor = '#4955A3',
  mainColorSpace = '#383C59',
  disableColor = '#E9EAEF',
  greenColor = '#16C79A',
  redColor = '#FF0000',
  growColor = '#00BC08',
  yellowColor = '#FEE005',
  spaceColor = '#E9EAEF',
  blue = '#007bff',
  red = 'red',
  gray = 'gray',
  gray2x = 'rgba(0,0,0,0.3)',
  gray3x = '#e0e0e0',
  green = '#3cbc98',
  black = '#000000',
  white = '#ffffff',
  placeHoderColor = '#888888',
  transparentLoading = 'rgba(0,0,0,0.2)',
  transparent = 'transparent',
}

export const Ecolors =
  Appearance.getColorScheme() === 'dark' ? WhiteColor : WhiteColor;

export enum Efonts {
  bold = 'Roboto-Bold',
  medium = 'Roboto',
  italic = 'Roboto-Italic',
}

export const EStyle = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  shadowItem: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
  },
});
