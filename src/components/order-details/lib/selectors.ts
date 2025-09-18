import { selectAllOrders, selectUserOrders } from '@/services/feed/reducers';
import { selectIngredients } from '@/services/ingredients/reducers';
import { createSelector } from '@reduxjs/toolkit';

export const selectAllAndUserOrdersWithDetailedIngredients = createSelector(
	[selectUserOrders, selectAllOrders, selectIngredients],
	// @ts-ignore
	(userOrders, allOrders, ingredients) => {
		if (!ingredients || userOrders.length === 0) return [];

		const orders = [...userOrders, ...allOrders];

		const byId = new Map(ingredients.map((ing) => [ing._id, ing]));
		return orders.map((order) => ({
			...order,
			ingredientsDetailed: order.ingredients
				.map((id) => byId.get(id))
				.filter((ing): ing is NonNullable<typeof ing> => Boolean(ing)),
		}));
	}
);
