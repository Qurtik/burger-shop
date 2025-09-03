/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { createSlice } from '@reduxjs/toolkit';

import {
	registerUser,
	resetPassword,
	loginUser,
	checkUserAuth,
	changeUserData,
} from './actions';

import type { UnknownAction } from '@reduxjs/toolkit';

type State = {
	user?: {
		email: string;
		name: string;
	};
	isAuthChecked: boolean;
	isLoading: boolean;
	isError: boolean;
	errorText?: string;
};

const initialState: State = {
	user: undefined,
	isAuthChecked: false,
	isLoading: false,
	isError: false,
	errorText: undefined,
};

const makeFirstLetterUpper = (str?: string): string =>
	str !== undefined ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: (state) => {
			state.errorText = undefined;
			state.isError = false;
		},
		setIsAuthCheck: (state, action) => {
			state.isAuthChecked = action.payload;
		},
		logout: (state) => {
			state.user = undefined;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		},
	},
	selectors: {
		selectUser: (state) => state.user,
		selectIsAuthChecked: (state) => state.isAuthChecked,
		selectIsError: (state) => state.isError,
		selectErrorText: (state) => state.errorText,
		selectIsLoading: (state) => state.isLoading,
	},
	extraReducers(builder) {
		builder
			/* Reset Password */
			.addCase(resetPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(resetPassword.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})

			/* Register User */
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;

				const accessToken = action.payload.accessToken.split('Bearer ')[1];

				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorText = makeFirstLetterUpper(action.error.message);
			})

			/* Login User */
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;

				const accessToken = action.payload.accessToken.split('Bearer ')[1];

				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log(action);
				state.errorText = makeFirstLetterUpper(action.error.message);
			})

			/* Check User Auth */
			.addCase(checkUserAuth.fulfilled, (state, action) => {
				state.user = action.payload?.user;
				state.isAuthChecked = true;
				// Обработка матчера для всех запросов
				state.isLoading = false;
			})
			.addCase(checkUserAuth.rejected, (state) => {
				state.isAuthChecked = true;
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				// Обработка матчера для всех запросов
				state.isLoading = false;
			})

			/* Change User Data */
			.addCase(changeUserData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
			})
			.addCase(changeUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;

				state.errorText = makeFirstLetterUpper(action.error.message);
			});

		builder.addMatcher(
			(action: UnknownAction) => action.type.endsWith('/pending'),
			(state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorText = undefined;
			}
		);
	},
});

export default authSlice.reducer;

export const {
	selectUser,
	selectIsAuthChecked,
	selectIsError,
	selectErrorText,
	selectIsLoading,
} = authSlice.selectors;

export const { clearError, setIsAuthCheck, logout } = authSlice.actions;
