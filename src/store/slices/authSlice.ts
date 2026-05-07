import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string | null;
  email: string | null;
  role: 'customer' | 'admin' | 'agent' | null;
  fullName: string | null;
  loading: boolean;
}

const initialState: UserState = {
  uid: null,
  email: null,
  role: null,
  fullName: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, loading: false };
    },
    clearUser: () => {
      return { ...initialState, loading: false };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
