import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  decay,
  useCode,
  onChange,
  call,
  divide,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  clamp,
  parsePath,
  getPointAtLength,
  useValues,
  onGestureEvent,
} from 'react-native-redash';

const { Value, event, sub, interpolate } = Animated;
const TOUCH_SIZE = 200;
const { width } = Dimensions.get('window');
const white = 'white';

interface CursorProps {
  d: string;
  r: number;
  borderWidth: number;
  borderColor: string;
}

export default ({ d, r, borderWidth, borderColor }: CursorProps) => {
  const radius = r + borderWidth / 2;
  const [x1, y1, state] = useValues(0, 0, State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ x: x1, y: y1, state });
  // const cx = clamp(decay(translationX, state, velocityX), 0, width);
  const path = parsePath(d);
  const length = interpolate(x1, {
    inputRange: [0, width - 40],
    outputRange: [0, path.totalLength],
  });
  const { y, x } = getPointAtLength(path, length);
  const translateX: any = sub(x, TOUCH_SIZE / 2);
  const translateY: any = sub(y, TOUCH_SIZE / 2);

  useCode(
    () =>
      onChange(
        length,
        call([length], (val) => {
          console.log(val);
        }),
      ),
    [x1],
  );

  return (
    <PanGestureHandler minDist={0} {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }, { translateY }],
          width: TOUCH_SIZE,
          height: TOUCH_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            borderColor,
            borderWidth,
            backgroundColor: white,
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
