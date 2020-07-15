import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Route } from './routeListSlice';
import { Text } from 'react-native-svg';
import bbox from '@turf/bbox';
import center from '@turf/center';
import { multiLineString } from '@turf/helpers';

const { width, height } = Dimensions.get('window');

interface MapProps {
  routes: Route[];
}

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
    top: height - 300,
    height: 200,
    backgroundColor: 'red',
  },
  card: {
    width: width - 40,
    height: 200,
    marginHorizontal: 20,
    backgroundColor: 'blue',
  },
});

const Map = ({ routes }: MapProps) => {
  const [index, setIndex] = useState<number>(0);

  const getInterval = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const currIndex = offset / width;
    const { lines } = routes[index];
    var line = multiLineString(lines);
    var boundingBox = bbox(line);
    // mapRef.fitToCoordinates(
    //   [
    //     { latitude: boundingBox[1], longitude: boundingBox[0] },
    //     { latitude: boundingBox[3], longitude: boundingBox[2] },
    //   ],
    //   {
    //     edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
    //     animated: true,
    //   },
    // );
    setIndex(currIndex);
  };

  const { centerPoint, coordinates } = useMemo(() => {
    const { lines } = routes[index];
    const line = multiLineString(lines);
    const coordinates = lines
      .reduce((accum, curr) => accum.concat(curr), [])
      .map((route) => ({ latitude: route[1], longitude: route[0] }));

    return {
      boundingBox: bbox(line),
      centerPoint: center(line),
      coordinates,
    };
  }, [index, routes]);

  const longitude: number = centerPoint.geometry.coordinates[0];
  const latitude: number = centerPoint.geometry.coordinates[1];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Polyline
          {...{ coordinates }}
          strokeColor="#238C23" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>
      <ScrollView
        style={styles.scrollview}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={getInterval}
        bounces={false}>
        {routes.map((route) => (
          <View style={styles.card}>
            <Text>{route.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Map;
