import { apiUrl } from '@/components/shared/urlApi';
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

// export const fetchIngredients = async (): Promise<TIngredient[]> => {
// 	return fetch(`${apiUrl} + /ingredients`)
// 		.then(async (data) => {
// 			await checkResponse<TIngredient>(data);
// 			// if (!data.ok) {
// 			// 	throw new Error(`HTTP error! status: ${data.status}`);
// 			// }
// 			// return data.json();
// 		})
// 		.then((response: { success: boolean; data: TIngredient[] }) => {
// 			if (response.success) {
// 				return response.data;
// 			} else {
// 				throw new Error('Ошибка загрузки данных');
// 			}
// 		})
// 		.catch((error: Error) => {
// 			console.error('Ошибка при загрузке ингредиентов:', error);
// 			throw new Error('Ошибка при загрузке ингредиентов');
// 		});
// };
