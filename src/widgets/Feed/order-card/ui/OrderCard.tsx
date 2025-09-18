import styles from './order-card.module.scss';
// import type { TIngredient } from '@/utils/types';
import {
	CurrencyIcon,
	FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { TIngredient } from '@/utils/types';
import { useMemo } from 'react';
import { TOrder } from '@/services/feed/actions';

type TIngredientImagesProps = {
	ingredients: TIngredient[];
};

const IngredientImages = ({ ingredients }: TIngredientImagesProps) => {
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
						key={`${ingredient._id}-${index}`}
					/>
				);
			})}
			{countMaxIngredients > 0 ? (
				<div
					className={styles.overflow_indicator}
					style={{ left: 55 * MAX_INGREDIENTS, zIndex: 1000 - MAX_INGREDIENTS }}
				>
					<img
						src={ingredients[MAX_INGREDIENTS]?.image_mobile}
						className={styles.ingredient_image}
					/>
					<div className={styles.overflow_indicator_overlay}>
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

type TOrderProps = {
	showStatus?: boolean;
	order: TOrder & { ingredientsDetailed: TIngredient[] };
};

const statuses = {
	done: 'Выполнен',
	pending: 'Готовится',
	cancelled: 'Отменен',
};

const statusesColor = {
	done: '#00CCCC',
	pending: 'white',
	cancelled: 'red',
};

export const OrderCard = ({ order, showStatus = false }: TOrderProps) => {
	const totalPrice = useMemo(
		() => order.ingredientsDetailed.reduce((acc, item) => acc + item.price, 0),
		[order]
	);

	const createdAtDate = new Date(order.createdAt);

	return (
		<>
			<div className={styles.card}>
				<div className={styles.title}>
					<span className="text text_type_digits-default">#{order.number}</span>
					<span className={`text text_color_inactive ${styles.title_timestamp}`}>
						<FormattedDate date={createdAtDate} />
					</span>
				</div>

				<div>
					<p className={`text text_type_main-medium`}>{order.name}</p>
					{showStatus ? (
						<p
							className={`text text_type_main-default`}
							style={{
								color: statusesColor[order.status as keyof typeof statuses],
							}}
						>
							{statuses[order.status as keyof typeof statuses]}
						</p>
					) : (
						''
					)}
				</div>
				<div className={styles.ingredients_container}>
					<div>
						<IngredientImages ingredients={order.ingredientsDetailed} />
					</div>
					<div className="text text_type_digits-medium">
						{totalPrice} <CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</>
	);
};
