import React, {useCallback, useRef} from 'react';
import {Animated} from 'react-native';
import {parseMargin, parsePadding} from 'utils/parseOptions';
import {ComponentButton, IPropsButton} from './ConstantComponent/ButtonComp';
import Div from './Div';
// readme
const opScaleUp = {
  toValue: 1.01,
  duration: 100,
  useNativeDriver: true,
};
const opScaleDown = {
  toValue: 1,
  duration: 100,
  useNativeDriver: true,
};

function Button(props: IPropsButton): JSX.Element {
  const scale = useRef(new Animated.Value(1)).current;
  const onResponderStart = useCallback(() => {
    Animated.timing(scale, opScaleUp).start(() => {});
  }, []);
  const onResponderEnd = useCallback(() => {
    Animated.timing(scale, opScaleDown).start(() => {});
  }, []);

  // debounce
  return (
    <ComponentButton
      onPress={e => props.onPress && props.onPress(e)}
      onResponderStart={onResponderStart}
      onResponderEnd={onResponderEnd}
      ref={props.buttonRef && props.buttonRef}>
      <Animated.View
        style={{
          transform: [
            {
              scale: props.isScale ? scale : 1,
            },
          ],
        }}>
        <Div {...parsePadding(props)} {...parseMargin(props)} {...props}>
          {props.children && props.children}
        </Div>
      </Animated.View>
    </ComponentButton>
  );

  return (
    // <Animated.View
    //   style={{
    //     transform: [
    //       {
    //         scale: props.isScale ? scale : 1,
    //       },
    //     ],
    //   }}>
    <ComponentButton
      {...parsePadding(props)}
      {...parseMargin(props)}
      onResponderStart={() => {
        Animated.timing(scale, opScaleUp).start(() => {});
      }}
      onResponderEnd={() => {
        Animated.timing(scale, opScaleDown).start(() => {});
      }}
      {...props}
      //   style={{
      //     transform: [
      //       {
      //         scale: props.isScale ? scale : 1,
      //       },
      //     ],
      //   }}
      ref={props.buttonRef && props.buttonRef}>
      {props.children && props.children}
    </ComponentButton>
  );
}

Button.defaultProps = {
  isScale: true,
};

export default React.memo(Button);
