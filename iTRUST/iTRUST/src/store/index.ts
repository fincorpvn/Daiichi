import {rootReducer} from './../reducer/index';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import {middlewareSocket} from './middlewareSocket';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {middlewareCatchApi} from './middlewareCatchApi';

const SetTransformGroup = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState: object, key) => {
    // convert mySet to an Array.
    return inboundState; //{...inboundState};
  },
  // transform state being rehydrated
  (outboundState: object, key) => {
    // convert mySet back to a Set.
    return {
      ...outboundState,
      isLoading: false,
      isLoadingCurrentUser: false,
      I18nState: 'vi',
      statusScreen: 'unAuthorized',
    };
  },
  // define which reducers this transform gets called for.
  // {whitelist: ['authen', 'groupChats']},
);

const persistConfig = {
  key: 'rootSaga',
  storage: AsyncStorage,
  blacklist: ['transaction', 'investment'],
  transforms: [SetTransformGroup],
  whitelist: ['authen', 'languages'], // Xem thêm tại mục "Quá trình merge".
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(...(__DEV__ ? [logger, middlewareCatchApi] : [middlewareCatchApi])),
  // concat(...(__DEV__ ? [logger, middlewareSocket] : [middlewareSocket])),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
