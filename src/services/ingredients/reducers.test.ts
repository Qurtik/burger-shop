import { describe, it, expect } from 'vitest';

import ingredientsReducer, {
	changeBun,
	addIngredient,
	removeIngredient,
	changeOrder,
	clearIngredientsInConstructor,
} from './reducers';
import { loadIngredients } from './actions';
import type { TIngredientConstructor } from './reducers';
import type { TIngredient } from '@/utils/types';

// Тестовые данные
const mockBun: TIngredient = {
	_id: 'bun-1',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	__v: 0,
};

const mockSauce: TIngredient = {
	_id: 'sauce-1',
	name: 'Соус Spicy-X',
	type: 'sauce',
	proteins: 30,
	fat: 20,
	carbohydrates: 40,
	calories: 30,
	price: 90,
	image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
	__v: 0,
};

const mockMain: TIngredient = {
	_id: 'main-1',
	name: 'Биокотлета из марсианской Магнолии',
	type: 'main',
	proteins: 420,
	fat: 142,
	carbohydrates: 242,
	calories: 4242,
	price: 424,
	image: 'https://code.s3.yandex.net/react/code/meat-01.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
	__v: 0,
};

const mockIngredients: TIngredient[] = [mockBun, mockSauce, mockMain];

const initialState = {
	ingredients: undefined,
	ingredientsInContructor: [],
	isLoading: false,
	isError: false,
};

