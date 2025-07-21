import {
	// Counter,
	CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';

import { useModal } from '../../../shared/modal/useModal';

import type { TIngredient } from '@/utils/types';
import type React from 'react';

type Props = { item: TIngredient };

import Modal from '@/components/shared/modal/modal';

import IngredientDetails from '../ingredients-detailts/ingredient-details';

import style from './ingredient-item.module.css';

const IngredientItem = ({ item }: Props): React.JSX.Element => {
	const [isOpen, setIsOpen, setIsClose] = useModal();

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
			<div className={`${style.card}`} onClick={handleOpen}>
				<img
					className={`${style.card_image} ml-4 mr-4`}
					alt="Наименование булки"
					src={item.image}
				/>
				<div className={`${style.card_price} pt-1`}>
					<span className="text text_type_digits-default">{item.price}</span>
					<CurrencyIcon type="primary" />
				</div>
				{/* {count > 0 ? (
					<Counter count={0} size="default" extraClass={style.card_count} />
				) : (
					''
				)} */}
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
