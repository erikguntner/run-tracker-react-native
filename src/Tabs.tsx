import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteListScreen } from './RouteList';
import { RecordScreen } from './Record';
import { ProfileScreen } from './Profile';
import { TabsParamList } from './TabsParamList';

const Tab = createBottomTabNavigator<TabsParamList>();

const TabNavgiator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RouteList" component={RouteListScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavgiator;
