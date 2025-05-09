import axiosInstance from '@/api/oddsApi';
import type { Event, EventWithOdds, Score, Sport } from '@/providers/types';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const oddsApi = createApi({
  reducerPath: 'oddsApi',
  baseQuery: (async ({ url, method = 'get', data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  }) as BaseQueryFn<{ url: string; method?: string; data?: any; params?: any }, unknown, unknown>,
  endpoints: (builder) => ({
    getSports: builder.query<Sport[], void>({
      query: () => ({
        url: '/sports',
      }),
    }),
    getEventsBySport: builder.query<Event[], string>({
      query: (sportKey) => ({
        url: `/sports/${sportKey}/events`,
      }),
    }),
    getOdds: builder.query<
      EventWithOdds[],
      { sportKey: string; regions: string; markets: string; oddsFormat: string }
    >({
      query: ({ sportKey, regions, markets, oddsFormat }) => ({
        url: `/sports/${sportKey}/odds`,
        params: {
          regions,
          markets,
          oddsFormat,
        },
      }),
    }),
    getScoresBySport: builder.query<Score[], string>({
      query: (sportKey) => ({
        url: `/sports/${sportKey}/scores`,
      }),
    }),
  }),
});

export const {
  useGetSportsQuery,
  useGetEventsBySportQuery,
  useGetOddsQuery,
  useGetScoresBySportQuery,
} = oddsApi;
