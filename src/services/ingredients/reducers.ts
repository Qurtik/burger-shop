import { createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type DefaultStateParams = {
	isLoading: boolean;
	isError: boolean;
};

export type State = {
	data?: TIngredient[];
} & DefaultStateParams;

export type Actions = {
	type: string;
	[key: string]: unknown;
};

const initialState: State = {
	data: undefined,
	isLoading: false,
	isError: false,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		// INGREDIENT_LOADING: (state) => {
		// 	console.log('INGREDIENT_LOADING');
		// 	state.isLoading = true;
		// },
		// INGREDIENT_LOAD_SUCCESS: (state, action: PayloadAction<TIngredient[]>) => {
		// 	console.log('INGREDIENT_LOAD_SUCCESS');
		// 	console.log(action.payload);
		// 	state.isLoading = false;
		// 	state.isError = false;
		// 	state.data = action.payload;
		// },
		// INGREDIENT_LOAD_ERROR: (state) => {
		// 	state.isLoading = false;
		// 	state.isError = true;
		// },
	},
	selectors: {
		selectIngredientsState: (state) => state,
		selectIngredients: (state) => state.data,
		selectisLoading: (state) => state.isLoading,
		selectIsError: (state) => state.isError,
	},
	extraReducers(builder) {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				loadIngredients.fulfilled,
				(state, action: PayloadAction<TIngredient[]>) => {
					state.isLoading = false;
					state.isError = false;
					state.data = action.payload;
				}
			)
			.addCase(loadIngredients.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export default ingredientsSlice.reducer;

export const {
	selectIngredientsState,
	selectIngredients,
	selectIsError,
	selectisLoading,
} = ingredientsSlice.selectors;
