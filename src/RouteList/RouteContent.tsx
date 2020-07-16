import React from 'react';
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

interface RouteContentProps {
  route: Route;
  setPointAlongPath: React.Dispatch<React.SetStateAction<number[]>>;
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
  },
});

const RouteContent = ({ route, setPointAlongPath }: RouteContentProps) => {
  const { units } = useSelector((state: RootState) => ({
    units: state.auth.user.units,
  }));

  const { name, distance, lines, created_at, city, state } = route;

  const convertedLength = convertLength(parseInt(distance), 'meters', units);
  console.log(convertedLength);

  return (
    <>
      <View style={styles.cover} />
      <View style={styles.content}>
        <Text style={styles.title}>{name.toUpperCase()}</Text>
        <ElevationChart {...{ lines, units, setPointAlongPath }} />
      </View>
    </>
  );
};

export default RouteContent;
