/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
	Counter,
	// Counter,
	CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { useModal } from '../../../shared/modal/useModal';

import type { TIngredient } from '@/utils/types';
import type React from 'react';
// import type { ConnectDragSource} from 'react-dnd';

type Props = { item: TIngredient };

import Modal from '@/components/shared/modal/modal';
import { selectIngredientsCount } from '@/services/ingredients/reducers';
import { useSelector } from 'react-redux';

import IngredientDetails from '../ingredients-detailts/ingredient-details';

import style from './ingredient-item.module.css';

const IngredientItem = ({ item }: Props): React.JSX.Element => {
	const [isOpen, setIsOpen, setIsClose] = useModal();
	const ingredientsCount = useSelector(selectIngredientsCount);
	const count = ingredientsCount[item._id] || 0;

	const [, dragRef] = useDrag({
		type: item.type === 'bun' ? 'bun' : 'ingredient',
		item: { id: item._id },
		// collect: (monitor) => ({
		// 	dragginClass: monitor.isDragging() ? style.is_dragging : "",
		// }),
	});

	const handleOpen = (): void => {
		setIsOpen();
	};

	const handleClose = (): void => {
		setIsClose();
	};

	// const increment = (): void => {
	// 	setCount((count: number) => {
	// 		return (count = count + 1);
	// 	});
	// };

	return (
		// <div className={`${style.card} pt-6 pl-4`}>
		<>
			{/* <div ref={dragRef as any} className={`${style.card} ${dragginClass}`} onClick={handleOpen}> */}
			<div ref={dragRef as any} className={`${style.card}`} onClick={handleOpen}>
				<img
					className={`${style.card_image} ml-4 mr-4`}
					alt="Наименование булки"
					src={item.image}
				/>
				<div className={`${style.card_price} pt-1`}>
					<span className="text text_type_digits-default">{item.price}</span>
					<CurrencyIcon type="primary" />
				</div>
				{count > 0 ? (
					<Counter count={count} size="default" extraClass={style.card_count} />
				) : (
					''
				)}
				<span className={`text text_type_main-default pt-1`}>{item.name}</span>
			</div>
			{isOpen && (
				<Modal title={'Детали ингредиента'} onClose={handleClose}>
					<IngredientDetails currentIngredient={item} />
				</Modal>
			)}
		</>
	);
};

export default IngredientItem;
