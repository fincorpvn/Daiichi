import {apiTransaction} from './../../services/apis/apiTransaction';
import {createAsyncThunk, AsyncThunkAction} from '@reduxjs/toolkit';

interface IParamLoad {
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  queries: {
    orderType: 'BUY' | 'SELL' | 'TRANSFER' | 'TRANSFER_BUY';
  };
}

interface IParamsLoadHistory {
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

export const loadTransaction = createAsyncThunk(
  `transaction@/load`,
  async (params: IParamLoad, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiTransaction.loadByStatus(params);
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);
export const loadAutoInvest = createAsyncThunk(
  `transaction@/loadAutoInvest`,
  async (params: any, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiTransaction.getAutoInvest();
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const loadMoreTransaction = createAsyncThunk(
  `transaction@/loadmore`,
  async (params: IParamLoad, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiTransaction.loadByStatus(params);
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);
export const loadHistory = createAsyncThunk(
  `history@/load`,
  async (params: IParamsLoadHistory, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiTransaction.loadHistory(params);
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);
export const loadMoreHistory = createAsyncThunk(
  `history@/loadmore`,
  async (params: IParamsLoadHistory, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiTransaction.loadHistory(params);
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);
