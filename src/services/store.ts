/* eslint-disable prettier/prettier */
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsSlice } from './ingredients/reducers';
import { orderSlice } from './order/reducers';

import type { ThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

const rootReducer = combineSlices(ingredientsSlice, orderSlice);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const configureStore = (initialState?: Partial<RootState>) => {
	return createStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	UnknownAction
>;
