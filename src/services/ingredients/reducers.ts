/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

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

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		changeBun: (state, action: PayloadAction<{ id: string }>) => {
			const bun = state.ingredients?.find((item) => item._id === action.payload.id);
			// const indexForReplace = state.ingredientsInContructor?.findIndex(
			// 	(item) => item.type === 'bun'
			// );

			// TODO: Доделать
			// const shouldUpdate = !(
			// 	state.ingredientsInContructor[indexForReplace]._id === bun?._id
			// );

			// if (indexForReplace >= 0 && bun && shouldUpdate) {
			// 	state.ingredientsInContructor[indexForReplace] = bun;
			// }

			const ingredientsWithNewBuns = state.ingredientsInContructor.map(
				(ingredient) => {
					if (ingredient.type === 'bun') {
						ingredient = { ...bun! };
					}
					return ingredient;
				}
			);
			state.ingredientsInContructor = ingredientsWithNewBuns;
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
		selectIngredientsInConstructor: (state) => state.ingredientsInContructor,
		selectIsLoading: (state) => state.isLoading,
		selectIsError: (state) => state.isError,
		// getTotalOrderPrice: createSelector(
		// 	(state) =>
		// 		ingredientsSlice.getSelectors().selectIngredientsInConstructor(state),
		// 	(ingredients) => ingredients.reduce
		// ),
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

					const firstBun = action.payload.find((item) => item.type === 'bun');
					if (firstBun) {
						state.ingredientsInContructor.push(firstBun);
					}
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
