import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { multiLineString, lineString } from '@turf/helpers';
import along from '@turf/along';
import Animated, {
  useCode,
  onChange,
  call,
  sub,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  parsePath,
  getPointAtLength,
  useValues,
  onGestureEvent,
} from 'react-native-redash';
import { ScaleLinear } from 'd3';

const TOUCH_SIZE = 100;
// const { width } = Dimensions.get('window');
const white = 'white';

interface CursorProps {
  d: string;
  r: number;
  borderWidth: number;
  borderColor: string;
  width: number;
  xScale: ScaleLinear<number, number>;
  lines: number[][][];
  units: 'kilometers' | 'miles';
  setPointAlongPath: React.Dispatch<React.SetStateAction<number[]>>;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default ({
  d,
  r,
  borderWidth,
  borderColor,
  width,
  xScale,
  lines,
  units,
  setPointAlongPath,
}: CursorProps) => {
  const radius = r + borderWidth / 2;
  const [x1, y1, state] = useValues(0, 0, State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ x: x1, y: y1, state });
  // const cx = clamp(decay(translationX, state, velocityX), 0, width);
  const path = parsePath(d);
  const length = interpolate(x1, {
    inputRange: [0, width],
    outputRange: [0, path.totalLength],
    extrapolate: Extrapolate.CLAMP,
  });
  const { y, x } = getPointAtLength(path, length);
  const translateX: any = sub(x, radius);
  const translateY: any = sub(y, radius);

  useCode(
    () =>
      onChange(
        [x],
        call([x], ([pathX]) => {
          //@ts-ignore
          // const line = lineString(lines.flat());
          // const distanceAlongPath = xScale.invert(pathX);
          // const segment = along(line, distanceAlongPath, { units });
          // setPointAlongPath(segment.geometry.coordinates);
        }),
      ),
    [x1],
  );

  return (
    <PanGestureHandler minDist={0} {...gestureHandler}>
      <Animated.View style={[styles.container]}>
        <Animated.View
          style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            borderColor,
            borderWidth,
            backgroundColor: white,
            transform: [{ translateX }, { translateY }],
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
