/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addIngredient, changeBun } from '../../../services/ingredients/reducers';
import ContructorItem from './constructor-item/constructor-item';

import type { TIngredientConstructor } from '../../../services/ingredients/reducers';

import styles from './constructor-widget.module.css';

type ContructorWidgetProps = {
	ingredients: TIngredientConstructor[];
};

const ContructorWidget = ({ ingredients }: ContructorWidgetProps): React.JSX.Element => {
	const buns = ingredients.find((bun) => bun.type === 'bun')!;
	const ingredientsWithNoBuns = ingredients.filter((bun) => bun.type !== 'bun');

	const dispatch = useDispatch();

	const [{ isHover }, dropRef] = useDrop({
		accept: 'ingredient',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			// dropItem: console.log(() => monitor.getDropResult())
		}),
		drop: (item: { id: string }) => {
			dispatch(addIngredient(item));
		},
	});

	const [{ isHoverStart }, dropRefStartBun] = useDrop({
		accept: 'bun',
		collect: (monitor) => ({
			isHoverStart: monitor.isOver(),
		}),
		drop: (item: { id: string }) => {
			dispatch({
				type: 'ingredients/addBun',
				payload: item,
			});
		},
	});

	const [{ isHoverTop }, dropRefBunTop] = useDrop({
		accept: 'bun',
		collect: (monitor) => ({
			isHoverTop: monitor.isOver(),
		}),
		drop: (item: { id: string }) => {
			dispatch({
				type: 'ingredients/changeBun',
				payload: item,
			});
		},
	});

	const [{ isHoverButtom }, dropRefBunButtom] = useDrop({
		accept: 'bun',
		collect: (monitor) => ({
			isHoverButtom: monitor.isOver(),
		}),
		drop: (item: { id: string }) => {
			dispatch(changeBun(item));
		},
	});

	if (ingredients.length === 0) {
		return (
			<div
				ref={dropRefStartBun as any}
				className={`${styles.start_buns_area} ${isHoverStart ? styles.hover_area_buns : null}`}
			>
				<p className="text text_type_main-medium"> Перенесите булку сюда</p>
			</div>
		);
	}

	return (
		<div
			className={`${styles.widget} ${isHover ? styles.hover_area_ingredients : null} mb-12`}
			ref={dropRef as any}
		>
			<div
				ref={dropRefBunTop as any}
				className={`${isHoverTop ? styles.hover_area_buns : null}`}
			>
				<ConstructorElement
					extraClass="mb-6"
					type="top"
					isLocked={true}
					text={`${buns.name} (верх)`}
					price={buns.price}
					thumbnail={buns.image}
				/>
			</div>
			<div className={`${styles.widgetItems}`}>
				{ingredientsWithNoBuns.map((ingredient, index) => {
					return (
						<ContructorItem
							key={ingredient.uniqueKey}
							ingredient={ingredient}
							index={index}
						/>
					);
				})}
			</div>
			<div
				ref={dropRefBunButtom as any}
				className={`${isHoverButtom ? styles.hover_area_buns : null}`}
			>
				<ConstructorElement
					extraClass="mt-6"
					type="bottom"
					isLocked={true}
					text={`${buns.name} (низ)`}
					price={buns.price}
					thumbnail={buns.image}
				/>
			</div>
		</div>
	);
};

export default ContructorWidget;
