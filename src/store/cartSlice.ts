import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the CartItem type for the bet basket
export type CartItem = {
  id: string;
  home_team: string;
  away_team: string;
  odds: number;
};

// Define the initial state as an array of CartItem
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a bet to the cart, ensuring only one outcome per event is present
    addBet: (state, action: PayloadAction<CartItem>) => {
      // Remove any existing bet for the same event (same event id, home_team, away_team)
      state.items = state.items.filter(
        (item) =>
          !(
            item.id.startsWith(action.payload.id.split('-')[0] + '-') &&
            item.home_team === action.payload.home_team &&
            item.away_team === action.payload.away_team
          ),
      );
      // Add the new bet
      state.items.push(action.payload);
    },
    // Remove a bet from the cart by id
    removeBet: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Clear all bets from the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addBet, removeBet, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
