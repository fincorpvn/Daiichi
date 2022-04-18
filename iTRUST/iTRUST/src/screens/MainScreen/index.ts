import {Div} from 'components';
import SearchModal from './SearchModal';
// profile
import ChangeEmailScreen from './ProfileScreen/ChangeEmailScreen';
import LoginInfoScreen from './ProfileScreen/LoginInfoScreen';
import ChangePasswordScreen from './ProfileScreen/ChangePasswordScreen';
import ChangeAddressScreen from './ProfileScreen/ChangeAddressScreen';
import OtpRequestModal from 'screens/UnAuthorized/OtpRequestModal';
// account verify
import AccountVerifyScreen from './AccountVerifyScreen';
import AccountInfoModal from './AccountVerifyScreen/AccountInfoModal';
import EditBankInfoModal from './AccountVerifyScreen/EditBankInfoModal';
import EditAccountInfoModal from './AccountVerifyScreen/EditAccountInfoModal';
import EditAddressInfoModal from './AccountVerifyScreen/EditAddressInfoModal';
import BankInfoModal from './AccountVerifyScreen/BankInfoModal';
import AddressInfoModal from './AccountVerifyScreen/AddressInfoModal';
import ConfirmModal from './AccountVerifyScreen/ConfirmModal';
// investment manage
// tab
import OverviewScreen from './OverviewScreen';
import TransactionScreen from './TransactionScreen';
import InvestmentScreen from './InvestmentScreen';
import AssetScreen from './AssetScreen';
import ProgramDetailsModal from './AssetScreen/ProgramDetailsModal';
import ProfileScreen from './ProfileScreen';
// setting screen
import SettingScreen from './SettingScreen';
import SettingLanguageModal from './SettingScreen/SettingLanguageModal';
import ActiveBiometricModal from './SettingScreen/ActiveBiometricModal';

import NotificationScreen from './NotificationScreen';
import SupportScreen from './SupportScreen';

// orrder transaction
import AutoInvestOrderDetailsModal from './TransactionScreen/AutoInvestOrderDetailsModal';
import OrderBuyDetailsModal from './TransactionScreen/OrderBuyDetailsModal';
import OrderSellDetailsModal from './TransactionScreen/OrderSellDetailsModal';
import OrderTransferDetailsModal from './TransactionScreen/OrderTransferDetailsModal';
import OrderHistoryDetailsModal from './TransactionScreen/OrderHistoryDetailsModal';
import FilterHistoryModal from './TransactionScreen/FilterHistoryModal';

//invest ment
import InvestmentDetailsScreen from './InvestmentScreen/InvestmentDetailsScreen';
import MiniEkycModal from './InvestmentScreen/MiniEkycModal';
// create order
import CreateOrderModal from './CreateOrderModal';
import FeeTableModal from './CreateOrderModal/FeeTableModal';
// digital signaturescreen
import DigitalSignatureScreen from './DigitalSignature/DigitalSignatureScreen';

import ReviewInfoModal from '../UnAuthorized/ControlEKYCScreen/ReviewInfoModal';
import ControlEKYCScreen from '../UnAuthorized/ControlEKYCScreen';
const screens: any = {
  //   ChatScreen,
  SearchModal,

  //   ProfileScreen,
  ChangeEmailScreen,
  LoginInfoScreen,
  ChangePasswordScreen,
  ChangeAddressScreen,
  //
  OtpRequestModal,
  // accoutn verify
  AccountVerifyScreen,
  AccountInfoModal,
  BankInfoModal,
  ProgramDetailsModal,
  EditBankInfoModal,
  EditAddressInfoModal,
  EditAccountInfoModal,
  AddressInfoModal,
  ConfirmModal,
  ReviewInfoModal,
  // setting screen
  SettingScreen,
  SupportScreen,
  SettingLanguageModal,
  ActiveBiometricModal,
  NotificationScreen,
  // order transaction
  OrderBuyDetailsModal,
  AutoInvestOrderDetailsModal,
  OrderSellDetailsModal,
  OrderTransferDetailsModal,
  OrderHistoryDetailsModal,
  FilterHistoryModal,
  ControlEKYCScreen,
  // invest ment
  InvestmentDetailsScreen,
  // create order
  CreateOrderModal,
  FeeTableModal,
  // add more function ádasdada in unauthen
  MiniEkycModal,
  // digital signaturescreen
  DigitalSignatureScreen,
};

const mainStackScreen = Object.keys(screens)
  .filter(a => !a.includes('modal') && !a.includes('Modal'))
  .map(item => {
    return {
      name: item,
      component: screens?.[item],
    };
  });

const mainStackModal = Object.keys(screens)
  .filter(a => a.includes('modal') || a.includes('Modal'))
  .map(item => {
    return {
      name: item,
      component: screens?.[item],
    };
  });
const mainTab = [
  {
    name: 'OverviewScreen',
    component: OverviewScreen,
  },
  {
    name: 'TransactionScreen',
    component: TransactionScreen,
  },
  {
    name: 'InvestmentScreen',
    component: InvestmentScreen,
  },
  {
    name: 'AssetScreen',
    component: AssetScreen,
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
  },
];

export {mainStackScreen, mainStackModal, mainTab};
