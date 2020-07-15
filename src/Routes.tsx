import React, { useEffect } from 'react';
import {
  NavigationContainer,
  RouteProp,
  InitialState,
} from '@react-navigation/native';
import AuthStack from './Authentication/AuthStack';
import TabNavigator from './Tabs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/rootReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchUser } from './redux/authSlice';

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = ({}) => {
  const { user } = useSelector((state: RootState) => ({
    user: state.auth.user,
    loading: state.auth.loading,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const tokenString = await AsyncStorage.getItem('@token');
      console.log(tokenString);
      if (tokenString !== null) {
        dispatch(
          fetchUser({
            token: JSON.parse(tokenString),
          }),
        );
      }
    };

    getUser();
  }, []);

  console.log(user);

  return (
    <NavigationContainer>
      {user === null ? <AuthStack /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
