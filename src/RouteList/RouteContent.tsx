import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { convertLength } from '@turf/helpers';

import {
  HEIGHT,
  BORDER_RADIUS,
  MAP_HEIGHT,
  HEADER_HEIGHT,
} from './RouteScreen';
import { Route } from './routeListSlice';
import { RootState } from '../redux/rootReducer';
import ElevationChart from './ElevationChart';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

interface RouteContentProps {
  route: Route;
  setPointAlongPath: React.Dispatch<React.SetStateAction<number[]>>;
  translateY: Animated.Node<number>;
  isUp: Animated.Node<number>;
  canScroll: boolean;
}

const styles = StyleSheet.create({
  cover: {
    height: MAP_HEIGHT - BORDER_RADIUS,
  },
  content: {
    height: HEIGHT - HEADER_HEIGHT - 80,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: '#2d3748',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

const RouteContent = ({
  route,
  setPointAlongPath,
  translateY,
  isUp,
  canScroll,
}: RouteContentProps) => {
  const { units } = useSelector((state: RootState) => ({
    units: state.auth.user.units,
  }));

  const ref = useRef<Animated.View>(null);

  const { name, distance, lines, created_at, city, state } = route;

  const convertedLength = convertLength(parseInt(distance), 'meters', units);

  return (
    <>
      {/* <View style={styles.cover} /> */}
      <Animated.View
        ref={ref}
        style={[styles.content, { transform: [{ translateY }] }]}>
        <Animated.ScrollView scrollEnabled={canScroll}>
          <Text style={styles.title}>{name.toUpperCase()}</Text>
          <ElevationChart {...{ lines, units, setPointAlongPath }} />
        </Animated.ScrollView>
      </Animated.View>
    </>
  );
};

export default RouteContent;
