import {Div, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {timeoutFromNow} from 'utils';

function TimeFromNow(p: {toTime?: any}) {
  const [timeToOut, setTimeToOut] = useState<any>(null);
  const curInteval = useRef<any>(null);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const timeLast = useRef<any>(null);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const currentTime: any = new Date();
        const timeBack = currentTime - timeLast.current;
        setTimeToOut(t => t - Math.round(timeBack / 1000));
      }
      appState.current = nextAppState;
      timeLast.current = new Date();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (p.toTime) {
      const date = new Date(p.toTime).getTime();
      const cur = new Date().getTime();
      const timeOut = Math.round(Math.abs(date - cur) / 1000);
      setTimeToOut(timeOut);
      controlInteval();
    }
    return () => {
      stopInteval();
    };
  }, [p.toTime]);

  useEffect(() => {
    if (timeToOut && timeToOut <= 0) {
      stopInteval();
    }
    return () => {};
  }, [timeToOut]);

  const controlInteval = () => {
    if (curInteval.current) {
      clearInterval(curInteval.current);
    }
    curInteval.current = setInterval(() => {
      setTimeToOut((a: any) => a - 1);
    }, 1000);
  };

  const stopInteval = () => {
    if (curInteval.current) {
      clearInterval(curInteval.current);
      curInteval.current = null;
    }
  };

  return (
    <Div
      width={'100%'}
      maxWidth={170}
      height={35}
      marginTop={6}
      borderRadius={5}
      backgroundColor={Ecolors.yellowColor}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Label size={12} multilanguage={false}>
        {timeoutFromNow(timeToOut, I18nState)}
      </Label>
    </Div>
  );
}

export default React.memo(TimeFromNow);
