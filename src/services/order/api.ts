/* eslint-disable prettier/prettier */

import Http from '@/shared/api/http';

type Response = {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
};

const http = new Http();

export const create = async (ingredientIds: string[]): Promise<Response> => {
	return http
		.post<Response>('/orders', { ingredients: ingredientIds })
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error('Ошибка при создании заказа:', error);
			throw new Error('Ошибка при создании заказа');
		});
};
