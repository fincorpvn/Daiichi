import {loadAsset, loadBanner} from './action';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IinitialState {
  asset: {
    productList?: Array<any>;
    sumOfInterestOrHole?: number | string;
    sumOfValueCurrently?: number;
    sumOfValueInvested?: number;
  };
  banner: Array<any>;
  loading: boolean;
}
const initialState = {
  loading: false,
  asset: {},
  banner: [],
} as IinitialState;

const asset = createSlice({
  name: 'asset',
  initialState: initialState,
  reducers: {
    clearAsset(state, action: PayloadAction<any>) {
      state.loading = false;
      state.asset = {};
    },
  },
  extraReducers: builder => {
    //load morehistore
    builder.addCase(loadAsset.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadAsset.fulfilled, (state, action) => {
      state.loading = false;
      state.asset = action.payload;
    });
    builder.addCase(loadAsset.rejected, (state, action) => {
      state.loading = false;
    });
    //load banner
    builder.addCase(loadBanner.pending, (state, action) => {});
    builder.addCase(loadBanner.fulfilled, (state, action) => {
      state.banner = action.payload;
    });
    builder.addCase(loadBanner.rejected, (state, action) => {});
  },
});
const {actions, reducer} = asset;
export const {clearAsset} = actions;
export default reducer;
