import { TIngredient } from '@/utils/types';
import styles from './ingredient-card.module.scss';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

type TIngredientCardProps = {
	ingredient: TIngredient & { count: number };
};

export const IngredientCard = ({ ingredient }: TIngredientCardProps) => {
	return (
		<div className={styles.card}>
			<img className={styles.img} src={ingredient.image_mobile}></img>
			<span className="text text_type_main-default">{ingredient.name}</span>
			<span className={`text text_type_digits-default ${styles.count_and_price}`}>
				{ingredient.count} X {ingredient.price} <CurrencyIcon type="primary" />
			</span>
		</div>
	);
};
