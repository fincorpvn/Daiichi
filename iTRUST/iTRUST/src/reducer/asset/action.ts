import {apiAsset} from './../../services/apis/apiAsset';
import {createAsyncThunk, AsyncThunkAction} from '@reduxjs/toolkit';

export const loadAsset = createAsyncThunk(
  `asset@/load`,
  async (params: {}, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiAsset.loadDashboard(params);
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

export const loadBanner = createAsyncThunk(
  `banner@/load`,
  async (params: {}, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiAsset.getBanner(params);
      if (res.status == 200) {
        return res.data;
      }
      throw rejectWithValue(res);
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);
