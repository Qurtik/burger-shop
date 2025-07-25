/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './actions';

import type { PayloadAction } from '@reduxjs/toolkit';

export type DefaultStateParams = {
	isLoading: boolean;
	isError: boolean;
};

export type TOrder = {
	name: string;
	order: {
		number: number;
	};
};

export type State = { order?: TOrder } & DefaultStateParams;

const initialState: State = {
	order: undefined,
	isLoading: false,
	isError: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	selectors: {
		selectOrderState: (state) => state,
		selectOrder: (state) => state.order,
		selectIsLoading: (state) => state.isLoading,
		selectIsError: (state) => state.isError,
	},
	extraReducers(builder) {
		builder
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
				state.order = undefined;
			})
			.addCase(createOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
				state.isLoading = false;
				state.isError = false;
				state.order = action.payload;
			})
			.addCase(createOrder.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export default orderSlice.reducer;

// export const {  } = ingredientsSlice.actions;

export const { selectOrderState, selectOrder, selectIsError, selectIsLoading } =
	orderSlice.selectors;
