import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';
import routeList from '../RouteList/routeListSlice';

export const rootReducer = combineReducers({
  auth,
  routeList,
});

export type RootState = ReturnType<typeof rootReducer>;
