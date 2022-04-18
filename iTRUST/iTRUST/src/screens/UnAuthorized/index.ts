import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import OtpRequestModal from './OtpRequestModal';
import ControlEKYCScreen from './ControlEKYCScreen';
import ReviewInfoModal from './ControlEKYCScreen/ReviewInfoModal';
import ActiveAccountModal from './ActiveAccountModal';
import SetPasswordScreen from './SetPasswordScreen';
import EditBankInfoModal from '../MainScreen/AccountVerifyScreen/EditBankInfoModal';

const screens: any = {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  OtpRequestModal,
  SetPasswordScreen,
  ControlEKYCScreen,
  ActiveAccountModal,
  EditBankInfoModal,
  ReviewInfoModal,
};

const stackUnAuthorizedScreen = Object.keys(screens)
  .filter(a => !a.includes('modal') && !a.includes('Modal'))
  .map(item => {
    return {
      name: item,
      component: screens?.[item],
    };
  });
const stackUnAuthorizedModal = Object.keys(screens)
  .filter(a => !a.includes('screen') && !a.includes('Screen'))
  .map(item => {
    return {
      name: item,
      component: screens?.[item],
    };
  });

export {stackUnAuthorizedModal, stackUnAuthorizedScreen};
