import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type CalendarParamList = {
  Calendar: undefined;
};

export type CalendarStackNavProps<T extends keyof CalendarParamList> = {
  navigation: StackNavigationProp<CalendarParamList, T>;
  route: RouteProp<CalendarParamList, T>;
};
