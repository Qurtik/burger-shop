/// <reference types="cypress" />

describe('Burger Shop Main Page', () => {
	before(function () {
		cy.visit('http://localhost:5173');
	});

	it('should open cart page by default', function () {
		cy.contains('Соберите бургер');
	});

	it('should load ingredients and display buns and menu after data loading', function () {
		cy.visit('http://localhost:5173');
		// Ждем загрузки данных - проверяем что исчез индикатор загрузки
		cy.get('p').contains('Loading...').should('not.exist');

		// Проверяем что нет ошибки загрузки
		cy.get('p').contains('Error').should('not.exist');

		// Проверяем что есть ингредиенты (не показывается сообщение об отсутствии)
		cy.get('p').contains('Нет доступных ингредиентов').should('not.exist');

		// Проверяем появление меню с табами
		cy.get('[data-testid="menu"]').should('be.visible');
		cy.contains('Булки').should('be.visible');
		cy.contains('Начинки').should('be.visible');
		cy.contains('Соусы').should('be.visible');

		// Проверяем появление секций
		cy.get('#bun-section').should('be.visible');
		cy.get('#main-section').should('be.visible');
		cy.get('#sauce-section').should('be.not.visible');

		cy.get('#bun-section h2').contains('Булки').should('be.visible');

		// Проверяем что в секции булок есть карточки ингредиентов
		cy.get("[data-testid='ingredient-items-list']").should('be.visible');
		cy.get(
			'[data-testid="ingredient-items-list"] [data-testid="ingredient-item"]'
		).should('have.length.greaterThan', 0);

		// Проверяем что в секциях есть карточки ингредиентов
		cy.get('#main-section [data-testid="ingredient-items-list"]').should(
			'have.length.greaterThan',
			0
		);
		cy.get('#sauce-section [data-testid="ingredient-items-list"]').should(
			'have.length.greaterThan',
			0
		);
	});

	it('should open ingredient page by clicking on ingredient item', function () {
		cy.visit('http://localhost:5173');

		cy.get('[data-testid="ingredient-items-list"] [data-testid="ingredient-item"]')
			.first()
			.click();
		cy.url().should('include', '/ingredient/');
	});

	it('should move ingredient to constructor when dragging', function () {
		cy.visit('http://localhost:5173');

		cy.get('[data-testid="ingredient-items-list"] [data-testid="ingredient-item"]')
			.first()
			.trigger('dragstart');

		cy.get('[data-testid="constructor-widget"]').trigger('drop');

		cy.get(
			'#main-section [data-testid="ingredient-items-list"] [data-testid="ingredient-item"]'
		)
			.first()
			.trigger('dragstart');

		cy.get('[data-testid="constructor-widget"]').trigger('drop');

		cy.get('[data-testid="constructor-widget"]').should('have.length.greaterThan', 0);
		cy.get('[data-testid="constructor-make-order-button"]').click();

		// Проверяем, перенаправляет ли на страницу авторизации
		cy.url().then((url) => {
			if (url.includes('/login')) {
				// Если пользователь не авторизован, выполняем вход
				cy.get('input[type="text"]').clear().type('qwddaW@mail.ru');
				cy.get('input[type="password"]').clear().type('testtest');
				cy.get('button[type="submit"]').click();

				// Ждем возврата на главную страницу после авторизации
				cy.url().should('eq', 'http://localhost:5173/');

				// Создаем заказ после авторизации
				cy.get('[data-testid="constructor-make-order-button"]').click();
			}
		});

		// Ждем появления модального окна с заказом (может занять до 15 секунд)
		cy.get('[data-testid="modal-content"]', { timeout: 25000 }).should('be.visible');
	});
});
