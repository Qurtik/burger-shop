/* eslint-disable prettier/prettier */

import { connect, disconnect } from '@/services/feed/actions';
import {
	selectUserOrdersIsError,
	selectUserOrdersIsLoaded,
} from '@/services/feed/reducers';
import { useDispatch, useSelector } from '@/services/hooks';
import { OrderCard } from '@/widgets/Feed/order-card';
import { useEffect, type JSX } from 'react';
import { selectUserOrdersWithDetailedIngredients } from './lib/selectors';

export const OrdersHistory = (): JSX.Element => {
	const dispatch = useDispatch();

	const isLoaded = useSelector(selectUserOrdersIsLoaded);
	const isError = useSelector(selectUserOrdersIsError);

	const ordersWithDetailedIngredients = useSelector(
		selectUserOrdersWithDetailedIngredients
	);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		void dispatch(
			connect({
				url: `wss://norma.nomoreparties.space/orders?token=${token}`,
				scope: 'user',
			})
		);

		return () => {
			dispatch(disconnect('user'));
		};
	}, [dispatch]);

	return (
		<>
			{!isLoaded
				? 'Загрузка...'
				: isError
					? 'Ошибка.'
					: ordersWithDetailedIngredients.map((order) => {
							return <OrderCard key={order._id} showStatus order={order} />;
						})}
		</>
	);
};
