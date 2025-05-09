import oddsApi from '@/api/oddsApi';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Event {
  id: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  sport_title: string;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk<Event[], void, { rejectValue: string }>(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await oddsApi.get<Event[]>('/sports/');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load events';
      });
  },
});

export default eventsSlice.reducer;
