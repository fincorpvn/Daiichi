import {appScreen} from 'constant/appScreen';
import * as React from 'react';

export const navigationRef: any = React.createRef();
const timeoutref: any = React.createRef();

export function navigate(
  name: appScreen,
  params?: object,
  cancelDebounce?: boolean,
) {
  return new Promise((rs, rj) => {
    if (name == 'AlertModal') {
      navigationRef.current?.navigate(name, params);
      rs('');
      return;
    }
    // if (timeoutref.current && !cancelDebounce) {
    //   return;
    // }
    if (__DEV__) {
      console.log('SCEEN:', name);
    }
    navigationRef.current?.navigate(name, params);
    rs('');
    return '';
  });
  // timeoutref.current = setTimeout(() => {
  //   clearTimeout(timeoutref.current);
  //   timeoutref.current = null;
  // }, 0);
}
export function goBack() {
  return new Promise((rs, rj) => {
    if (navigationRef.current) {
      navigationRef.current?.goBack();
    }
    rs('');
    return '';
  });
}
