import {appScreen} from 'constant/appScreen';
import * as React from 'react';

export const navigationRef: any = React.createRef();
const timeoutref: any = React.createRef();

export function navigate(
  name: appScreen,
  params?: object,
  cancelDebounce?: boolean,
) {
  if (name == 'AlertModal') {
    navigationRef.current?.navigate(name, params);
    return;
  }
  // if (timeoutref.current && !cancelDebounce) {
  //   return;
  // }
  if (__DEV__) {
    console.log('SCEEN:', name);
  }
  navigationRef.current?.navigate(name, params);
  // timeoutref.current = setTimeout(() => {
  //   clearTimeout(timeoutref.current);
  //   timeoutref.current = null;
  // }, 0);
}

export function goBack() {
  if (navigationRef.current) {
    navigationRef.current?.goBack();
  }
}
