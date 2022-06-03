import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef, navigate} from 'services/navigation';
import {
  mainStackModal,
  mainStackScreen,
  stackSplash,
  stackUnAuthorizedScreen,
  stackUnAuthorizedModal,
  componentAction,
} from 'screens';
import {useAppSelector} from 'store/hooks';
import TabContainer from './TabContainer';
import {
  screenOptions,
  translateXOptionsScreen,
  translateYModal,
} from './optionsNavigate';
import {changeLanguage} from 'reducer/languages/reducer';
import {enableFreeze, enableScreens} from 'react-native-screens';
import ToastRoot from 'components/Toast/ToastRoot';
import {toastRef} from 'components/Toast';
import {getInfo} from 'reducer/authen';
import {useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
// import {handleNotification} from 'services';
import {StatusBar} from 'react-native';
import {Ecolors, Icons} from 'constant';
import {Log} from 'utils';

enableScreens(false);
enableFreeze(true);

const Stack = createStackNavigator();

function Navi() {
  const {statusScreen} = useAppSelector(state => state.authen);
  const activeLanguage = useAppSelector(
    state => state.languages.activeLanguage,
  );
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const {
    email,
    phone,
    riskInfo,
    bankAccountIsFull,
    userInfoIsFull,
    userAddressIsFull,
  } = currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
    // dispatch(changeLanguage(activeLanguage));
    dispatch(
      changeLanguage({
        code: 'vi',
        name: 'Vie',
        icons: Icons.vietnam,
      }),
    );
    return () => {};
  }, []);

  useEffect(() => {
    if (statusScreen == 'main') {
      getInfoAndEKYC();
    }
    return () => {};
  }, [statusScreen]);

  const getInfoAndEKYC = async () => {
    const r: any = await dispatch(getInfo({}));
    if (!!r) {
      gotoEKYC(r.payload);
    }
  };

  const gotoEKYC = (currentUser: any) => {
    if (!currentUser?.investmentProfile?.status) {
      if (!userInfoIsFull && !bankAccountIsFull && !userAddressIsFull) {
        navigate('ControlEKYCScreen', {
          onBack: () => {
            navigate('OverviewScreen');
          },
        });
      } else {
        navigate('AccountVerifyScreen');
      }
    }
  };

  const switchStatusStack = () => {
    switch (statusScreen) {
      case 'unAuthorized': //unauthorized
        return (
          <>
            {stackUnAuthorizedScreen.map((item, _) => (
              <Stack.Screen
                options={translateXOptionsScreen}
                key={item.name}
                name={item.name}
                component={item.component}
              />
            ))}
            {stackUnAuthorizedModal.map((item, _) => (
              <Stack.Screen
                options={translateYModal}
                key={item.name}
                name={item.name}
                component={item.component}
              />
            ))}
          </>
        );

      case 'main': //main
        return (
          <>
            <Stack.Screen
              options={translateXOptionsScreen}
              key={'TabContainer'}
              name={'TabContainer'}
              component={TabContainer}
            />
            {mainStackScreen.map((item, _) => (
              <Stack.Screen
                options={translateXOptionsScreen}
                key={item.name}
                name={item.name}
                component={item.component}
              />
            ))}
            {mainStackModal.map((item, _) => (
              <Stack.Screen
                options={translateYModal}
                key={item.name}
                name={item.name}
                component={item.component}
              />
            ))}
          </>
        );
      case 'splash':
      default:
        // splash
        return stackSplash.map((item, _) => (
          <Stack.Screen
            options={translateXOptionsScreen}
            key={item.name}
            name={item.name}
            component={item.component}
          />
        ));
    }
  };

  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <StatusBar
        backgroundColor={Ecolors.transparent}
        barStyle={statusScreen == 'main' ? 'dark-content' : 'dark-content'}
        hidden={false}
      />
      <ToastRoot ref={toastRef} />
      <Stack.Navigator
        mode={'modal'}
        screenOptions={screenOptions}
        headerMode={'none'}
        initialRouteName={'LoginScreen'}>
        {switchStatusStack()}
        {componentAction.map((item: any, index: number) => {
          return (
            <Stack.Screen
              options={item.options || translateYModal}
              key={item.name}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default React.memo(Navi);
