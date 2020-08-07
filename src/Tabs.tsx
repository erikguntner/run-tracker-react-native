import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteListStack } from './RouteList';
import { RecordScreen } from './Record';
import { ProfileScreen } from './Profile';
import { TabsParamList } from './TabsParamList';
import { CalendarStack } from './Calendar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
MaterialCommunityIcons.loadFont();
Ionicons.loadFont();

const Tab = createBottomTabNavigator<TabsParamList>();

const TabNavgiator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0070f3',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="RouteList"
        component={RouteListStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-analytics-sharp" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-radio-button-on" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-calendar-sharp" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person-outline" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavgiator;
