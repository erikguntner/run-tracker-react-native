import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Animated, {
  cond,
  eq,
  set,
  not,
  useCode,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  withTransition,
  useValues,
  useGestureHandler,
  useDebug,
} from 'react-native-redash';

// import { Button } from '../components';
import { useSelector } from 'react-redux';
// import { logout } from '../redux/authSlice';
// import AsyncStorage from '@react-native-community/async-storage';
import { RootState } from '../redux/rootReducer';
import {
  RectButton,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';

interface RouteListScreenProps {}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  tap: {
    ...StyleSheet.absoluteFillObject,
    top: 50,
    left: width - 65,
    height: 45,
    width: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    paddingTop: 50,
    width,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  route: {
    padding: 20,
  },
  icon: {
    ...StyleSheet.absoluteFillObject,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RouteListScreen = ({}: RouteListScreenProps) => {
  const [open, state] = useValues(0, State.UNDETERMINED);
  const transition = withTransition(open, { duration: 300 });
  const gestureHandler = useGestureHandler({ state });

  const { routes } = useSelector(({ routeList }: RootState) => ({
    routes: routeList.routes,
  }));

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, height],
    extrapolate: Extrapolate.CLAMP,
  });

  const mapOpacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const listOpacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useDebug({ translateY });

  useCode(() => [cond(eq(state, State.END), set(open, not(open)))], [
    open,
    state,
  ]);

  useEffect(() => {
    // const fetchRoutes = async () => {
    //   const tokenString = await AsyncStorage.getItem('@token');
    //   try {
    //     const res = await fetch('http://localhost:3000/api/routes', {
    //       headers: {
    //         Accept: 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json',
    //         Authorization: JSON.stringify(tokenString),
    //       },
    //     });
    //     const data = await res.json();
    //     console.log('data', data);
    //   } catch (err) {
    //     console.log('error', err);
    //   }
    // };
    // fetchRoutes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      <Animated.View
        style={[styles.listContainer, { transform: [{ translateY }] }]}>
        <FlatList
          style={styles.list}
          renderItem={({ item: { name } }) => {
            return (
              <RectButton style={styles.route}>
                <Text>{name}</Text>
              </RectButton>
            );
          }}
          keyExtractor={({ name }, idx) => name + idx}
          data={routes}
        />
      </Animated.View>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View style={styles.tap}>
          <Animated.View style={[styles.icon, { opacity: listOpacity }]}>
            <Text>List</Text>
          </Animated.View>
          <Animated.View style={{ opacity: mapOpacity }}>
            <Text>Map</Text>
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default RouteListScreen;
