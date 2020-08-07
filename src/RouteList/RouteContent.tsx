import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { convertLength } from '@turf/helpers';

import { HEIGHT, BORDER_RADIUS, HEADER_HEIGHT } from './RouteScreen';
import { Route } from './routeListSlice';
import { RootState } from '../redux/rootReducer';
import ElevationChart from './ElevationChart';

interface RouteContentProps {
  route: Route;
  setPointAlongPath: React.Dispatch<React.SetStateAction<number[]>>;
  canScroll: boolean;
}

const styles = StyleSheet.create({
  content: {
    ...StyleSheet.absoluteFillObject,
    height: HEIGHT - HEADER_HEIGHT - 80,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: '#2d3748',
    paddingTop: 55,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

const RouteContent = ({
  route,
  setPointAlongPath,
  canScroll,
}: RouteContentProps) => {
  const { units } = useSelector((state: RootState) => ({
    units: state.auth.user.units,
  }));

  const { name, distance, lines, created_at, city, state } = route;

  const convertedLength = convertLength(parseFloat(distance), 'meters', units);

  return (
    <View style={styles.content}>
      <ScrollView scrollEnabled={canScroll}>
        <Text style={styles.title}>{name.toUpperCase()}</Text>
        <ElevationChart {...{ lines, units, setPointAlongPath }} />
        <Text style={styles.title}>
          {convertedLength.toFixed(2)}
          {units}
        </Text>
      </ScrollView>
    </View>
  );
};

export default RouteContent;
