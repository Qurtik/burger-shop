import { removeIngredient } from '@/services/ingredients/reducers';
import {
	ConstructorElement,
	DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

import type { TIngredientConstructor } from '@/services/ingredients/reducers';

import styles from './constructor-item.module.css';

type TProps = {
	ingredient: TIngredientConstructor;
};

const ContructorItem = ({ ingredient }: TProps): React.JSX.Element => {
	const dispatch = useDispatch();

	const handleCloseIngredient = (): void => {
		dispatch(removeIngredient({ uniqueKey: ingredient.uniqueKey! }));
	};

	return (
		<div className={styles.constructor_element_card}>
			<DragIcon type="primary" className={styles.grag_icon} />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleCloseIngredient}
			/>
		</div>
	);
};

export default ContructorItem;
