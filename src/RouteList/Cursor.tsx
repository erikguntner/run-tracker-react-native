import * as React from 'react';
import { StyleSheet } from 'react-native';
import { multiLineString, lineString } from '@turf/helpers';
import along from '@turf/along';
import Animated, {
  useCode,
  onChange,
  call,
  sub,
  eq,
  concat,
  interpolate,
  Extrapolate,
  divide,
  floor,
  multiply,
  add,
  cond,
  lessThan,
  lessOrEq,
  modulo,
  Value,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  parsePath,
  getPointAtLength,
  useValues,
  onGestureEvent,
  ReText,
  round,
} from 'react-native-redash';
import { ScaleLinear } from 'd3';

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
  },
  line: {
    ...StyleSheet.absoluteFillObject,
    width: 2,
    height: 125,
  },
  labelContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEFFFF',
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
  },
  label: {
    color: 'black',
    fontVariant: ['tabular-nums'],
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
  const opacity = eq(state, State.ACTIVE);

  const { y, x } = getPointAtLength(path, length);
  const translateX: any = x;
  const translateY: any = sub(y, radius);

  const value = interpolate(translateX, {
    inputRange: [0, width],
    outputRange: [0, 6.4],
  });

  const formatInt = (value: Animated.Node<number>) => {
    const t = floor(divide(value, 1000));
    return cond(lessThan(t, 1), concat(t), concat(t, ',', modulo(value, 1000)));
  };

  const format = (value: Animated.Node<number>) => {
    const int = cond(
      lessOrEq(value, 0.5),
      multiply(floor(value), -1),
      floor(value),
    );
    const dec = floor(multiply(sub(value, int), 100));
    const formattedDec = cond(
      eq(dec, 0),
      '00',
      cond(lessThan(dec, 10), concat('0', dec), concat(dec)),
    );
    return concat('', int, '.', formattedDec);
  };

  useCode(
    () =>
      onChange(
        [value],
        call([value], ([xValue]) => {
          // const int = floor(xValue);
          // const dec = floor(multiply(sub(xValue, int), 100));
          console.log(xValue);
        }),
      ),
    [value],
  );

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
          style={[
            styles.line,
            {
              backgroundColor: white,
              opacity,
              transform: [{ translateX: add(translateX, radius) }],
            },
          ]}
        />
        <Animated.View
          style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            borderColor,
            borderWidth,
            backgroundColor: white,
            opacity,
            transform: [{ translateX }, { translateY }],
          }}
        />
        <Animated.View
          style={[
            styles.labelContainer,
            { transform: [{ translateX }], opacity },
          ]}>
          <ReText text={format(value)} style={styles.label} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};
