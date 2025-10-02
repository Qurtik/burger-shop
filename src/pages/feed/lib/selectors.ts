// import { selectOrders } from '@/services/feed/reducers';
import { selectAllOrders } from '@/services/feed/reducers';
import { selectIngredients } from '@/services/ingredients/reducers';
import { createSelector } from '@reduxjs/toolkit';

export const selectOrdersWithDetailedIngredients = createSelector(
	[selectAllOrders, selectIngredients],
	// @ts-ignore
	(orders, ingredients) => {
		if (!ingredients || orders.length === 0) return [];
		const byId = new Map(ingredients.map((ing) => [ing._id, ing]));
		return orders.map((order) => ({
			...order,
			ingredientsDetailed: order.ingredients
				.map((id) => byId.get(id))
				.filter((ing): ing is NonNullable<typeof ing> => Boolean(ing)),
		}));
	}
);

export const selectOrdersDone = createSelector(
	[selectOrdersWithDetailedIngredients],
	(orders) =>
		orders
			.filter((o) => o.status === 'done')
			.map((o) => o.number)
			.slice(0, 10)
);

export const selectOrdersPending = createSelector(
	[selectOrdersWithDetailedIngredients],
	(orders) =>
		orders
			.filter((o) => o.status === 'pending')
			.map((o) => o.number)
			.slice(0, 10)
);
