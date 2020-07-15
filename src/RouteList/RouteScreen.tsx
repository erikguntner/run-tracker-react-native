import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Polyline } from 'react-native-maps';
import bbox from '@turf/bbox';
import { multiLineString } from '@turf/helpers';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { useScrollHandler } from 'react-native-redash';

import { RootState } from '../redux/rootReducer';
import { RouteListStackNavProps } from './RouteListParamList';
import { BorderlessButton } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const MAP_HEIGHT = 0.61 * height;
const HEADER_HEIGHT = 84;
const BORDER_RADIUS = 55;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: MAP_HEIGHT,
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
  bar: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  scrollview: {
    flex: 1,
  },
  cover: {
    height: MAP_HEIGHT - BORDER_RADIUS,
  },
  content: {
    height: 800,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: '#2d3748',
  },
});

const RouteScreen = ({
  route,
  navigation,
}: RouteListStackNavProps<'Route'>) => {
  const mapRef = useRef<MapView | null>(null);
  const { data } = useSelector(({ routeList }: RootState) => ({
    data: routeList.routes.find(({ id }) => id === route.params.id),
  }));
  const { y, scrollHandler } = useScrollHandler();

  const scale = interpolate(y, {
    inputRange: [-300, 0],
    outputRange: [1.8, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY = interpolate(y, {
    inputRange: [0, MAP_HEIGHT],
    outputRange: [0, -100],
    extrapolate: Extrapolate.CLAMP,
  });

  useEffect(() => {
    if (mapRef.current) {
      const { lines } = data;
      const line = multiLineString(lines);
      var boundingBox = bbox(line);
      mapRef.current.fitToCoordinates(
        [
          { latitude: boundingBox[1], longitude: boundingBox[0] },
          { latitude: boundingBox[3], longitude: boundingBox[2] },
        ],
        {
          edgePadding: {
            top: HEADER_HEIGHT,
            right: 50,
            bottom: 50 + BORDER_RADIUS,
            left: 50,
          },
          animated: false,
        },
      );
    }
  }, []);

  const { coordinates } = useMemo(() => {
    const { lines } = data;
    const coordinates = lines
      .reduce((accum, curr) => accum.concat(curr), [])
      .map((route) => ({ latitude: route[1], longitude: route[0] }));

    return {
      coordinates,
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.mapContainer,
          { transform: [{ scale }, { translateY }] },
        ]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          scrollEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}>
          <Polyline
            {...{ coordinates }}
            strokeColor="#0070f3" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={3}
          />
        </MapView>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
        {...scrollHandler}>
        <View style={styles.cover} />
        <View style={styles.content}>
          <Text>this is the scroll view</Text>
        </View>
      </Animated.ScrollView>
      <View style={styles.header}>
        <View style={styles.bar}>
          <BorderlessButton
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text>Back</Text>
          </BorderlessButton>
        </View>
      </View>
    </View>
  );
};

export default RouteScreen;
