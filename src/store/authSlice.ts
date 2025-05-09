import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Strictly serializable AuthUser type
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

export const signIn = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName, photoURL } = userCredential.user;
    return { uid, email: userEmail, displayName, photoURL };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Sign in failed');
  }
});

export const signOutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign out failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || 'Sign in failed';
        state.initialized = true;
      })
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.initialized = true;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign out failed';
        state.initialized = true;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
