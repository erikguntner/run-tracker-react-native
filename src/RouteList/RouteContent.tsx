import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  HEIGHT,
  BORDER_RADIUS,
  MAP_HEIGHT,
  HEADER_HEIGHT,
} from './RouteScreen';

interface RouteContentProps {}

const styles = StyleSheet.create({
  cover: {
    height: MAP_HEIGHT - BORDER_RADIUS,
  },
  content: {
    height: HEIGHT - HEADER_HEIGHT - 80,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: '#2d3748',
  },
});

const RouteContent = ({}: RouteContentProps) => {
  return (
    <View style={styles.cover}>
      <View style={styles.content}>
        <Text>this is the scroll view</Text>
      </View>
    </View>
  );
};

export default RouteContent;
