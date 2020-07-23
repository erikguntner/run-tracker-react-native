import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarParamList } from './CalendarParamList';
import Calendar from './Calendar';

const Stack = createStackNavigator<CalendarParamList>();

const RouteListStack = () => {
  return (
    <Stack.Navigator initialRouteName="Calendar">
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RouteListStack;
