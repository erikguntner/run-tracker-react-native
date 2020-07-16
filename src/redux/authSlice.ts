import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { AppThunk } from './store';

interface User {
  username: string;
  email: string;
  units: 'miles' | 'kilometers';
}

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (
      state,
      action: PayloadAction<{ user: User | null; isAuthenticated: boolean }>,
    ) => {
      const { user, isAuthenticated } = action.payload;
      state.user = user;
      state.isAuthenticated = isAuthenticated;
    },
    updateLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { authenticateUser, updateLoadingState } = actions;

export default reducer;

export const fetchUser = ({ token }: { token: string }): AppThunk => async (
  dispatch,
) => {
  try {
    const res = await fetch('https://rtnt.now.sh/api/user', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: JSON.stringify(token),
      },
    });
    const { user } = await res.json();
    dispatch(authenticateUser({ user, isAuthenticated: true }));
    dispatch(updateLoadingState(false));
  } catch (err) {
    console.log('error', err);
  }
};

interface Register {
  username: string;
  email: string;
  password: string;
}

export const register = ({
  username,
  email,
  password,
}: Register): AppThunk => async (dispatch) => {
  try {
    const res = await fetch('https://rtnt.now.sh/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password, rememberMe: true }),
    });

    const { token, user } = await res.json();

    try {
      await AsyncStorage.setItem('@token', JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }

    dispatch(authenticateUser({ user, isAuthenticated: true }));
    dispatch(updateLoadingState(false));
  } catch (err) {
    console.log('error', err);
  }
};

interface Login {
  username: string;
  password: string;
}

export const login = ({ username, password }: Login): AppThunk => async (
  dispatch,
) => {
  try {
    const res = await fetch('https://rtnt.now.sh/api/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, rememberMe: true }),
    });

    const { token, user } = await res.json();

    try {
      await AsyncStorage.setItem('@token', JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }

    dispatch(authenticateUser({ user, isAuthenticated: true }));
    dispatch(updateLoadingState(false));
  } catch (err) {
    console.log('error', err);
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('@token');
  } catch (error) {
    console.log(error);
  }

  dispatch(
    authenticateUser({
      user: null,
      isAuthenticated: false,
    }),
  );

  // dispatch(updateLoadingState(false));
};
