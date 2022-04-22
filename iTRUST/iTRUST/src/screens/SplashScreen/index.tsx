import {Button, ButtonBorder, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect} from 'react';
import {changeStatusScreen} from 'reducer/authen';
import {useAppDispatch} from 'store/hooks';
import {getImageLibrary} from 'utils';

function SplashScreen() {
  const dispatch = useAppDispatch();

  const onGoToLogin = () => {
    dispatch(changeStatusScreen('unAuthorized'));
  };

  useEffect(() => {
    onGoToLogin();
    return () => {};
  }, []);

  return (
    <Div flex={1} alignItems={'center'} justifyContent={'center'}>
      {/* <Label
        marginBottom={30}
        color={Ecolors.blue}
        size={20}
        fontWeight={'bold'}>
        {`splashscreen.hi`}
      </Label>
      <ButtonBorder
        title={`splashscreen.continue`}
        onPress={() => {
          onGoToLogin();
        }}
      /> */}
    </Div>
  );
}

export default React.memo(SplashScreen);
