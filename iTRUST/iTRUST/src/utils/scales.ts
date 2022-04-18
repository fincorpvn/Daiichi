/* eslint-disable radix */
import {Dimensions} from 'react-native';

export const screens = Dimensions.get('window');

export const defaultScreen = {
  width: 375,
  height: 812,
};

export const widthScreen =
  screens.width > screens.height ? screens.height : screens.width;
export const heightScreen =
  screens.width < screens.height ? screens.height : screens.width;

export const widthScale = (num: number | string): number => {
  if (!num) {
    return 0;
  }
  if (typeof num === 'string') {
    return parseInt(num);
  }
  return (num * widthScreen) / defaultScreen.width;
};

export const heightScale = (num: number | string): number => {
  if (!num) {
    return 0;
  }
  if (typeof num === 'string') {
    return parseInt(num);
  }
  // return widthScale(num);
  return (num * heightScreen) / defaultScreen.height;
};

export const fontScale = (num: number | string): number => {
  if (!num) {
    return 0;
  }
  if (typeof num === 'string') {
    return parseInt(num);
  }
  return (widthScale(num) + heightScale(num)) / 2;
};
