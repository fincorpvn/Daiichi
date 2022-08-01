import {RootState} from './../index';
import {createSelector} from 'reselect';

const currentUser = (state: RootState) => state.authen.currentUser;

export const getInvestmentProfile = createSelector(
  [currentUser],
  currentUser => {
    return currentUser?.investmentProfile?.status || null;
  },
);

export const getStatusEditProfile = createSelector(
  [currentUser],
  currentUser => {
    const {investmentProfile} = currentUser;
    const r =
      !!investmentProfile?.status &&
      investmentProfile?.status?.code != 'INVESTMENT_PROFILE_REJECT';
    // const r =
    //   (userInfoIsFull &&
    //     bankAccountIsFull &&
    //     userAddressIsFull &&
    //     riskInfo &&
    //     investmentProfile?.status?.code != 'INVESTMENT_PROFILE_REJECT') ||
    //   false;
    return !r;
  },
);

export const getStatusEditBankInfo = createSelector(
  [currentUser],
  currentUser => {
    const {
      investmentProfile,
      userInfoIsFull,
      bankAccountIsFull,
      userAddressIsFull,
    } = currentUser;

    const r =
      (userInfoIsFull &&
        bankAccountIsFull &&
        userAddressIsFull &&
        investmentProfile?.status &&
        investmentProfile?.status?.code != 'INVESTMENT_PROFILE_REJECT') ||
      false;
    return !r;
  },
);
