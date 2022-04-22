import {widthScreen} from '../utils/scales';
import {heightScreen} from 'utils';

export const fadeInOut: object = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  cardStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  cardOverlayEnabled: false,
  cardStyleInterpolator: ({current: {progress}}: any) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.3, 0.7, 1],
        outputRange: [0, 0, 1, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.3, 0.7, 1],
        outputRange: [0, 0, 1, 1],
      }),
    },
  }),
};
export const translateYModal: object = {
  headerShown: false,
  gestureEnabled: false,
  gestureDirection: 'vertical',
  cardStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  cardOverlayEnabled: false,
  cardStyleInterpolator: ({current: {progress}}: any) => ({
    cardStyle: {
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [heightScreen, 0],
          }),
        },
      ],
      opacity: progress.interpolate({
        inputRange: [0, 0.3, 0.7, 1],
        outputRange: [0, 0, 1, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.3, 0.7, 1],
        outputRange: [0, 0, 1, 1],
      }),
    },
  }),
};

export const translateXOptionsScreen: object = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyle: {backgroundColor: 'rgba(255,255,255,1)'},
  cardOverlayEnabled: false,
  cardStyleInterpolator: ({current: {progress}}: any) => ({
    cardStyle: {
      transform: [
        {
          translateX: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [widthScreen, 0],
          }),
        },
      ],
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  }),
};

export const screenOptions: object = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};