describe('ingredients reducer', () => {
	describe('Инициализация хранилища', () => {
		it('возвращает начальное состояние', () => {
			expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
		});
	});

	describe('Загрузка ингредиентов', () => {
		it('загрузка началась', () => {
			const action = { type: loadIngredients.pending.type };
			const newState = ingredientsReducer(initialState, action);

			expect(newState.isLoading).toBe(true);
			expect(newState.isError).toBe(false);
		});

		it('загрузка завершилась успешно', () => {
			const action = {
				type: loadIngredients.fulfilled.type,
				payload: mockIngredients,
			};
			const newState = ingredientsReducer(initialState, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(false);
			expect(newState.ingredients).toEqual(mockIngredients);
		});

		it('загрузка завершилась с ошибкой', () => {
			const action = { type: loadIngredients.rejected.type };
			const newState = ingredientsReducer(initialState, action);

			expect(newState.isLoading).toBe(false);
			expect(newState.isError).toBe(true);
		});
	});

	describe('Добавление булки в конструктор', () => {
		it('меняет булку, если она не в конструкторе', () => {
			const newBun: TIngredient = {
				...mockBun,
				_id: 'bun-2',
				name: 'Флюоресцентная булка R2-D3',
			};

			const stateWithBun = {
				...initialState,
				ingredients: [mockBun, newBun],
				ingredientsInContructor: [mockBun],
			};

			const action = changeBun({ id: 'bun-2' });
			const newState = ingredientsReducer(stateWithBun, action);

			expect(newState.ingredientsInContructor[0]).toEqual(newBun);
		});

		it('не меняет булку, если она уже в конструкторе', () => {
			const stateWithBun = {
				...initialState,
				ingredients: mockIngredients,
				ingredientsInContructor: [mockBun],
			};

			const action = changeBun({ id: 'bun-1' });
			const newState = ingredientsReducer(stateWithBun, action);

			expect(newState.ingredientsInContructor).toEqual(stateWithBun.ingredientsInContructor);
		});
	});

	describe('Добавление ингредиента в конструктор', () => {
		it('добавляет ингредиент в конструктор', () => {
			const stateWithIngredients = {
				...initialState,
				ingredients: mockIngredients,
			};

			const action = addIngredient({ id: 'sauce-1' });
			const newState = ingredientsReducer(stateWithIngredients, action);

			expect(newState.ingredientsInContructor).toHaveLength(1);
			expect(newState.ingredientsInContructor[0]._id).toBe('sauce-1');
			expect(newState.ingredientsInContructor[0].uniqueKey).toBeDefined();
		});

		it('генерирует уникальные ключи для нескольких ингредиентов', () => {
			const stateWithIngredients = {
				...initialState,
				ingredients: mockIngredients,
			};

			const action1 = addIngredient({ id: 'sauce-1' });
			const action2 = addIngredient({ id: 'sauce-1' });

			const state1 = ingredientsReducer(stateWithIngredients, action1);
			const state2 = ingredientsReducer(state1, action2);

			expect(state2.ingredientsInContructor).toHaveLength(2);
			expect(state2.ingredientsInContructor[0].uniqueKey).not.toBe(
				state2.ingredientsInContructor[1].uniqueKey
			);
		});
	});

	describe('Удаление ингредиента из конструктора', () => {
		it('удаляет ингредиент по уникальному ключу', () => {
			const ingredientWithKey: TIngredientConstructor = {
				...mockSauce,
				uniqueKey: 'unique-1',
			};

			const stateWithIngredients = {
				...initialState,
				ingredientsInContructor: [ingredientWithKey],
			};

			const action = removeIngredient({ uniqueKey: 'unique-1' });
			const newState = ingredientsReducer(stateWithIngredients, action);

			expect(newState.ingredientsInContructor).toHaveLength(0);
		});

	describe('Изменение порядка ингредиентов в конструкторе', () => {
		it('меняет порядок ингредиентов в конструкторе', () => {
			const ingredient1: TIngredientConstructor = {
				...mockSauce,
				uniqueKey: 'unique-1',
			};
			const ingredient2: TIngredientConstructor = {
				...mockMain,
				uniqueKey: 'unique-2',
			};

			const stateWithIngredients = {
				...initialState,
				ingredientsInContructor: [ingredient1, ingredient2],
			};

			const action = changeOrder({ currentIndex: 0, targetIndex: 1 });
			const newState = ingredientsReducer(stateWithIngredients, action);

			expect(newState.ingredientsInContructor[0]).toEqual(ingredient2);
			expect(newState.ingredientsInContructor[1]).toEqual(ingredient1);
		});
	});

	describe('Очистка конструктора', () => {
		it('очищает все ингредиенты, кроме булки', () => {
			const bun: TIngredientConstructor = {
				...mockBun,
				uniqueKey: 'bun-unique',
			};
			const sauce: TIngredientConstructor = {
				...mockSauce,
				uniqueKey: 'sauce-unique',
			};
			const main: TIngredientConstructor = {
				...mockMain,
				uniqueKey: 'main-unique',
			};

			const stateWithIngredients = {
				...initialState,
				ingredientsInContructor: [bun, sauce, main],
			};

			const action = clearIngredientsInConstructor();
			const newState = ingredientsReducer(stateWithIngredients, action);

			expect(newState.ingredientsInContructor).toHaveLength(1);
			expect(newState.ingredientsInContructor[0]).toEqual(bun);
		});
	});

	describe('Обработка краевых случаев', () => {
		it('обработка changeOrder с неправильными индексами', () => {
			const ingredient: TIngredientConstructor = {
				...mockSauce,
				uniqueKey: 'unique-1',
			};

			const stateWithIngredient = {
				...initialState,
				ingredientsInContructor: [ingredient],
			};

			const action1 = changeOrder({ currentIndex: -1, targetIndex: 0 });
			const newState1 = ingredientsReducer(stateWithIngredient, action1);
			expect(newState1.ingredientsInContructor).toEqual(stateWithIngredient.ingredientsInContructor);

			const action2 = changeOrder({ currentIndex: 0, targetIndex: 10 });
			const newState2 = ingredientsReducer(stateWithIngredient, action2);
			expect(newState2.ingredientsInContructor).toEqual(stateWithIngredient.ingredientsInContructor);
		});

		it('обработка удаления ингредиента из конструктора', () => {
			const action = removeIngredient({ uniqueKey: 'any-key' });
			const newState = ingredientsReducer(initialState, action);

			expect(newState.ingredientsInContructor).toHaveLength(0);
		});
		});
	});

});
