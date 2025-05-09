import { BrowserRouter } from 'react-router-dom';
import type { ProviderProps } from './types';

const RouteProvider = ({ children }: ProviderProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouteProvider;
