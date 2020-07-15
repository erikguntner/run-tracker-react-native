import { createSlice } from '@reduxjs/toolkit';
// import { AppThunk } from './store';
import { routes } from '../utils/data';

export interface Route {
  id: number;
  name: string;
  image: string;
  user_id: string;
  lines: number[][][];
  start_point: number[];
  end_point: number[];
  points: number[][];
  distance: string;
  created_at: string;
  sports: string[];
  surfaces: string[];
  city: string;
  state: string;
}

interface InitialState {
  routes: Route[];
}

const initialState: InitialState = {
  routes,
};

const { reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// export const { } = actions;

export default reducer;
