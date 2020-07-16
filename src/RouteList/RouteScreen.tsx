import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Polyline } from 'react-native-maps';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { useScrollHandler } from 'react-native-redash';

import RouteContent from './RouteContent';
import { RootState } from '../redux/rootReducer';
import { RouteListStackNavProps } from './RouteListParamList';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFitToCoordinates } from './useFitToCoordinates';

const { width, height } = Dimensions.get('window');

export const HEIGHT = height;
export const MAP_HEIGHT = 0.61 * height;
export const HEADER_HEIGHT = 84;
export const BORDER_RADIUS = 55;

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

  const { coordinates } = useFitToCoordinates(mapRef, data, {
    top: HEADER_HEIGHT,
    right: 50,
    bottom: 50 + BORDER_RADIUS,
    left: 50,
  });

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
        snapToOffsets={[200]}
        bounces={false}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        {...scrollHandler}>
        <RouteContent />
      </Animated.ScrollView>
      <View style={styles.header}>
        <View style={styles.bar}>
          <BorderlessButton onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </BorderlessButton>
        </View>
      </View>
    </View>
  );
};

export default RouteScreen;
