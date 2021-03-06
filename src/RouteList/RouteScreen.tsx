import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Polyline, Circle } from 'react-native-maps';
import Animated, {
  interpolate,
  Extrapolate,
  useCode,
  cond,
  eq,
  set,
  onChange,
  call,
} from 'react-native-reanimated';
import {
  panGestureHandler,
  withSpring,
  clamp,
  useValues,
} from 'react-native-redash';
import {
  BorderlessButton,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { useMemoOne } from 'use-memo-one';

import RouteContent from './RouteContent';
import { RootState } from '../redux/rootReducer';
import { RouteListStackNavProps } from './RouteListParamList';
import { useFitToCoordinates } from './useFitToCoordinates';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export const HEIGHT = height;
export const MAP_HEIGHT = 0.61 * height;
export const HEADER_HEIGHT = 84;
export const BORDER_RADIUS = 35;
const config = {
  damping: 50,
  mass: 1,
  stiffness: 300,
  overshootClamping: true,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

const RouteScreen = ({
  route,
  navigation,
}: RouteListStackNavProps<'Route'>) => {
  const mapRef = useRef<MapView | null>(null);
  const [pointAlongPath, setPointAlongPath] = useState<number[]>([]);
  const [canScroll, setCanScroll] = useState<boolean>(false);

  const { data } = useSelector(({ routeList }: RootState) => ({
    data: routeList.routes.find(({ id }) => id === route.params.id),
  }));

  const { gestureHandler, state, translation, velocity } = useMemoOne(
    () => panGestureHandler(),
    [],
  );
  const [offset, isUp] = useValues(MAP_HEIGHT, 0);

  const { coordinates } = useFitToCoordinates(mapRef, data, {
    top: HEADER_HEIGHT,
    right: 50,
    bottom: 50 + BORDER_RADIUS,
    left: 50,
  });

  const translateY = useMemoOne(
    () =>
      clamp(
        withSpring({
          state,
          offset,
          value: translation.y,
          velocity: velocity.y,
          snapPoints: [MAP_HEIGHT, MAP_HEIGHT - 200, HEADER_HEIGHT],
          config,
        }),
        HEADER_HEIGHT,
        MAP_HEIGHT,
      ),
    [],
  );

  const scale = interpolate(translateY, {
    inputRange: [0, MAP_HEIGHT - 200],
    outputRange: [0.85, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const mapTranslateY = interpolate(translateY, {
    inputRange: [MAP_HEIGHT - 200, MAP_HEIGHT],
    outputRange: [-100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () => [
      cond(eq(translateY, HEADER_HEIGHT), set(isUp, 1), set(isUp, 0)),
      onChange(
        [isUp],
        call([isUp], ([up]) => {
          setCanScroll(!!up);
        }),
      ),
    ],
    [isUp, translateY],
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.mapContainer,
          { transform: [{ scale }, { translateY: mapTranslateY }] },
        ]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          scrollEnabled={false}
          pitchEnabled={false}
          zoomEnabled={false}
          zoomTapEnabled={false}
          rotateEnabled={false}>
          <Polyline
            {...{ coordinates }}
            strokeColor="#0070f3" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={3}
          />
          {pointAlongPath.length === 2 && (
            <Circle
              center={{
                latitude: pointAlongPath[1],
                longitude: pointAlongPath[0],
              }}
              radius={30}
              strokeColor="#0070f3"
              fillColor="white"
            />
          )}
        </MapView>
      </Animated.View>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateY }],
        }}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
            }}>
            <RouteContent
              route={data}
              {...{ setPointAlongPath, canScroll, isUp }}
            />
            <View style={styles.sheetHeader}>
              <View style={styles.bar} />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <View style={styles.header}>
        <View style={styles.buttons}>
          <BorderlessButton
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="ios-chevron-back" size={32} color="#0070f3" />
          </BorderlessButton>
          <BorderlessButton
            style={{ paddingRight: 20 }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="ios-share-outline" size={32} color="#0070f3" />
          </BorderlessButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
  },
  mapContainer: {
    height: MAP_HEIGHT,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    flex: 1,
    width,
  },
  header: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_HEIGHT,
    paddingTop: 44,
  },
  scrollview: {
    flex: 1,
  },
  sheetHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flex: 1,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: 75,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    opacity: 0.4,
  },
});

export default RouteScreen;
