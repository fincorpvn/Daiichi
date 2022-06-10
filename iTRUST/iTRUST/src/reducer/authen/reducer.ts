import {setStoreToken} from 'utils/storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {doLogin, getInfo} from './action';

interface IinitialState {
  currentUser: any;
  isLoadingCurrentUser: boolean;
  userName?: string;
  token: any;
  isLoading: boolean;
  error: any;
  statusScreen: IParamsStatusScreen; // 1 splash , 2 unauthorized , 3 login success
  isBio: boolean;
  isNoti: boolean;
  isSupport: boolean;
  biometryType: string;
}

const initialState = {
  currentUser: {},
  isLoadingCurrentUser: false,
  //
  token: '',
  //
  isLoading: false,
  statusScreen: 'splash',
  //
  userName: '',
  error: {},
  //
  isBio: true,
  isNoti: true,
  isSupport: true,
  biometryType: '',
} as IinitialState;

const authen = createSlice({
  name: `authen@/doLogin`,
  initialState: initialState,
  reducers: {
    // change status screen
    changeStatusScreen(state, action: PayloadAction<IParamsStatusScreen>) {
      if (action.payload == 'unAuthorized') {
        setStoreToken('');
      }
      state.statusScreen = action.payload;
    },
    saveName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    changeBio(state, action: PayloadAction<boolean>) {
      state.isBio = action.payload;
    },
    changeNoti(state, action: PayloadAction<boolean>) {
      state.isNoti = action.payload;
    },
    clearAuthen(state, action: PayloadAction<any>) {
      state.currentUser = {};
    },
    changeIsSupport(state, action: PayloadAction<boolean>) {
      state.isSupport = action.payload;
    },
    changeUserPhotos(state, action: PayloadAction<Array<any>>) {
      state.currentUser = {
        ...state.currentUser,
        userPhotos: action.payload,
      };
    },
    changeBiometryType(
      state,
      action: PayloadAction<string | 'TouchID' | 'FaceID'>,
    ) {
      state.biometryType = action.payload;
    },
  },
  extraReducers: builder => {
    // dologin
    builder.addCase(doLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      state.isLoading = false;
    });
    // do get info
    builder.addCase(getInfo.pending, (state, action) => {
      state.isLoadingCurrentUser = true;
    });
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.isLoadingCurrentUser = false;
      state.currentUser = action.payload;
    });
    builder.addCase(getInfo.rejected, (state, action) => {
      state.isLoadingCurrentUser = false;
    });
    // get info
  },
});

const {actions, reducer} = authen;
export const {
  changeStatusScreen,
  saveName,
  changeBio,
  clearAuthen,
  changeNoti,
  changeBiometryType,
  changeIsSupport,
  changeUserPhotos,
} = actions;
export default reducer;
