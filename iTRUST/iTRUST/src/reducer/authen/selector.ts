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
    const {
      riskInfo,
      bankAccountIsFull,
      userInfoIsFull,
      userAddressIsFull,
      investmentProfile,
    } = currentUser;
    const r =
      (userInfoIsFull &&
        bankAccountIsFull &&
        userAddressIsFull &&
        riskInfo &&
        investmentProfile?.status?.code != 'INVESTMENT_PROFILE_REJECT') ||
      false;
    return !r;
  },
);
