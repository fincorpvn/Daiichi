import React from 'react';

export const toastRef = React.createRef<any>();
interface Params {
  content?: string;
  multilanguage?: boolean;
}

class Toast {
  static show(p?: Params) {
    toastRef.current?.show(p);
  }

  static hide(p: Params) {
    toastRef.current?.hide(p);
  }
}

export default Toast;
