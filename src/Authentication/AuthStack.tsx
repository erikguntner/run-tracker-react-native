import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './AuthScreen';
import { AuthParamList } from './AuthParamList';

const Stack = createStackNavigator<AuthParamList>();

interface Props {}

const AuthStack = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login">
      <Stack.Screen
        options={{
          headerTitle: 'Signin',
        }}
        name="Login"
        component={AuthScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
