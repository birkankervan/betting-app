import type { ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
}

// Odds API veri tipleri
export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

export interface Event {
  id: string;
  sport_key: string;
  sport_title: string; // added sport_title
  commence_time: string;
  home_team: string;
  away_team: string;
}

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

export interface EventWithOdds extends Event {
  bookmakers: Bookmaker[];
}

// Score API response type
export interface Score {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  completed: boolean;
  home_team: string;
  away_team: string;
  scores: Array<{ name: string; score: string }> | null;
  last_update: string | null;
}
