/* eslint-disable prettier/prettier */
import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

import type { AppThunk, RootState } from '../store';
import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type DefaultStateParams = {
	isLoading: boolean;
	isError: boolean;
};

export type TIngredientConstructor = { uniqueKey?: string } & TIngredient;

export type State = {
	ingredients?: TIngredient[];
	ingredientsInContructor: TIngredientConstructor[];
} & DefaultStateParams;

export type Actions = {
	type: string;
	[key: string]: unknown;
};

const initialState: State = {
	ingredients: undefined,
	ingredientsInContructor: [],
	isLoading: false,
	isError: false,
};

// FIXME: Проверить
export const getIngredientById =
	(id: string): AppThunk<Promise<TIngredient | undefined | null>> =>
	async (_, getState) => {
		const ingredientSelector = selectIngredientById(id);
		const ingredient = ingredientSelector(getState());

		if (ingredient) return ingredient;
	};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		addBun: (state, action: PayloadAction<{ id: string }>) => {
			const bun = state.ingredients?.find((item) => item._id === action.payload.id);

			state.ingredientsInContructor.push({ ...bun! });
		},
		changeBun: (state, action: PayloadAction<{ id: string }>) => {
			const bun = state.ingredients?.find((item) => item._id === action.payload.id);

			const shouldUpdate = !state.ingredientsInContructor.find(
				(item) => item.type === 'bun' && item._id === action.payload.id
			);

			if (shouldUpdate) {
				const ingredientsWithNewBuns = state.ingredientsInContructor.map(
					(ingredient) => {
						if (ingredient.type === 'bun') {
							ingredient = { ...bun! };
						}
						return ingredient;
					}
				);
				state.ingredientsInContructor = ingredientsWithNewBuns;
			}
		},
		changeOrder(
			state,
			action: PayloadAction<{ currentIndex: number; targetIndex: number }>
		) {
			const newItems = [...state.ingredientsInContructor];
			const [movedItem] = newItems.splice(action.payload.currentIndex, 1);
			newItems.splice(action.payload.targetIndex, 0, { ...movedItem });

			state.ingredientsInContructor = newItems;
		},
		addIngredient: {
			reducer(state, action: PayloadAction<{ id: string; uniqueKey: string }>) {
				const ingredient = state.ingredients?.find(
					(item) => item._id === action.payload.id
				);

				state.ingredientsInContructor.push({
					...ingredient!,
					uniqueKey: action.payload.uniqueKey,
				});
			},
			prepare({ id }: { id: string }) {
				return {
					payload: {
						id,
						uniqueKey: nanoid(),
					},
				};
			},
		},
		removeIngredient: (state, action: PayloadAction<{ uniqueKey: string }>) => {
			const removeItemIndex = state.ingredientsInContructor.findIndex(
				(item) => item.uniqueKey === action.payload.uniqueKey
			);

			state.ingredientsInContructor.splice(removeItemIndex, 1);
		},
		clearIngredientsInConstructor: (state) => {
			const clearState = state.ingredientsInContructor.filter(
				(ingredient) => ingredient.type === 'bun'
			);
			state.ingredientsInContructor = clearState!;
		},
	},
	selectors: {
		selectIngredientsState: (state) => state,
		selectIngredients: (state) => state.ingredients,
		selectIngredientById: (state, payload) => state.ingredients?.find(ingredient => ingredient._id === payload),
		selectIngredientsInConstructor: (state) => state.ingredientsInContructor,
		selectIsLoading: (state) => state.isLoading,
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
					state.ingredients = action.payload;
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
	changeBun,
	addIngredient,
	removeIngredient,
	clearIngredientsInConstructor,
	changeOrder,
} = ingredientsSlice.actions;

export const {
	selectIngredientsState,
	selectIngredients,
	selectIsError,
	selectIsLoading,
	selectIngredientsInConstructor,
} = ingredientsSlice.selectors;

export const selectIngredientsCount = createSelector(
	[selectIngredientsInConstructor],
	(ingredients: TIngredient[]) => {
		const counts: Record<string, number> = {};

		ingredients.forEach((ingredient) => {
			const id = ingredient._id;
			counts[id] = (counts[id] || 0) + 1;
		});
		return counts;
	}
);

export const selectIngredientById = (
	id: string
): ((state: RootState) => TIngredient | undefined) =>
	createSelector([selectIngredients], (ingredients) =>
		ingredients?.find((item) => item._id === id)
	);
