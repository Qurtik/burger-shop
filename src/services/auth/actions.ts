/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';

import Http from '@/shared/api/http';

import {
	postResetPassword,
	register,
	login,
	fetchUser,
	updateUser,
	TRegisterUser,
} from './api';
import { setIsAuthCheck } from './reducers';

const http = new Http();
export type TLoginUser = Omit<TRegisterUser, 'name'>;

export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async (email: string) => {
		try {
			return postResetPassword(email);
		} catch (error) {
			console.log('ERROR', error);
			if (error instanceof Error) throw new Error(error.message);
			throw new Error('Unknown error');
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({ email, name, password }: TRegisterUser) => {
		try {
			const result = await register({ email, name, password });
			return result;
		} catch (error) {
			console.log('ERROR', error);
			if (error instanceof Error) throw new Error(error.message);
			throw new Error('Unknown error');
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }: TLoginUser) => {
		try {
			const result = await login({ email, password });

			return result;
		} catch (error) {
			console.log('ERROR', error);
			if (error instanceof Error) throw new Error(error.message);
			throw new Error('Unknown error');
		}
	}
);

export const changeUserData = createAsyncThunk(
	'auth/changeUserData',
	async ({
		name,
		email,
		password,
	}: Omit<TRegisterUser, 'password'> & { password?: string }) => {
		return updateUser({ name, email, password });
	}
);

export const checkUserAuth = createAsyncThunk(
	'auth/checkUserAuth',
	async (_, { dispatch }) => {
		if (http.getAccessToken()) {
			try {
				return fetchUser();
			} catch (error) {
				console.log('ERROR', error);
				if (error instanceof Error) throw new Error(error.message);
				throw new Error('Unknown error');
			}
		} else {
			dispatch(setIsAuthCheck(true));
		}
	}
);
