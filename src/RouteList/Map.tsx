import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import MapView, { Polyline } from 'react-native-maps';
import { Route } from './routeListSlice';
import bbox from '@turf/bbox';
import center from '@turf/center';
import { multiLineString } from '@turf/helpers';
import { useScrollHandler } from 'react-native-redash';
import RouteCard from './RouteCard';

const { width, height } = Dimensions.get('window');

interface MapProps {
  routes: Route[];
}

export const WIDTH = width;
export const SPACING = 24;
export const PADDING_LEFT = SPACING * 2;
export const END_MARGIN = SPACING * 4;
export const OFFSET_WIDTH = SPACING * 3;
export const CARD_WIDTH = WIDTH - END_MARGIN;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  scrollview: {
    ...StyleSheet.absoluteFillObject,
    top: height - 190 - 80,
    height: 150 + 40,
    paddingVertical: 20,
    paddingLeft: PADDING_LEFT,
  },
});

const Map = ({ routes }: MapProps) => {
  const mapRef = useRef<MapView | null>(null);
  const [index, setIndex] = useState<number>(0);
  const { scrollHandler, x } = useScrollHandler();

  const getInterval = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const currIndex = offset / (width - OFFSET_WIDTH);
    setIndex(currIndex);
  };

  const { coordinates } = useMemo(() => {
    const { lines } = routes[index];
    const line = multiLineString(lines);
    var boundingBox = bbox(line);
    const coordinates = lines
      .reduce((accum, curr) => accum.concat(curr), [])
      .map((route) => ({ latitude: route[1], longitude: route[0] }));

    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [
          { latitude: boundingBox[1], longitude: boundingBox[0] },
          { latitude: boundingBox[3], longitude: boundingBox[2] },
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 250, left: 50 },
          animated: false,
        },
      );
    }

    return {
      boundingBox: bbox(line),
      centerPoint: center(line),
      coordinates,
    };
  }, [index, routes]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map}>
        <Polyline
          {...{ coordinates }}
          strokeColor="#0070f3" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>
      <Animated.ScrollView
        style={styles.scrollview}
        horizontal
        snapToInterval={width - OFFSET_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={getInterval}
        bounces={false}
        {...scrollHandler}>
        {routes.map((route, idx) => (
          <RouteCard key={idx} index={idx} {...{ route, x }} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Map;
