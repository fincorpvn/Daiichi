import {changeStatusScreen} from 'reducer/authen';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiAuth} from 'services';
import {setAccount} from 'utils/storage';

export const doLogin = createAsyncThunk(
  `authen@/doLogin`,
  async (params: IParamsLogin, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiAuth.login(params);
      if (res.status == 200) {
        dispatch(changeStatusScreen('main'));
        dispatch(getInfo({}));
        setAccount({
          username: params.username,
          password: params.password,
        });
        return res;
      }
      return rejectWithValue(res);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
export const getInfo = createAsyncThunk(
  `authen@/getInfo`,
  async (params: any, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiAuth.getInfo();
      if (res.status == 200) {
        return res.data;
      }
      return rejectWithValue(res);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
