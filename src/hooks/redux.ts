import type { AppDispatch, RootState } from '@/store/store';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Typed dispatch hook for strict typing and minimal bundle size
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed selector hook for strict typing and minimal bundle size
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
