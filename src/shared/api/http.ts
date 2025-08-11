/* eslint-disable prettier/prettier */
import { apiUrl } from '@/shared/urlApi';

type IApiResponseBase = {
	success: boolean;
	message?: string;
};

type RefreshTokenResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

type IApiResponse<T> = T & IApiResponseBase;

class Http {
	constructor(private baseUrl: string = apiUrl) {
		this.baseUrl = baseUrl;
	}

	public async get<T>(url: string, params?: RequestInit): Promise<T> {
		const response = await this.baseRequest<T>(url, {
			...params,
			method: 'GET',
		});

		return response;
	}

	public async post<T>(url: string, data: object, params?: RequestInit): Promise<T> {
		const body = JSON.stringify(data);

		const response = await this.baseRequest<T>(url, {
			...params,
			method: 'POST',
			body,
		});

		return response;
	}

	public async patch<T>(url: string, data: object, params?: RequestInit): Promise<T> {
		const body = JSON.stringify(data);

		return await this.baseRequest<T>(url, {
			...params,
			method: 'PATCH',
			body,
		});
	}

	private async baseRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
		const accessToken = this.getAccessToken();

		if (accessToken) {
			options = {
				...options,
				headers: {
					...options.headers,
					authorization: `Bearer ${accessToken}`,
				},
			};
		}

		const response = await fetch(`${this.baseUrl}${url}`, {
			method: options?.method,
			headers: {
				'Content-Type': 'application/json',
				cors: 'cors',
				...options?.headers,
			},
			body: options?.body,
			...options,
		});

		return this.checkResponse<T>(response);
	}

	public getAccessToken(): string | undefined {
		return localStorage.getItem('accessToken') ?? undefined;
	}

	private async refreshToken(): Promise<void> {
		const refreshToken = localStorage.getItem('refreshToken');

		try {
			const token = await this.baseRequest<RefreshTokenResponse>('/auth/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token: refreshToken }),
			});

			localStorage.setItem('accessToken', token.accessToken.split('Bearer ')[1]);
			localStorage.setItem('refreshToken', token.refreshToken);
		} catch (error) {
			console.error('Ошибка при обновлении токена');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			throw error;
		}
	}

	private async checkResponse<T>(response: Response): Promise<IApiResponse<T>> {
		if (!response.ok) {
			try {
				const error = (await response.json()) as IApiResponseBase;

				if (error.message === 'jwt expired') {
					await this.refreshToken();
					const result = await response.json();
					return result;
				}

				console.log('Значение не вернулось 1');

				throw new Error(
					error.message ??
						`HTTP error!\n\n Status:  ${response.status} \n StatusText: ${response.statusText} \n`
				);
			} catch (error) {
				console.log('Значение не вернулось 2');
				if (error instanceof Error) throw new Error(error.message);
				throw new Error('Unknown error');
			}
		}

		console.log('Значение не вернулось 3');

		const json = (await response.json()) as IApiResponse<T>;

		if (!json.success) {
			throw new Error('Ошибка загрузки данных');
		}

		return json;
	}
}

export default Http;
