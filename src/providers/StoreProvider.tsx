import store from '@/store/store';
import { Provider } from 'react-redux';
import type { ProviderProps } from './types';

const StoreProvider = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
