import {Log} from 'utils';
import {RootState} from './../index';
import {createSelector} from 'reselect';

const listProduct = (state: RootState) => state.investment.listProduct;
const loading = (state: RootState) => state.investment.loading;
const loadMore = (state: RootState) => state.investment.loadMore;
const idFocus = (state: RootState) => state.investment.idFocus;
const productDetails = (state: RootState) => state.investment.productDetails;
const dataNav = (state: RootState) => state.investment.dataNav;
const loadingNav = (state: RootState) => state.investment.loadingNav;

export const getListProduct = createSelector([listProduct], listProduct => {
  return listProduct || [];
});
export const getLoading = createSelector([loading], loading => {
  return loading;
});
export const getLoadMore = createSelector([loadMore], loadMore => {
  return loadMore;
});
export const getProductFocus = createSelector(
  [productDetails, idFocus, listProduct],
  (productDetails, idFocus, listProduct) => {
    const objPro = listProduct.find(a => a.id == idFocus);
    var objRe = productDetails[idFocus] || {};
    if (objPro) {
      Object.keys(objRe).map(item => {
        objRe = {
          ...objRe,
          [`${item}`]: objPro[item] ?? (objRe[item] || null),
        };
      });
    }
    return objRe || {};
  },
);

export const getDataChart = createSelector(
  [dataNav, idFocus],
  (dataNav, idFocus) => {
    let r = 1;
    let DD = dataNav[idFocus] || [];
    const last = DD[DD.length - 1];
    let control = 50;
    if (DD?.length > control) {
      r = Math.round(DD.length / control);
    }
    const d =
      DD.filter(
        (item: any, index: number) => index % r == 0 && index < DD.length,
      ).map((item: any, index: number) => {
        return {y: item.nav, x: item.navDate};
      }) || [];
    if (d.length) {
      return d.concat([
        {
          y: last?.nav || 0,
          x: last?.navDate || 0,
        },
      ]);
    } else {
      return [];
    }
  },
);

export const getMaxMinNav = createSelector(
  [dataNav, idFocus],
  (dataNav, idFocus) => {
    // let r = 1;
    let DD = dataNav[idFocus] || [];
    let max = null;
    let min = null;
    DD.map((item: any, index: number) => {
      if (!max) {
        max = item.nav;
      } else if (item.nav >= max) {
        max = item.nav;
      }
      if (!min) {
        min = item.nav;
      } else if (item.nav <= min) {
        min = item.nav;
      }
    });
    return {
      max: max || 10000,
      min: min || 0,
      space: (max || 10000) / 3,
    };
    // const last = DD[DD.length - 1];
    // let control = 50;
    // if (DD?.length > control) {
    //   r = Math.round(DD.length / control);
    // }

    // const d =
    //   DD.filter(
    //     (item: any, index: number) => index % r == 0 && index < DD.length,
    //   ).map((item: any, index: number) => {
    //     return {y: item.nav, x: item.navDate};
    //   }) || [];
    // if (d.length) {
    //   return d.concat([
    //     {
    //       y: last?.nav || 0,
    //       x: last?.navDate || 0,
    //     },
    //   ]);
    // } else {
    //   return [];
    // }
  },
);

export const getDataNavSelector = createSelector(
  [dataNav, idFocus],
  (dataNav, idFocus) => {
    return dataNav[idFocus] || [];
  },
);

export const getLoadingNav = createSelector([loadingNav], loadingNav => {
  return loadingNav;
});
