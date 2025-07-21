import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsSlice } from './ingredients/reducers';

const rootReducer = combineSlices(ingredientsSlice);

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
