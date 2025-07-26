import { createAsyncThunk } from '@reduxjs/toolkit';

import { create } from './api';

type TOrderResponse = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export const createOrder = createAsyncThunk<TOrderResponse, string[]>(
	'order/createOrder',
	async (ingredientIds: string[]) => {
		return create(ingredientIds);
	}
);
