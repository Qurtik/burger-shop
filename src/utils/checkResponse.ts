/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

type IApiResponse<T> = {
	success: boolean;
	data: T;
};

export const checkResponse = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const json: IApiResponse<T> = await response.json();

	if (!json.success) {
		throw new Error('Ошибка загрузки данных');
	}

	return json.data;
};
