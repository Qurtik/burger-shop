import {
	ConstructorElement,
	DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './constructor-item.module.css';

type TProps = {
	ingredient: TIngredient;
};

const ContructorItem = ({ ingredient }: TProps): React.JSX.Element => {
	return (
		<div className={styles.constructor_element_card}>
			<DragIcon type="primary" className={styles.grag_icon} />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
			/>
		</div>
	);
};

export default ContructorItem;
