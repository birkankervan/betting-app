# Betting App

This project is a modern betting application built with React, TypeScript, Vite, Redux Toolkit, Firebase (Firestore, Auth, Analytics), and Tailwind CSS.

## Features

- User authentication (login/logout) with Firebase Auth
- Sports and events listing with odds
- Add bets to a cart (bet basket)
- Place bets: stores bet slips in Firestore and logs analytics events
- Responsive, modern UI with Tailwind CSS

## Firebase Integration

- **Firestore**: Bets are stored in the `bets` collection with user ID, bet details, total odds, and timestamp.
- **Analytics**: Placing a bet logs a `place_bet` event with user and bet info.
- **Auth**: User authentication is required to place bets.

## Development

### Install dependencies

```sh
pnpm install
```

### Start the development server

```sh
pnpm dev
```

### Build for production

```sh
pnpm build
```

### Lint and format

```sh
pnpm lint
pnpm format
```

## Environment Variables

Create a `.env` file with your Firebase project credentials:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Project Structure

- `src/components/CartDrawer.tsx`: Bet basket and bet placement logic
- `src/firebase.ts`: Firebase config and exports
- `src/store/`: Redux slices for auth, cart, odds, etc.
- `src/pages/`: Main app pages
