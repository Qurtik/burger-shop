/* eslint-disable prettier/prettier */

import { apiUrl } from '@/shared/urlApi';
import { checkResponse } from '@/utils/checkResponse';

export const create = async <T>(ingredientIds: string[]): Promise<T> => {
	return fetch(`${apiUrl}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	})
		.then((response) => checkResponse<T>(response))
		.catch((error: Error) => {
			console.error('Ошибка при загрузке ингредиентов:', error);
			throw new Error('Ошибка при загрузке ингредиентов');
		});
};
