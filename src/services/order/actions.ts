/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { create } from './api';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds: string[]) => {
		return create(ingredientIds);
	}
);
