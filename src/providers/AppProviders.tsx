import { auth } from '@/firebase';
import { setUser } from '@/store/authSlice';
import store from '@/store/store';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import type { ProviderProps } from './types';

function serializeUser(user: import('firebase/auth').User | null) {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

const AuthPersistence: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(serializeUser(user)));
    });
    return unsubscribe;
  }, [dispatch]);
  return <>{children}</>;
};

export const AppProviders = ({ children }: ProviderProps) => (
  <ReduxProvider store={store}>
    <AuthPersistence>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthPersistence>
  </ReduxProvider>
);
