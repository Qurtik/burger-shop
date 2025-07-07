import { Tab } from '@krgaa/react-developer-burger-ui-components';
import React, { useState } from 'react';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';
import IngredientWidget from './ingredients-widget/ingredient-widget';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [current, setCurrent] = useState('bun')

	const changeTab = (value: string) => {
		console.log(value)
		setCurrent(value)
	}

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab
						value="bun"
						active={current === "bun"}
						onClick={
							changeTab
						}
					>
						Булки
					</Tab>
					<Tab
						value="main"
						active={current === "main"}
						onClick={
							changeTab
						}
					>
						Начинки
					</Tab>
					<Tab
						value="sauce"
						active={current === "sauce"}
						onClick={
							changeTab
						}
					>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div className={styles.ingredient_widgets}>
				<IngredientWidget ingredients={ingredients} ingredientWidgetTitle='Булки' itemType='bun' />
				<IngredientWidget ingredients={ingredients} ingredientWidgetTitle='Начинки' itemType='main' />
				<IngredientWidget ingredients={ingredients} ingredientWidgetTitle='Соусы' itemType='sauce' />
			</div>
		</section>
	);
};
