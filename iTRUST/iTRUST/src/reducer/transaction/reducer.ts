import {
  loadTransaction,
  loadHistory,
  loadMoreHistory,
  loadMoreTransaction,
  loadAutoInvest,
} from './action';
// import { changeOrderType, loadAutoInvest } from './action';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ILoading {
  BUY?: boolean;
  SELL?: boolean;
  TRANSFER?: boolean;
  TRANSFER_BUY?: boolean;
}

interface ItemTransaction {
  items: Array<any>;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItemCount: number;
  };
  queries: {
    orderType: 'BUY' | 'SELL' | 'TRANSFER' | 'TRANSFER_BUY';
  };
}

interface ITransaction {
  BUY?: ItemTransaction;
  SELL?: ItemTransaction;
  TRANSFER?: ItemTransaction;
}

interface IsLoadMore {
  BUY?: boolean;
  SELL?: boolean;
  TRANSFER?: boolean;
  HISTORY?: boolean;
}

interface IinitialState {
  transaction: ITransaction;
  loading: ILoading;
  loadmore: ILoading;
  history: IHistoryOrder;
  loadingHistory: boolean;
  loadmoreHistory: boolean;
  orderType: 'BUY' | 'SELL' | 'TRANSFER' | 'TRANSFER_BUY';
  listAutoInvest: Array<any>;
  IsLoadMore: IsLoadMore;
  loadingAutoInvest: boolean;
  loadmoreAutoInvest: boolean;
}

interface IHistoryOrder {
  items?: Array<any>;
  pagination?: {
    currentPage?: number;
    itemsPerPage?: number;
    totalItemCount?: number;
  };
  queries?: {
    bdaCode?: any;
    clientId?: any;
    fromDate?: string;
    hash?: any;
    investmentNumber?: any;
    investorId?: any;
    orderCode?: string;
    orderTypeId?: number;
    orderTypeName?: any;
    productCode?: any;
    productProgramId?: number;
    programCode?: any;
    rmCode?: any;
    toDate?: string;
    userName?: any;
  };
}

const initialState = {
  transaction: {},
  loading: {},
  loadmore: {},
  history: {},
  loadingHistory: false,
  loadmoreHistory: false,
  orderType: 'BUY',
  listAutoInvest: [],
  IsLoadMore: {
    BUY: true,
    SELL: true,
    TRANSFER: true,
    HISTORY: true,
  },
  loadingAutoInvest: false,
  loadmoreAutoInvest: true,
} as IinitialState;

const transaction = createSlice({
  name: `transaction`,
  initialState: initialState,
  reducers: {
    changeOrderType(state, action: PayloadAction<any>) {
      state.orderType = action.payload;
    },
    clearTransaction(state, action: PayloadAction<any>) {
      state.transaction = {};
      state.history = {};
      state.loading = {};
      state.orderType = 'BUY';
      state.listAutoInvest = [];
    },
    deleteOrder(state, action: PayloadAction<any>) {
      state.transaction[state.orderType] = {
        ...state.transaction[state.orderType],
        items: state.transaction[state.orderType].items.filter(
          (a: any) => a.id != action.payload,
        ),
      };
    },
  },
  extraReducers: builder => {
    // doload transaction
    builder.addCase(loadTransaction.pending, (state, action) => {
      state.loading[state.orderType] = true;
    });
    builder.addCase(loadTransaction.fulfilled, (state, action) => {
      state.loading[state.orderType] = false;
      state.transaction[state.orderType] = action.payload;
      state.IsLoadMore[state.orderType] = true;
    });
    builder.addCase(loadTransaction.rejected, (state, action) => {
      state.loading[state.orderType] = false;
    });
    // doload transaction
    builder.addCase(loadMoreTransaction.pending, (state, action) => {
      state.loadmore[state.orderType] = true;
    });
    builder.addCase(loadMoreTransaction.fulfilled, (state, action) => {
      state.loadmore[state.orderType] = false;
      state.transaction[state.orderType] = {
        ...action.payload,
        items: state.transaction[state.orderType]?.items.concat(
          action.payload.items,
        ),
      };
      state.IsLoadMore[state.orderType] =
        action.payload.items?.length >= action.payload.pagination?.itemsPerPage;
    });
    builder.addCase(loadMoreTransaction.rejected, (state, action) => {
      state.loadmore[state.orderType] = false;
    });
    //load  history
    builder.addCase(loadHistory.pending, (state, action) => {
      state.loadingHistory = true;
    });
    builder.addCase(loadHistory.fulfilled, (state, action) => {
      state.loadingHistory = false;
      state.history = action.payload;
      state.IsLoadMore['HISTORY'] = true;
    });
    builder.addCase(loadHistory.rejected, (state, action) => {
      state.loadingHistory = false;
    });
    //load  auto invest
    builder.addCase(loadAutoInvest.pending, (state, action) => {
      state.loadingAutoInvest = true;
    });
    builder.addCase(loadAutoInvest.fulfilled, (state, action) => {
      state.listAutoInvest = action.payload;
      state.loadingAutoInvest = false;
    });
    builder.addCase(loadAutoInvest.rejected, (state, action) => {
      state.loadingAutoInvest = false;
    });
    //load morehistore
    builder.addCase(loadMoreHistory.pending, (state, action) => {
      state.loadmoreHistory = true;
    });
    builder.addCase(loadMoreHistory.fulfilled, (state, action) => {
      state.loadmoreHistory = false;
      state.history.pagination = action.payload.pagination;
      state.history.items = state.history.items?.concat(action.payload.items);
      state.IsLoadMore['HISTORY'] =
        action.payload.items?.length >= action.payload.pagination?.itemsPerPage;
    });
    builder.addCase(loadMoreHistory.rejected, (state, action) => {
      state.loadmoreHistory = false;
    });
    //load  history
  },
});

const {actions, reducer} = transaction;
export const {changeOrderType, clearTransaction, deleteOrder} = actions;
export default reducer;
