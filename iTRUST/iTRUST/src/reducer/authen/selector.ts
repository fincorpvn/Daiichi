import {Log} from 'utils';
import {RootState} from './../index';
import {createSelector} from 'reselect';

const currentUser = (state: RootState) => state.authen.currentUser;

export const getInvestmentProfile = createSelector(
  [currentUser],
  currentUser => {
    return currentUser?.investmentProfile?.status || null;
  },
);
