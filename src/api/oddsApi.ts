import type { AxiosInstance } from 'axios';
import axios from 'axios';

const oddsApi: AxiosInstance = axios.create({
  baseURL: 'https://api.the-odds-api.com/v4',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

oddsApi.interceptors.request.use(
  (config) => {
    config.params = { ...config.params, apiKey: import.meta.env.VITE_ODDS_API_KEY };
    return config;
  },
  (error) => Promise.reject(error),
);

export default oddsApi;
