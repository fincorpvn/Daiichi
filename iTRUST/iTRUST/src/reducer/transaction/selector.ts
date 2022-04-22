import {RootState} from './../index';
import {createSelector} from 'reselect';
// selector
const transaction = (state: RootState) => state.transaction.transaction;
const history = (state: RootState) => state.transaction.history;
const loadingHistory = (state: RootState) => state.transaction.loadingHistory;
const loadmoreHistory = (state: RootState) => state.transaction.loadmoreHistory;
const orderType = (state: RootState) => state.transaction.orderType;
const loading = (state: RootState) => state.transaction.loading;
const loadmore = (state: RootState) => state.transaction.loadmore;
const IsLoadMore = (state: RootState) => state.transaction.IsLoadMore;

// reselect function

export const getTransaction = createSelector(
  [transaction, orderType],
  (transaction, orderType) => {
    return (
      transaction[orderType] || {
        items: [],
        queries: null,
        pagination: null,
      }
    );
  },
);
export const getIsLoadMoreTransaction = createSelector(
  [IsLoadMore, orderType],
  (IsLoadMore, orderType) => {
    return IsLoadMore[orderType];
  },
);

export const getLoading = createSelector(
  [loading, orderType],
  (loading, orderType) => {
    return loading[orderType] || false;
  },
);
export const getLoadmore = createSelector(
  [loadmore, orderType],
  (loadmore, orderType) => {
    return loadmore[orderType] || false;
  },
);

export const getHistory = createSelector([history], history => {
  return history;
});

export const getQueriesHistory = createSelector([history], history => {
  return history.queries;
});

export const getPaginationHistory = createSelector([history], history => {
  return history.pagination;
});

export const getLoadingHistory = createSelector(
  [loadingHistory],
  loadingHistory => {
    return loadingHistory;
  },
);
export const getLoadMoreHistory = createSelector(
  [loadmoreHistory],
  loadmoreHistory => {
    return loadmoreHistory;
  },
);
