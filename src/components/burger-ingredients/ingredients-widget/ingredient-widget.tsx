/* eslint-disable prettier/prettier */
import React from 'react';

import IngredientItem from './ingredients-item/ingredient-item';

import type { TIngredient } from '@/utils/types';

import style from './ingredient-widget.module.css';

type TItemBlock = {
	itemType: 'bun' | 'main' | 'sauce';
} & { ingredients: TIngredient[] };

const IngredientWidget = ({ ingredients, itemType }: TItemBlock): React.JSX.Element => {
	console.log('ItemBlock - render');

	const items = ingredients.filter((bun) => bun.type.toLowerCase() === itemType);

	return (
		<div className="pt-10">
			<div className={`${style.widgetItems} pl-4`}>
				{items.map((item) => {
					return (
						<React.Fragment key={item._id}>
							<IngredientItem item={item} />
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default IngredientWidget;
