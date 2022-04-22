import {loadProduct, focusProduct, getDataNav} from './action';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IinitialState {
  loading: boolean;
  loadMore: boolean;
  listProduct: Array<any>;
  productDetails: any;
  loadingFocus: boolean;
  idFocus: number | string;
  //
  dataNav: any;

  loadingNav: boolean;
}

const initialState = {
  loading: false,
  listProduct: [],
  loadMore: false,
  //
  productDetails: {},
  loadingFocus: false,
  idFocus: 0,
  //
  dataNav: {},
  loadingNav: false,
} as IinitialState;

const investment = createSlice({
  name: 'investment',
  initialState: initialState,
  reducers: {
    unFocusProduct(state, action: PayloadAction<any>) {
      state.idFocus = 0;
      state.dataNav = {};
    },
    onFocusProduct(state, action: PayloadAction<any>) {
      state.idFocus = action.payload.id;
    },
  },
  extraReducers: builder => {
    //load morehistore
    builder.addCase(loadProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.listProduct = action.payload;
    });
    builder.addCase(loadProduct.rejected, (state, action) => {
      state.loading = false;
    });
    //load morehistore
    builder.addCase(focusProduct.pending, (state, action) => {
      state.loadingFocus = true;
    });
    builder.addCase(focusProduct.fulfilled, (state, action) => {
      state.productDetails[action.payload.id] = action.payload;
      state.loadingFocus = false;
    });
    builder.addCase(focusProduct.rejected, (state, action) => {
      state.loadingFocus = false;
    });
    //load morehistore
    builder.addCase(getDataNav.pending, (state, action) => {
      // state.loadingFocus = true;
      state.loadingNav = true;
    });
    builder.addCase(getDataNav.fulfilled, (state, action) => {
      // state.productDetails[action.payload.id] = action.payload;
      state.loadingNav = false;
      state.dataNav[state.idFocus] = action.payload;
    });
    builder.addCase(getDataNav.rejected, (state, action) => {
      state.loadingNav = false;
    });
  },
});
const {actions, reducer} = investment;
export const {unFocusProduct, onFocusProduct} = actions;
export default reducer;
