import {Div, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from 'store/hooks';
import {timeoutFromNow} from 'utils';

function TimeFromNow(p: {toTime?: any}) {
  const [timeToOut, setTimeToOut] = useState<any>(null);
  const curInteval = useRef<any>(null);
  const I18nState = useAppSelector(state => state.languages.I18nState);

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
      maxWidth={160}
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
