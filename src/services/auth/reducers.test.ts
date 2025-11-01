import { describe, it, expect, beforeEach, vi } from 'vitest';

import authReducer, {
	clearError,
	setIsAuthCheck,
	logout,
} from './reducers';
import {
	resetPassword,
	registerUser,
	loginUser,
	checkUserAuth,
	changeUserData,
} from './actions';

// Мокаем localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
});

// Тестовые данные
const mockUser = {
	email: 'test@example.com',
	name: 'Test User',
};

const mockAuthResponse = {
	user: mockUser,
	accessToken: 'Bearer test-access-token',
	refreshToken: 'test-refresh-token',
};

const initialState = {
	user: undefined,
	isAuthChecked: false,
	isLoading: false,
	isError: false,
	errorText: undefined,
};

describe('auth reducer', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Инициализация хранилища', () => {
		it('возвращает начальное состояние', () => {
			expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
		});
	});

	describe('Синхронные действия', () => {
		it('очищает ошибку', () => {
			const stateWithError = {
				...initialState,
				isError: true,
				errorText: 'Test error',
			};

			const action = clearError();
			const newState = authReducer(stateWithError, action);

			expect(newState.isError).toBe(false);
			expect(newState.errorText).toBeUndefined();
		});

		it('устанавливает статус проверки аутентификации', () => {
			const action = setIsAuthCheck(true);
			const newState = authReducer(initialState, action);

			expect(newState.isAuthChecked).toBe(true);
		});

		it('выполняет выход из системы', () => {
			const stateWithUser = {
				...initialState,
				user: mockUser,
			};

			const action = logout();
			const newState = authReducer(stateWithUser, action);

			expect(newState.user).toBeUndefined();
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken');
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken');
		});
	});

	describe('Сброс пароля', () => {
		it('успешный сброс пароля', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: resetPassword.fulfilled.type,
				payload: { success: true },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(false);
		});

		it('ошибка при сбросе пароля', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: resetPassword.rejected.type,
				error: { message: 'Reset password failed' },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(true);
		});
	});

	describe('Регистрация пользователя', () => {
		it('успешная регистрация', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: registerUser.fulfilled.type,
				payload: mockAuthResponse,
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(false);
			expect(newState.user).toEqual(mockUser);
			expect(newState.isAuthChecked).toBe(true);
			expect(localStorageMock.setItem).toHaveBeenCalledWith('accessToken', 'test-access-token');
			expect(localStorageMock.setItem).toHaveBeenCalledWith('refreshToken', 'test-refresh-token');
		});

		it('ошибка при регистрации', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: registerUser.rejected.type,
				error: { message: 'registration failed' },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(true);
			expect(newState.errorText).toBe('Registration failed');
		});
	});

	describe('Вход пользователя', () => {
		it('успешный вход', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: loginUser.fulfilled.type,
				payload: mockAuthResponse,
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(false);
			expect(newState.user).toEqual(mockUser);
			expect(newState.isAuthChecked).toBe(true);
			expect(localStorageMock.setItem).toHaveBeenCalledWith('accessToken', 'test-access-token');
			expect(localStorageMock.setItem).toHaveBeenCalledWith('refreshToken', 'test-refresh-token');
		});

		it('ошибка при входе', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: loginUser.rejected.type,
				error: { message: 'login failed' },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(true);
			expect(newState.errorText).toBe('Login failed');
		});
	});

	describe('Проверка аутентификации', () => {
		it('успешная проверка аутентификации', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: checkUserAuth.fulfilled.type,
				payload: { user: mockUser },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.user).toEqual(mockUser);
			expect(newState.isAuthChecked).toBe(true);
			expect(newState.isLoading).toBe(false);
		});

		it('ошибка при проверке аутентификации', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: checkUserAuth.rejected.type,
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isAuthChecked).toBe(true);
			expect(newState.isLoading).toBe(false);
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken');
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken');
		});
	});

	describe('Изменение данных пользователя', () => {
		it('успешное изменение данных', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
				user: mockUser,
			};

			const updatedUser = {
				email: 'updated@example.com',
				name: 'Updated User',
			};

			const action = {
				type: changeUserData.fulfilled.type,
				payload: { user: updatedUser },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.user).toEqual(updatedUser);
		});

		it('ошибка при изменении данных', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: changeUserData.rejected.type,
				error: { message: 'update failed' },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(true);
			expect(newState.errorText).toBe('Update failed');
			expect(newState.user).toBeUndefined();
		});
	});

	describe('Обработка краевых случаев', () => {
		it('обрабатывает undefined payload в checkUserAuth', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: checkUserAuth.fulfilled.type,
				payload: undefined,
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.user).toBeUndefined();
			expect(newState.isAuthChecked).toBe(true);
		});

		it('обрабатывает пустую строку в error message', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: loginUser.rejected.type,
				error: { message: '' },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.errorText).toBe('');
		});

		it('обрабатывает undefined error message', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: loginUser.rejected.type,
				error: { message: undefined },
			};
			const newState = authReducer(stateWithLoading, action);

			expect(newState.errorText).toBe('');
		});
	});
});
