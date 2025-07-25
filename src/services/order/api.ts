export const create = async <T>(ingredientIds: string[]): Promise<T> => {
	return fetch('https://norma.nomoreparties.space/api/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	})
		.then((data) => {
			if (!data.ok) {
				throw new Error(`HTTP error! status: ${data.status}`);
			}

			return data.json();
		})
		.then((response: T) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
			throw new Error('Ошибка оформления заказа');
		});
};
