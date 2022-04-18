import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from 'store';
import Navi from './Navi';
import {PersistGate} from 'redux-persist/integration/react';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import SplashContainer from './SplashContainer';

const handleError = (error: any, isFatal: any) => {
  // fetch
  console.log(error, isFatal);
  // alert(error.name);
};

setJSExceptionHandler((error: any, isFatal: any) => {
  console.log('caught global error', {
    error,
    isFatal,
  });
  handleError(error, isFatal);
}, true);

setNativeExceptionHandler(errorString => {
  // do the things
});

function AppContainer() {
  // useEffect(() => {
  //   handleNotification();
  //   return () => {};
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<SplashContainer />} persistor={persistor}>
        <NavigationContainer independent={true}>
          <Navi />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default React.memo(AppContainer);
