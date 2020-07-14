import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import AsyncStorage from '@react-native-community/async-storage';

interface HomeScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeScreen = ({}: HomeScreenProps) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      const tokenString = await AsyncStorage.getItem('@token');

      try {
        const res = await fetch('http://localhost:3000/api/routes', {
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: JSON.stringify(tokenString),
          },
        });
        const data = await res.json();
        console.log('data', data);
      } catch (err) {
        console.log('error', err);
      }
    };

    // fetchRoutes();
  }, []);

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button variant="primary" label="logout" {...{ onPress }} />
    </View>
  );
};

export default HomeScreen;
