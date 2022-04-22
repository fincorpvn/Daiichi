import {Ecolors} from 'constant';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {widthScale} from 'utils';
import Div from './Div';

interface p {
  numdot?: number;
  color?: string;
  size?: number;
}

function LoadingIndicator({
  numdot = 5,
  color = Ecolors.whiteColor,
  size = widthScale(7),
}: p) {
  const time = useRef(numdot * 350).current;
  const scale = useRef(new Animated.Value(-1)).current;
  const inte = useRef<any>(null);

  useEffect(() => {
    inte.current = Animated.timing(scale, {
      toValue: numdot,
      duration: time,
      useNativeDriver: true,
    }).start(() => {
      scale.setValue(-1);
    });
    startInte();
    return () => {
      stopInte();
    };
  }, []);

  const startInte = () => {
    if (inte.current) {
      clearInterval(inte.current);
    }
    inte.current = setInterval(() => {
      Animated.timing(scale, {
        toValue: numdot,
        duration: time,
        useNativeDriver: true,
      }).start(() => {
        scale.setValue(-1);
      });
    }, time);
  };

  const stopInte = () => {
    if (inte.current) {
      clearInterval(inte.current);
    }
    scale.setValue(-1);
  };
  return (
    <Div flexDirection={'row'} alignItems={'center'}>
      {Array(numdot)
        .fill(0)
        .map((item: any, index: number) => {
          const inputRange = [index - 1, index, index + 1];
          return (
            <Animated.View
              key={index}
              style={{
                marginHorizontal: widthScale(size / 2),
                width: widthScale(size),
                height: widthScale(size),
                borderRadius: widthScale(size),
                backgroundColor: color,
                transform: [
                  {
                    scale: scale.interpolate({
                      inputRange,
                      outputRange: [0, 1.5, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />
          );
        })}
    </Div>
  );
}

export default React.memo(LoadingIndicator);
