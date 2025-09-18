import { useSelector } from '@/services/hooks';
import styles from './order-details.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { statuses, statusesColor } from '../config';
import { IngredientCard } from '@/components/ingredient';
import { selectAllAndUserOrdersWithDetailedIngredients } from '../lib/selectors';

type TOrderDetailsProps = {
	id?: string;
};

export const OrderDetails = ({ id }: TOrderDetailsProps) => {
	const ordersWithDetailedIngredients = useSelector(
		selectAllAndUserOrdersWithDetailedIngredients
	);
	const orders = ordersWithDetailedIngredients ?? [];

	const order = orders.find((o) => String(o._id) === String(id));

	const ingredients = order?.ingredientsDetailed ?? [];
	const ingredientCounts = ingredients.reduce<
		Record<string, { ing: (typeof ingredients)[number]; count: number }>
	>((acc, ing) => {
		const key = ing._id as string;
		const existing = acc[key];
		acc[key] = { ing, count: (existing?.count ?? 0) + 1 };
		return acc;
	}, {});
	const distinctIngredients = Object.values(ingredientCounts).map(({ ing, count }) => ({
		...ing,
		count,
	}));

	if (!order) {
		return 'Загрузка...';
	}

	const createdAtDate = new Date(order.createdAt);
	const totalPrice = distinctIngredients.reduce(
		(sum, ing: any) => sum + (ing.price ?? 0) * (ing.count ?? 1),
		0
	);

	return (
		<div className={styles.page}>
			<p className={`text text_type_digits-default ${styles.order_number}`}>
				#{order.number}
			</p>
			<div className={`text text_type_digits-default ${styles.order_title}`}>
				<p className={`text text_type_main-medium `}>{order.name}</p>
				<p
					className={`text text_type_main-default `}
					style={{
						color: statusesColor[order.status as keyof typeof statuses],
					}}
				>
					{statuses[order.status as keyof typeof statuses]}
				</p>
			</div>

			<div className={`text text_type_digits-default ${styles.ingredients}`}>
				<p className={`pb-6 text text_type_main-medium ${styles.ingredients_title}`}>
					Состав:
				</p>
				<div className={styles.ingredients_items}>
					{distinctIngredients.map((ing) => {
						return <IngredientCard ingredient={ing} key={ing._id} />;
					})}
				</div>
			</div>

			<div className={styles.footer}>
				<span className="text_color_inactive">
					<FormattedDate date={createdAtDate} />
				</span>
				<div className="text text_type_digits-medium">
					{totalPrice} <CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};
