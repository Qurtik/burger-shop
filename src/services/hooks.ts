import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useSelector = selectorHook.withTypes<RootState>();
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
