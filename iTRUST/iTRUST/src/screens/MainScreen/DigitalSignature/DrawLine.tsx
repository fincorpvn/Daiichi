import {Ecolors} from 'constant';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Svg, {Path, Polyline} from 'react-native-svg';
import {getUuid, heightScale, widthScale, widthScreen} from 'utils';
import ViewShot from 'react-native-view-shot';
var genUID = getUuid();

function DrawLine(p: {}, ref: any) {
  const viewshotRef = useRef<any>(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const [stateLine, setStateLine] = useState<any>({});

  useImperativeHandle(ref, () => ({
    accept: (callback: (t: string) => void) => {
      if (viewshotRef.current) {
        viewshotRef.current.capture().then((uri: string) => {
          callback(uri);
        });
      }
    },
    clear: () => {
      setStateLine({});
    },
  }));

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          x: pan.x,
          y: pan.y,
        },
      },
    ],
    {
      listener: (event: any) => {
        const x = event.nativeEvent.x;
        const y = event.nativeEvent.y;
        setStateLine(a => {
          return {
            ...a,
            [genUID]: [...(a?.[`${genUID}`] || []), {x, y}],
          };
        });
      },
      useNativeDriver: true,
    },
  );

  return (
    <PanGestureHandler
      onBegan={() => {
        genUID = getUuid();
      }}
      onEnded={() => {
        genUID = '';
      }}
      onGestureEvent={onGestureEvent}>
      <Animated.View style={s.container}>
        <ViewShot ref={viewshotRef} options={{format: 'png', quality: 1}}>
          <Svg width={'100%'} height={'100%'}>
            {Object.keys(stateLine).map((item: any, index: number) => {
              const consvar = stateLine[item];
              const d = `${consvar.map((item: any, index: number) => {
                if (index == 0) {
                  return `M${item.x} ${item.y}`;
                }
                return `L${item.x} ${item.y}`;
              })}`;
              return (
                <Path
                  key={item}
                  d={d}
                  fill="none"
                  stroke={Ecolors.textColor}
                  strokeWidth="2"
                />
              );
            })}
          </Svg>
        </ViewShot>
      </Animated.View>
    </PanGestureHandler>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
export default React.forwardRef(DrawLine);
