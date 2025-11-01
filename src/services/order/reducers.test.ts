import { describe, it, expect } from 'vitest';

import orderReducer from './reducers';
import { createOrder } from './actions';
import type { TOrder } from './reducers';

// Тестовые данные
const mockOrder: TOrder = {
	name: 'Краторный бургер',
	order: {
		number: 12345,
	},
};

const initialState = {
	order: undefined,
	isLoading: false,
	isError: false,
};

describe('order reducer', () => {
	describe('Инициализация хранилища', () => {
		it('возвращает начальное состояние', () => {
			expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
		});
	});

	describe('Создание заказа', () => {
		it('начало создания заказа', () => {
			const stateWithOrder = {
				...initialState,
				order: mockOrder,
			};

			const action = { type: createOrder.pending.type };
			const newState = orderReducer(stateWithOrder, action);

			expect(newState.isLoading).toBe(true);
			expect(newState.order).toBeUndefined();
		});

		it('успешное создание заказа', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = {
				type: createOrder.fulfilled.type,
				payload: mockOrder,
			};
			const newState = orderReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(false);
			expect(newState.order).toEqual(mockOrder);
		});

		it('ошибка при создании заказа', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const action = { type: createOrder.rejected.type };
			const newState = orderReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(true);
		});
	});

	describe('Обработка краевых случаев', () => {
		it('обрабатывает пустой объект заказа', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const emptyOrder = {
				name: '',
				order: {
					number: 0,
				},
			};

			const action = {
				type: createOrder.fulfilled.type,
				payload: emptyOrder,
			};
			const newState = orderReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(false);
			expect(newState.order).toEqual(emptyOrder);
		});

		it('обрабатывает заказ с большим номером', () => {
			const stateWithLoading = {
				...initialState,
				isLoading: true,
			};

			const largeOrder: TOrder = {
				name: 'Большой заказ',
				order: {
					number: 999999,
				},
			};

			const action = {
				type: createOrder.fulfilled.type,
				payload: largeOrder,
			};
			const newState = orderReducer(stateWithLoading, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(false);
			expect(newState.order).toEqual(largeOrder);
		});
	});

	describe('Последовательность состояний', () => {
		it('корректно обрабатывает полный цикл создания заказа', () => {

			const pendingAction = { type: createOrder.pending.type };
			let state = orderReducer(initialState, pendingAction);
			expect(state.isLoading).toBe(true);
			expect(state.order).toBeUndefined();

			const fulfilledAction = {
				type: createOrder.fulfilled.type,
				payload: mockOrder,
			};
			state = orderReducer(state, fulfilledAction);
			expect(state.isLoading).toBe(false);
			expect(state.isError).toBe(false);
			expect(state.order).toEqual(mockOrder);

			const newPendingAction = { type: createOrder.pending.type };
			state = orderReducer(state, newPendingAction);
			expect(state.isLoading).toBe(true);
			expect(state.order).toBeUndefined();
		});
	});
});
