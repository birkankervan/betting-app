import oddsApi from '@/api/oddsApi';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Interfaces for odds data
export interface Outcome {
  name: string;
  price: number;
}

export interface Market {
  key: string;
  outcomes: Outcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface EventWithOdds {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

interface OddsState {
  odds: EventWithOdds[];
  loading: boolean;
  error: string | null;
}

const initialState: OddsState = {
  odds: [],
  loading: false,
  error: null,
};

export const fetchOdds = createAsyncThunk<
  EventWithOdds[],
  { sportKey: string; regions: string; markets: string; oddsFormat: string },
  { rejectValue: string }
>('odds/fetchOdds', async ({ sportKey, regions, markets, oddsFormat }, { rejectWithValue }) => {
  try {
    const response = await oddsApi.get<EventWithOdds[]>(`/sports/${sportKey}/odds`, {
      params: { regions, markets, oddsFormat },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error.message || 'Failed to fetch odds',
    );
  }
});

const oddsSlice = createSlice({
  name: 'odds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOdds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOdds.fulfilled, (state, action: PayloadAction<EventWithOdds[]>) => {
        state.loading = false;
        state.odds = action.payload;
        state.error = null;
      })
      .addCase(fetchOdds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch odds';
      });
  },
});

export default oddsSlice.reducer;
