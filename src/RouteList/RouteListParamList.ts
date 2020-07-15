import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RouteListParamList = {
  RouteList: undefined;
};
export type RouteListStackNavProps<T extends keyof RouteListParamList> = {
  navigation: StackNavigationProp<RouteListParamList, T>;
  route: RouteProp<RouteListParamList, T>;
};
