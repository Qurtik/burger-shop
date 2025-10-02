import { selectUserOrders } from '@/services/feed/reducers';
import { selectIngredients } from '@/services/ingredients/reducers';
import { createSelector } from '@reduxjs/toolkit';

export const selectUserOrdersWithDetailedIngredients = createSelector(
	[selectUserOrders, selectIngredients],
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
