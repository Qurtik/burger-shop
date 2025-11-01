import { describe, it, expect } from 'vitest';

import feedReducer from './reducers';
import { onOpen, onClose, onError, onMessage } from './actions';
import type { TFeedOrder, TOrder } from './actions';

// Тестовые данные
const mockOrder: TOrder = {
	_id: 'order-1',
	status: 'done',
	number: 12345,
	name: 'Краторный бургер',
	createdAt: '2024-01-01T00:00:00.000Z',
	updatedAt: '2024-01-01T00:00:00.000Z',
	ingredients: ['ingredient-1', 'ingredient-2'],
};

const mockFeedData: TFeedOrder = {
	success: true,
	orders: [mockOrder],
	total: 100,
	totalToday: 10,
};

const channelInitial = {
	orders: [],
	total: 0,
	totalToday: 0,
	isConnected: false,
	isLoaded: false,
	isError: false,
};

const initialState = {
	all: { ...channelInitial },
	user: { ...channelInitial },
};

describe('feed reducer', () => {
	describe('Инициализация хранилища', () => {
		it('возвращает начальное состояние', () => {
			expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
		});
	});

	describe('WebSocket соединение', () => {
		it('устанавливает соединение для all', () => {
			const action = onOpen('all');
			const newState = feedReducer(initialState, action);

			expect(newState.all.isConnected).toBe(true);
			expect(newState.all.isError).toBe(false);
			expect(newState.user.isConnected).toBe(false); // user канал не изменился
		});

		it('устанавливает соединение для user', () => {
			const action = onOpen('user');
			const newState = feedReducer(initialState, action);

			expect(newState.user.isConnected).toBe(true);
			expect(newState.user.isError).toBe(false);
			expect(newState.all.isConnected).toBe(false); // all канал не изменился
		});

		it('закрывает соединение для all', () => {
			const stateWithConnection = {
				...initialState,
				all: {
					...channelInitial,
					isConnected: true,
					isError: true,
				},
			};

			const action = onClose('all');
			const newState = feedReducer(stateWithConnection, action);

			expect(newState.all.isConnected).toBe(false);
			expect(newState.all.isError).toBe(false);
		});

		it('закрывает соединение для user', () => {
			const stateWithConnection = {
				...initialState,
				user: {
					...channelInitial,
					isConnected: true,
					isError: true,
				},
			};

			const action = onClose('user');
			const newState = feedReducer(stateWithConnection, action);

			expect(newState.user.isConnected).toBe(false);
			expect(newState.user.isError).toBe(false);
		});

		it('обрабатывает ошибку для all', () => {
			const stateWithConnection = {
				...initialState,
				all: {
					...channelInitial,
					isConnected: true,
				},
			};

			const action = onError('Connection failed', 'all');
			const newState = feedReducer(stateWithConnection, action);

			expect(newState.all.isConnected).toBe(false);
			expect(newState.all.isError).toBe(true);
		});

		it('обрабатывает ошибку для user', () => {
			const stateWithConnection = {
				...initialState,
				user: {
					...channelInitial,
					isConnected: true,
				},
			};

			const action = onError('Connection failed', 'user');
			const newState = feedReducer(stateWithConnection, action);

			expect(newState.user.isConnected).toBe(false);
			expect(newState.user.isError).toBe(true);
		});
	});

	describe('Получение сообщений', () => {
		it('обрабатывает успешное сообщение для all', () => {
			const action = onMessage(mockFeedData, 'all');
			const newState = feedReducer(initialState, action);

			expect(newState.all.orders).toEqual(mockFeedData.orders);
			expect(newState.all.total).toBe(mockFeedData.total);
			expect(newState.all.totalToday).toBe(mockFeedData.totalToday);
			expect(newState.all.isLoaded).toBe(true);
			expect(newState.all.isError).toBe(false);
		});

		it('обрабатывает успешное сообщение для user', () => {
			const action = onMessage(mockFeedData, 'user');
			const newState = feedReducer(initialState, action);

			expect(newState.user.orders).toEqual(mockFeedData.orders);
			expect(newState.user.total).toBe(mockFeedData.total);
			expect(newState.user.totalToday).toBe(mockFeedData.totalToday);
			expect(newState.user.isLoaded).toBe(true);
			expect(newState.user.isError).toBe(false);
		});

		describe('Обработка краевых случаев', () => {
			it('обрабатывает пустой массив заказов', () => {
				const emptyFeedData: TFeedOrder = {
					success: true,
					orders: [],
					total: 0,
					totalToday: 0,
				};

				const action = onMessage(emptyFeedData, 'all');
				const newState = feedReducer(initialState, action);

				expect(newState.all.orders).toEqual([]);
				expect(newState.all.total).toBe(0);
				expect(newState.all.totalToday).toBe(0);
				expect(newState.all.isLoaded).toBe(true);
			});

			it('обрабатывает большое количество заказов', () => {
				const largeOrdersArray: TOrder[] = Array.from(
					{ length: 1000 },
					(_, index) => ({
						...mockOrder,
						_id: `order-${index}`,
						number: index + 1,
					})
				);

				const largeFeedData: TFeedOrder = {
					success: true,
					orders: largeOrdersArray,
					total: 10000,
					totalToday: 1000,
				};

				const action = onMessage(largeFeedData, 'all');
				const newState = feedReducer(initialState, action);

				expect(newState.all.orders).toHaveLength(1000);
				expect(newState.all.total).toBe(10000);
				expect(newState.all.totalToday).toBe(1000);
			});
		});
	});
});
