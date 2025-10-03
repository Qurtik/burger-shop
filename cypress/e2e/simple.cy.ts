/// <reference types="cypress" />

// URL константы для легкой поддержки
const URLS = {
	HOME: '/',
	LOGIN: '/login',
	INGREDIENT: '/ingredient/',
} as const;

// Селекторы для переиспользования
const SELECTORS = {
	CONSTRUCTOR_WIDGET: '[data-testid="constructor-widget"]',
	INGREDIENT_ITEM: '[data-testid="ingredient-item"]',
	INGREDIENT_ITEMS_LIST: '[data-testid="ingredient-items-list"]',
	CONSTRUCTOR_MAKE_ORDER_BUTTON: '[data-testid="constructor-make-order-button"]',
	MODAL_CONTENT: '[data-testid="modal-content"]',
	LOADING: '[data-testid="loading"]',
	ERROR: '[data-testid="error"]',
	NO_DATA: '[data-testid="no-data"]',
	MENU: '[data-testid="menu"]',
	MENU_BUN: '[data-testid="menu-bun"]',
	MENU_MAIN: '[data-testid="menu-main"]',
	MENU_SAUCE: '[data-testid="menu-sauce"]',
} as const;

describe('Burger Shop Main Page', () => {
	before(function () {
		cy.visit(URLS.HOME);
	});

	it('should open cart page by default', function () {
		cy.contains('Соберите бургер');
	});

	it('should load ingredients and display buns and menu after data loading', function () {
		cy.visit(URLS.HOME);
		// Ждем загрузки данных - проверяем что исчез индикатор загрузки
		cy.get(SELECTORS.LOADING).should('not.exist');

		// Проверяем что нет ошибки загрузки
		cy.get(SELECTORS.ERROR).should('not.exist');

		// Проверяем что есть ингредиенты (не показывается сообщение об отсутствии)
		cy.get(SELECTORS.NO_DATA).should('not.exist');

		// Проверяем появление меню с табами
		cy.get(SELECTORS.MENU).should('be.visible');
		cy.contains('Булки').should('be.visible');
		cy.contains('Начинки').should('be.visible');
		cy.contains('Соусы').should('be.visible');

		// Проверяем появление секций
		cy.get(SELECTORS.MENU_BUN).should('be.visible');
		cy.get(SELECTORS.MENU_MAIN).should('be.visible');
		cy.get(SELECTORS.MENU_SAUCE).should('be.not.visible');

		cy.get(SELECTORS.MENU_BUN + ' h2').contains('Булки').should('be.visible');

		// Проверяем что в секции булок есть карточки ингредиентов
		cy.get(SELECTORS.INGREDIENT_ITEMS_LIST).should('be.visible');
		cy.get(`${SELECTORS.INGREDIENT_ITEMS_LIST} ${SELECTORS.INGREDIENT_ITEM}`).should(
			'have.length.greaterThan',
			0
		);

		// Проверяем что в секциях есть карточки ингредиентов
		cy.get(`${SELECTORS.MENU_MAIN} ${SELECTORS.INGREDIENT_ITEMS_LIST}`).should(
			'have.length.greaterThan',
			0
		);
		cy.get(`${SELECTORS.MENU_SAUCE} ${SELECTORS.INGREDIENT_ITEMS_LIST}`).should(
			'have.length.greaterThan',
			0
		);
	});

	it('should open ingredient page by clicking on ingredient item', function () {
		cy.visit(URLS.HOME);

		cy.get(`${SELECTORS.INGREDIENT_ITEMS_LIST} ${SELECTORS.INGREDIENT_ITEM}`)
			.first()
			.click();
		cy.url().should('include', URLS.INGREDIENT);
	});

	it('should move ingredient to constructor when dragging', function () {
		cy.visit(URLS.HOME);

		cy.get(`${SELECTORS.INGREDIENT_ITEMS_LIST} ${SELECTORS.INGREDIENT_ITEM}`)
			.first()
			.trigger('dragstart');

		cy.get(SELECTORS.CONSTRUCTOR_WIDGET).as('constructorWidget');

		cy.get('@constructorWidget').trigger('drop');

		cy.get(
			`${SELECTORS.MENU_MAIN} ${SELECTORS.INGREDIENT_ITEMS_LIST} ${SELECTORS.INGREDIENT_ITEM}`
		)
			.first()
			.trigger('dragstart');

		cy.get('@constructorWidget').trigger('drop');

		cy.get('@constructorWidget').should('have.length.greaterThan', 0);
		cy.get(SELECTORS.CONSTRUCTOR_MAKE_ORDER_BUTTON).click();

		// Проверяем, перенаправляет ли на страницу авторизации
		cy.url().then((url) => {
			if (url.includes(URLS.LOGIN)) {
				// Если пользователь не авторизован, выполняем вход
				cy.get('input[type="text"]').clear().type('qwddaW@mail.ru');
				cy.get('input[type="password"]').clear().type('testtest');
				cy.get('button[type="submit"]').click();

				// Ждем возврата на главную страницу после авторизации
				cy.url().should('eq', Cypress.config().baseUrl + URLS.HOME);

				// Создаем заказ после авторизации
				cy.get(SELECTORS.CONSTRUCTOR_MAKE_ORDER_BUTTON).click();
			}
		});

		// Ждем появления модального окна с заказом (может занять до 15 секунд)
		cy.get(SELECTORS.MODAL_CONTENT, { timeout: 25000 }).should('be.visible');
	});
});
