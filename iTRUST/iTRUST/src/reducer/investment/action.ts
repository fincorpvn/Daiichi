import {apiInvestment} from './../../services/apis/apiInvestment';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {onFocusProduct} from '.';

export const loadProduct = createAsyncThunk(
  `product@/load`,
  async (params: {}, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiInvestment.loadProduct({});
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const focusProduct = createAsyncThunk(
  `product@/focus`,
  async (params: {data: any}, {rejectWithValue, dispatch}) => {
    try {
      dispatch(onFocusProduct(params.data));
      // dispatch(
      //   getDataNav({
      //     fromDate: '20210107',
      //     toDate: '20220107',
      //     isAllData: 0,
      //     productId: params.data.id,
      //   }),
      // );
      const res = await apiInvestment.loadProductDetails({id: params.data.id});
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const getDataNav = createAsyncThunk(
  `product@/getDataChart`,
  async (
    params: {
      fromDate: string; //  '20210518';
      isAllData?: number; //  0;
      productId: number; //   1;
      toDate: string; //  '20211118';
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const res = await apiInvestment.loadnav(params);
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);
