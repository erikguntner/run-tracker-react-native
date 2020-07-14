import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';

export const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
