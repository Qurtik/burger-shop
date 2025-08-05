/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@/utils/types';
import type React from 'react';

type Props = { item: TIngredient };

import { selectIngredientsCount } from '@/services/ingredients/reducers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './ingredient-item.module.css';

const IngredientItem = ({ item }: Props): React.JSX.Element => {
	const navigate = useNavigate();
	const ingredientsCount = useSelector(selectIngredientsCount);
	const count = ingredientsCount[item._id] || 0;

	const [, dragRef] = useDrag({
		type: item.type === 'bun' ? 'bun' : 'ingredient',
		item: { id: item._id },
	});

	const handleOpen = (): void => {
		void navigate(`ingredientModal/${item._id}`);
	};

	return (
		<>
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
		</>
	);
};

export default IngredientItem;
