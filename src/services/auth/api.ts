/* eslint-disable prettier/prettier */
import Http from '@/shared/api/http';

const http = new Http();

type TResetPasswordResponse = { success: boolean; message: string };

type TUser = {
	email: string;
	name: string;
	password?: string;
};

type TResponseStatus = {
	success: boolean;
};

export type TRegisterResponse = {
	user: TUser;
	accessToken: string;
	refreshToken: string;
} & TResponseStatus;

export type TRegisterUser = {
	email: string;
	name: string;
	password: string;
};

type LoginRequest = {
	email: string;
	password: string;
};

type LoginResponse = {
	accessToken: string;
	refreshToken: string;
	user: TUser;
} & TResponseStatus;

type FetchUserResponse = {
	user: TUser;
} & TResponseStatus;

type TUpdateUserResponse = {
	user: TUser;
} & TResponseStatus;

export const postResetPassword = async (
	email: string
): Promise<TResetPasswordResponse> => {
	return http
		.post<TResetPasswordResponse>('/password-reset', { email })
		.then((response) => response)
		.catch((error: Error) => {
			console.error('Ошибка при восстановлнии пароля');
			throw new Error(error.message);
		});
};

export const register = async (userData: TRegisterUser): Promise<TRegisterResponse> => {
	return http
		.post<TRegisterResponse>('/auth/register', { ...userData })
		.then((response) => response)
		.catch((error: Error) => {
			console.error('Ошибка при регистрации');
			throw new Error(error.message);
		});
};

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
	return http
		.post<LoginResponse>('/auth/login', { ...payload })
		.then((response) => response)
		.catch((error: Error) => {
			console.error('Ошибка при входе в систему');
			throw new Error(error.message);
		});
};

export const fetchUser = async (): Promise<FetchUserResponse> => {
	return http
		.get<LoginResponse>('/auth/user')
		.then((response) => response)
		.catch((error: Error) => {
			console.error('Ошибка загрузки данных пользователя');
			throw new Error(error.message);
		});
};

export const updateUser = async (userData: TUser): Promise<TUpdateUserResponse> => {
	return http
		.patch<TUpdateUserResponse>('/auth/user', userData)
		.then((response) => response)
		.catch((error: Error) => {
			console.error(error);
			throw new Error(error.message);
		});
};
