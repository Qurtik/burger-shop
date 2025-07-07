import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';
import ContructorWidget from './constructor-widget/constructor-widget';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	console.log(ingredients);

	return (
		<div className={`${styles.burger_constructor_page}  pt-25`}>
			<section className={`${styles.burger_constructor_widgets}`}>
				<ContructorWidget ingredients={ingredients} />
			</section>

			<div className={`${styles.burger_constructor_footer} pt-10`}>
				<span className="text text_type_digits-medium">
					0 <CurrencyIcon type="primary" />
				</span>
				<Button htmlType="button" type="primary" size="medium">
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
