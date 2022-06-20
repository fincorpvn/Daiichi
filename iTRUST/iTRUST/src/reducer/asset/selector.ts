import {RootState} from './../index';
import {createSelector} from 'reselect';

const productList = (state: RootState) => state.asset.asset.productList;
const asset = (state: RootState) => state.asset.asset;
const loading = (state: RootState) => state.asset.loading;

export const getProductList = createSelector([productList], productList => {
  return productList || [];
});
export const getProductListSort = createSelector([productList], productList => {
  const r = [...(productList || [])]?.sort(
    (a: any, b: any) => b.ratePercent - a.ratePercent,
  );
  return r;
});

export const getLoading = createSelector([loading], loading => {
  return loading;
});

export const getAsset = createSelector([asset], asset => {
  return asset || {};
});
