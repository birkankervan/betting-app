import oddsApi from '@/api/oddsApi';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

// TypeScript interface for a Sport
export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

interface SportsState {
  sports: Sport[];
  loading: boolean;
  error: string | null;
}

const initialState: SportsState = {
  sports: [],
  loading: false,
  error: null,
};

export const fetchSports = createAsyncThunk<Sport[], void, { rejectValue: string }>(
  'sports/fetchSports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await oddsApi.get<Sport[]>('/sports');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to fetch sports',
      );
    }
  },
);

const sportsSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSports.fulfilled, (state, action: PayloadAction<Sport[]>) => {
        state.loading = false;
        state.sports = action.payload;
        state.error = null;
      })
      .addCase(fetchSports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch sports';
      });
  },
});

export default sportsSlice.reducer;
