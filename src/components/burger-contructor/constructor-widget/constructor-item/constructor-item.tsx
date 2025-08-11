/* eslint-disable prettier/prettier */
import { changeOrder, removeIngredient } from '@/services/ingredients/reducers';
import {
	ConstructorElement,
	DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import type { TIngredientConstructor } from '@/services/ingredients/reducers';

import styles from './constructor-item.module.css';

type TProps = {
	ingredient: TIngredientConstructor;
	index: number;
};

const ContructorItem = ({ ingredient, index }: TProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: 'ingredientOrder',
		collect: (monitor) => ({
			isHoverDrop: monitor.isOver(),
		}),
		drop: (item: { id: string; index: number }) => {
			const itemIndex = item.index;
			dispatch(changeOrder({ currentIndex: itemIndex + 1, targetIndex: index + 1 }));
		},
	});

	const [, drag] = useDrag({
		type: 'ingredientOrder',
		item: { id: ingredient._id, index },
	});

	const handleCloseIngredient = (): void => {
		dispatch(removeIngredient({ uniqueKey: ingredient.uniqueKey! }));
	};

	drag(drop(ref));

	return (
		<div ref={ref} className={styles.constructor_element_card}>
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
