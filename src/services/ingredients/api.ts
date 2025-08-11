import Http from '@/shared/api/http';

import type { TIngredient } from '@/utils/types';

type Response = {
	success: boolean;
	data: TIngredient[];
};

const http = new Http();

export const fetchIngredients = async (): Promise<TIngredient[]> => {
	return http
		.get<Response>('/ingredients')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Ошибка при загрузки ингредиентов:', error);
			throw new Error('Ошибка при загрузки ингредиентов');
		});
};
