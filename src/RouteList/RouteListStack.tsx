import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteListScreen } from '.';
import { RouteListParamList } from './RouteListParamList';
import RouteScreen from './RouteScreen';

const Stack = createStackNavigator<RouteListParamList>();

const RouteListStack = () => {
  return (
    <Stack.Navigator initialRouteName="RouteList">
      <Stack.Screen
        name="RouteList"
        component={RouteListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Route" component={RouteScreen} />
    </Stack.Navigator>
  );
};

export default RouteListStack;
