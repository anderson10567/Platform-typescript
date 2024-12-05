import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { createAccount, enterAccount, editProfile } from '../service/account-service';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AccountState {
  token: string | null;
  user: User | null;
  isCreatingError: boolean;
  isCreatingLoader: boolean;
  isEnteringError: boolean;
  isEnteringLoader: boolean;
  isEditingLoader: boolean;
  isEditingError: boolean;
}

export interface CreateAccountParams {
  name: string;
  email: string;
  password: string;
  username: string;
  token: string;
}

interface EnterAccountParams {
  email: string;
  password: string;
  token: string;
}

interface EditProfileParams {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  token: string;
}

export const createAccountThunk = createAsyncThunk<{ user: User; token: string }, CreateAccountParams>(
  'account/createAccountFetch',
  async (user, { rejectWithValue }) => {
    return createAccount(user, rejectWithValue) as any;
  }
);
export const enterAccountThunk = createAsyncThunk<{ user: User; token: string }, EnterAccountParams>(
  'account/enterAccountFetch',
  async (user, { rejectWithValue }) => {
    return enterAccount(user, rejectWithValue) as any;
  }
);

export const editProfileThunk = createAsyncThunk<{ user: User; token: string }, EditProfileParams>(
  'account/editAccountFetch',
  async (user, { rejectWithValue }) => {
    return editProfile(user, rejectWithValue) as any;
  }
);

const initialState: AccountState = {
  token: null,
  user: null,
  isCreatingError: false,
  isCreatingLoader: false,
  isEnteringError: false,
  isEnteringLoader: false,
  isEditingLoader: false,
  isEditingError: false,
};

export const accountReducerSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    setUser(state) {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        state.user = JSON.parse(storedUser);
        state.token = JSON.parse(storedToken);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state) => {
        state.isCreatingLoader = true;
      })
      .addCase(createAccountThunk.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isCreatingLoader = false;
        state.isCreatingError = true;
        state.token = action?.payload?.token || '';
        state.user = action?.payload?.user || '';
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.isCreatingError = true;

        state.isCreatingLoader = false;
      })
      .addCase(enterAccountThunk.pending, (state) => {
        state.isEnteringLoader = true;
      })
      .addCase(enterAccountThunk.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isEnteringLoader = false;
        state.isEnteringError = true;
        state.token = action?.payload?.user?.token || '';
        state.user = action?.payload?.user || '';
        localStorage.setItem('token', JSON.stringify(action?.payload?.user?.token || ''));
        localStorage.setItem('user', JSON.stringify(action?.payload?.user || ''));
      })
      .addCase(enterAccountThunk.rejected, (state) => {
        state.isEnteringError = true;
        state.isEnteringLoader = false;
      })
      .addCase(editProfileThunk.pending, (state) => {
        state.isEditingLoader = true;
      })
      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.isEditingLoader = false;
        state.isEditingError = false;
        state.token = action.payload.user.token;
        state.user = action.payload.user;
        localStorage.clear();
        localStorage.setItem('token', JSON.stringify(action.payload.user.token));
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(editProfileThunk.rejected, (state) => {
        state.isEditingError = true;
        state.isEditingLoader = false;
      });
  },
});

export const { logOut, setUser } = accountReducerSlice.actions;
export const accountReducer = accountReducerSlice.reducer;
