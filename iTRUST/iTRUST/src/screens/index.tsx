export * from './MainScreen';
export * from './UnAuthorized';

import AlertModal from 'components/Alert/AlertModal';
import AlertError from 'components/Alert/AlertError';
import ViewPDF from 'components/ViewPDF';
import DropdownModal from 'components/DropdownModal';
import {fadeInOut, translateYModal} from 'container/optionsNavigate';
import SplashScreen from './SplashScreen';
import SignatureDraw from './MainScreen/DigitalSignature/SignatureDraw';

const stackSplash = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
];

// const alert = {
//   name: 'AlertModal',
//   component: AlertModal,
// };

const componentAction = [
  {
    name: 'DropdownModal',
    component: DropdownModal,
  },
  {
    name: 'AlertModal',
    component: AlertModal,
    options: fadeInOut,
  },
  {
    name: 'AlertError',
    component: AlertError,
    options: fadeInOut,
  },
  {
    name: 'SignatureDraw',
    component: SignatureDraw,
    options: fadeInOut,
  },
  {
    name: 'ViewPDF',
    component: ViewPDF,
    options: translateYModal,
  },
];

export {stackSplash, componentAction};
