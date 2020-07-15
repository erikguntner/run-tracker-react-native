import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteListScreen } from '.';
import { RouteListParamList } from './RouteListParamList';

const Stack = createStackNavigator<RouteListParamList>();

const RouteListStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName="RouteList">
      <Stack.Screen name="RouteList" component={RouteListScreen} />
    </Stack.Navigator>
  );
};

export default RouteListStack;
