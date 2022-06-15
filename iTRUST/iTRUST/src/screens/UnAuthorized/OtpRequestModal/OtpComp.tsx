import {Button, Div, Input, Label} from 'components';
import {Ecolors} from 'constant';
import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, AppState} from 'react-native';
import {Log} from 'utils';

function ItemOTPInput(p: {value: string; isFocus: boolean}) {
  const inte = useRef<any>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (p.isFocus) {
      startInte();
    } else {
      clearInte();
    }
    return () => {
      clearInte();
    };
  }, [p.isFocus]);

  const startInte = () => {
    if (inte.current) {
      clearInte();
    }
    inte.current = setInterval(() => {
      setIsShow(a => !a);
    }, 700);
  };

  const clearInte = () => {
    if (inte.current) {
      clearInterval(inte.current);
    }
  };
  return (
    <Div
      width={46}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      marginHorizontal={4}
      borderBottomWidth={4}
      borderBottomColor={
        p.isFocus
          ? isShow
            ? Ecolors.mainColor
            : Ecolors.spaceColor
          : Ecolors.spaceColor
      }>
      <Label size={30} multilanguage={false}>
        {p.value}
      </Label>
    </Div>
  );
}

const OtpComp = (
  props: {
    maxTime?: number;
    otp?: string;
    isInTime?: boolean;
    setIsInTime?: (r: boolean) => void;
    setOtp?: (r: string) => void;
  },
  ref: any,
) => {
  const [time, setTime] = useState(90);
  const timeInteval: any = useRef(null);
  const inputRef = useRef<any>(null);
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
        setTime(t => t - Math.round(timeBack / 1000));
      }
      appState.current = nextAppState;
      timeLast.current = new Date();
    });
    return () => {
      if (!!subscription) {
        subscription.remove();
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    start: () => {
      startTimer();
    },
  }));

  useEffect(() => {
    startTimer();
    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    if (props.maxTime) {
      setTime(props.maxTime);
    }
    return () => {};
  }, [props.maxTime]);

  useEffect(() => {
    if (time <= 1) {
      props.setIsInTime && props.setIsInTime(false);
      props.setOtp && props.setOtp('');
      clearTimer();
    }
  }, [time]);

  const startTimer = () => {
    if (timeInteval.current) {
      clearTimer();
    }
    props.setIsInTime && props.setIsInTime(true);
    setTime(props.maxTime || 90);
    timeInteval.current = setInterval(() => {
      setTime(a => a - 1);
    }, 1000);
  };

  const clearTimer = () => {
    if (timeInteval.current) {
      clearInterval(timeInteval.current);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Div
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      marginTop={15}>
      {props.isInTime ? (
        <>
          <Label multilanguage={false}>
            <Label
              fontWeight={'700'}
              marginTop={10}
              size={15}
              color={Ecolors.textColor}>
              {`otprequestmodal.contenttiming`}
            </Label>
            <Label
              multilanguage={false}
              fontWeight={'700'}
              marginTop={10}
              size={15}
              color={Ecolors.mainColor}>
              {` ${time}s`}
            </Label>
          </Label>
          <Div
            alignItems={'center'}
            justifyContent={'center'}
            overflow={'hidden'}
            flexDirection={'row'}
            width={'100%'}
            height={80}
            marginTop={30}>
            <Input
              caretHidden={true}
              textContentType={'oneTimeCode'}
              inputRef={inputRef}
              autoFocus={true}
              padding={0}
              margin={0}
              value={props.otp}
              onChangeText={(e: string) => {
                if (e.length == 0) {
                  props.setOtp && props.setOtp(e);
                  return;
                }
                const t: string = e[e.length ? e.length - 1 : 0] || '';
                const reg = /^[0-9]*$/;
                if (reg.test(t)) {
                  props.setOtp && props.setOtp(e);
                }
              }}
              color={Ecolors.transparent}
              maxLength={6}
              keyboardType={'number-pad'}
              width={'100%'}
              textAlign={'center'}
              fontSize={20}
              style={{
                ...StyleSheet.absoluteFillObject,
              }}
            />
            <Button
              onPress={() => focusInput()}
              width={'100%'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}>
              {Array(6)
                .fill(0)
                .map((item: any, index: number) => {
                  return (
                    <ItemOTPInput
                      key={index}
                      value={props.otp?.[index] || ''}
                      isFocus={
                        index == props.otp?.length ||
                        (index == 5 && props.otp?.length == 6)
                      }
                    />
                  );
                  return (
                    <Div
                      key={index}
                      width={46}
                      flexDirection={'row'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      marginHorizontal={4}
                      borderBottomWidth={4}
                      borderBottomColor={Ecolors.spaceColor}>
                      <Label size={30} multilanguage={false}>
                        {props.otp?.[index] || ''}
                      </Label>
                    </Div>
                  );
                })}
            </Button>
          </Div>
        </>
      ) : (
        <>
          <Label size={20} color={Ecolors.textColor} fontWeight={'600'}>
            {`otprequestmodal.otptimeout`}
          </Label>
        </>
      )}
    </Div>
  );
};

export default React.forwardRef(OtpComp);
