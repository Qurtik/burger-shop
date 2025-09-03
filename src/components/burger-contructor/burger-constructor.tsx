/* eslint-disable prettier/prettier */
import {
	clearIngredientsInConstructor,
	selectIngredientsInConstructor,
} from '@/services/ingredients/reducers';
import { createOrder } from '@/services/order/actions';
import { selectOrderState } from '@/services/order/reducers';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import Modal from '@shared/ui/modal/modal';
import { useModal } from '@shared/ui/modal/useModal';
import { useDispatch, useSelector } from 'react-redux';

import ContructorWidget from './constructor-widget/constructor-widget';
import OrderDetails from './order-details/order-details';

import type { AppDispatch } from '@/services/store';
import type { TIngredient } from '@utils/types';
import type React from 'react';

import styles from './burger-constructor.module.css';
import { selectUser } from '@/services/auth/reducers';
import { useNavigate } from 'react-router-dom';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const currentUser = useSelector(selectUser);
	const navigate = useNavigate();
	const [isOpen, setIsOpen, setIsClose] = useModal();

	const totalOrderPrice = useSelector(selectIngredientsInConstructor).reduce(
		(acc, item) => acc + item.price,
		0
	);
	const ingredientsIds = useSelector(selectIngredientsInConstructor).map(
		(item) => item._id
	);
	const {
		order,
		// , isError
		isLoading,
	} = useSelector(selectOrderState);
	const dispatch = useDispatch<AppDispatch>();

	const handleClick = (): void => {
		if (!currentUser) {
			navigate('/login');
		} else {
			void handleOpen();
		}
	};

	const handleOpen = async (): Promise<void> => {
		try {
			await dispatch(createOrder(ingredientsIds))
				.unwrap()
				.then(() => {
					dispatch(clearIngredientsInConstructor());
				});

			setIsOpen();
		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = (): void => {
		setIsClose();
	};

	return (
		<div className={`${styles.burger_constructor_page} pt-25`}>
			<section
				className={`${styles.burger_constructor_widgets} ${isLoading ? styles.disabled : ''}`}
			>
				<ContructorWidget ingredients={ingredients} />
			</section>

			<div className={`${styles.burger_constructor_footer} pt-10`}>
				<span className="text text_type_digits-medium">
					{totalOrderPrice} <CurrencyIcon type="primary" />
				</span>
				<Button
					htmlType="button"
					type="primary"
					size="medium"
					extraClass={isLoading ? styles.gradient_animate : ''}
					onClick={handleClick}
					disabled={ingredients.length == 0}
				>
					{isLoading ? 'Оформляем...' : 'Оформить заказ'}
				</Button>
			</div>

			{isOpen && order && (
				<Modal onClose={handleClose}>
					<OrderDetails orderNum={order.order.number} />
				</Modal>
			)}
		</div>
	);
};
