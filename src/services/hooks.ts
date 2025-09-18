import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store';

// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
// export const useDispatch = () => dispatchHook<AppDispatch>();

export const useSelector = selectorHook.withTypes<RootState>();
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
