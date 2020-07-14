import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { useScrollHandler } from 'react-native-redash';

import { AuthNavProps } from './AuthParamList';
import { TopoSvg } from '../components';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const { width, height } = Dimensions.get('window');

export const WIDTH = width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 0.39 * height + 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3748',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    top: 0.39 * height,
    height: 0.61 * height,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    top: 45,
    bottom: 0,
    height: 3,
    width: 100,
    backgroundColor: '#0070f3',
  },
  line: {
    ...StyleSheet.absoluteFillObject,
    top: 45,
    bottom: 0,
    height: 3,
    width: 200,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

interface LoginProps {}

const Login = ({}: AuthNavProps<'Login'>) => {
  const { x, scrollHandler } = useScrollHandler();

  const scroll = useRef<Animated.ScrollView>(null);

  const handleScroll = (id: string) => {
    if (scroll.current) {
      const position = id === 'register' ? 0 : width;
      scroll.current.getNode().scrollTo({ x: position, animated: true });
    }
  };

  const translateX = interpolate(x, {
    inputRange: [0, width],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity1 = interpolate(x, {
    inputRange: [0, width],
    outputRange: [0.5, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity2 = interpolate(x, {
    inputRange: [0, width],
    outputRange: [1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TopoSvg />
        <View>
          <Text style={styles.title}>Run Tracker</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <RectButton
            activeOpacity={0}
            style={styles.button}
            onPress={() => handleScroll('register')}>
            <Animated.Text style={{ opacity: opacity2 }}>
              Register
            </Animated.Text>
          </RectButton>
          <RectButton
            activeOpacity={0}
            style={styles.button}
            onPress={() => handleScroll('login')}>
            <Animated.Text style={{ opacity: opacity1 }}>Login</Animated.Text>
          </RectButton>
          <View style={styles.line} />
          <Animated.View
            style={[styles.thumbnail, { transform: [{ translateX }] }]}
          />
        </View>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}>
          <RegisterForm />
          <LoginForm />
        </Animated.ScrollView>
      </View>
    </View>
  );
};
export default Login;
