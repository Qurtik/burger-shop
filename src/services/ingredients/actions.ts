import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchIngredients } from './api';

export const loadIngredients = createAsyncThunk(
	'ingredients/fetchAllIngredients',
	async () => {
		return fetchIngredients();
	}
);
