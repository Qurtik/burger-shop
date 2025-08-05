import { apiUrl } from '@/shared/urlApi';
import { checkResponse } from '@/utils/checkResponse';

import type { TIngredient } from '@/utils/types';

export const fetchIngredients = async (): Promise<TIngredient[]> => {
	return fetch(`${apiUrl}/ingredients`)
		.then((response) => checkResponse<TIngredient[]>(response))
		.catch((error: Error) => {
			console.error('Ошибка при загрузке ингредиентов:', error);
			throw new Error('Ошибка при загрузке ингредиентов');
		});
};
