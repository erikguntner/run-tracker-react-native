import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  divide,
  sub,
  Extrapolate,
} from 'react-native-reanimated';
import { routes } from '../utils/data';
import { WIDTH, OFFSET_WIDTH, END_MARGIN, SPACING, CARD_WIDTH } from './Map';
import { Route } from './routeListSlice';

interface RouteCardProps {
  index: number;
  route: Route;
  x: Animated.Node<number>;
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 150,
    marginRight: SPACING,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,

    elevation: 8,
  },
});

const RouteCard = ({ index, route, x }: RouteCardProps) => {
  const scale = interpolate(divide(x, sub(WIDTH, OFFSET_WIDTH)), {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.95, 1, 0.95],
    extrapolate: Extrapolate.CLAMP,
  });

  const shadowOpacity = interpolate(divide(x, sub(WIDTH, OFFSET_WIDTH)), {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.1, 0.3, 0.1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          shadowOpacity,
          marginRight: index === routes.length - 1 ? END_MARGIN : SPACING,
          transform: [{ scale }],
        },
      ]}>
      <Text>{route.name}</Text>
    </Animated.View>
  );
};

export default RouteCard;
