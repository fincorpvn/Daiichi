import {changeStatusScreen, clearAuthen} from 'reducer/authen';
import {RootState} from 'reducer';
import {Middleware} from 'redux';
import {clearAsset} from 'reducer/asset';
import {clearTransaction} from 'reducer/transaction';

export const middlewareCatchApi: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = storeApi => next => action => {
  if (
    action?.payload?.status == 401 &&
    action?.type != 'asset@/load/rejected'
  ) {
    storeApi.dispatch(changeStatusScreen('unAuthorized'));
    // return;
  }
  if (
    action?.type == 'authen@/doLogin/changeStatusScreen' &&
    action?.payload == 'unAuthorized'
  ) {
    storeApi.dispatch(clearAsset({}));
    storeApi.dispatch(clearTransaction({}));
    storeApi.dispatch(clearAuthen({}));
    // return;
  }
  return next(action);
};
