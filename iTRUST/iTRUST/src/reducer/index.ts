import {combineReducers} from '@reduxjs/toolkit';
import authen from './authen/reducer';
import languages from './languages/reducer';
import transaction from './transaction/reducer';
import investment from './investment/reducer';
import asset from './asset/reducer';

export const rootReducer = combineReducers({
  authen,
  languages,
  transaction,
  investment,
  asset,
});
export type RootState = ReturnType<typeof rootReducer>;

// export *
