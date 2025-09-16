import { useState } from 'react';
import styles from './order-card.module.scss';
import type { TIngredient } from '@/utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

type IngredientImagesProps = {
	ingredients: Pick<TIngredient, '_id' | 'image_mobile'>[];
};

const IngredientImages = ({ ingredients }: IngredientImagesProps) => {
	if (ingredients.length == 0) {
		return <p>Ингридиенты отсутствуют</p>;
	}

	const MAX_INGREDIENTS = 5;
	const countMaxIngredients = ingredients.length - MAX_INGREDIENTS;

	const topIngredients = ingredients.slice(0, MAX_INGREDIENTS);

	return (
		<>
			{topIngredients.map((ingredient, index) => {
				return (
					<img
						className={styles.ingredient_image}
						src={ingredient?.image_mobile}
						style={{ left: 55 * index, zIndex: 1000 - index }}
						key={ingredient._id}
					/>
				);
			})}
			{countMaxIngredients > 0 ? (
				<div
					className={styles.last_ingredient_container}
					style={{ left: 55 * MAX_INGREDIENTS, zIndex: 1000 - MAX_INGREDIENTS }}
				>
					<img
						src={ingredients[MAX_INGREDIENTS]?.image_mobile}
						className={styles.ingredient_image}
					/>
					<div className={styles.ingredient_overlay}>
						<span className="text text_type_digits-default">
							+{countMaxIngredients}
						</span>
					</div>
				</div>
			) : (
				''
			)}
		</>
	);
};

export const OrderCard = () => {
	const [ingredientData] = useState([
		{
			_id: '1',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
		},
		{
			_id: '2',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
		},
		{
			_id: '3',
			image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
		},
		{
			_id: '4',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
		},
		{
			_id: '5',
			image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
		},
		{
			_id: '6',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		},
		{
			_id: '7',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-01.png',
		},
	]);

	return (
		<>
			<div className={styles.card}>
				<div className={styles.title}>
					<span className="text text_type_digits-default">#123456</span>
					<span className={`text text_color_inactive ${styles.title__timestamp}`}>
						<FormattedDate date={new Date()} />
					</span>
				</div>

				<p className="text text_type_main-medium">Death Star Starship Main бургер</p>
				<div className={styles.ingredients_container}>
					<div>
						<IngredientImages ingredients={ingredientData} />
					</div>
					<div className="text text_type_digits-medium">
						480 <CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</>
	);
};
