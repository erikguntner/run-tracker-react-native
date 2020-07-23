import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteListStack } from './RouteList';
import { RecordScreen } from './Record';
import { ProfileScreen } from './Profile';
import { TabsParamList } from './TabsParamList';
import { CalendarStack } from './Calendar';

const Tab = createBottomTabNavigator<TabsParamList>();

const TabNavgiator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RouteList" component={RouteListStack} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Calendar" component={CalendarStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavgiator;
