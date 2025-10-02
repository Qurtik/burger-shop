import { OrderCard } from '@/widgets/Feed/order-card';
import styles from './feed-page.module.css';
import { OrderStatuses } from '@/widgets/Feed/order-statuses';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/hooks';
import { connect, disconnect } from '@/services/feed/actions';

import { selectOrdersDone, selectOrdersPending, selectOrdersWithDetailedIngredients } from '../lib/selectors';
import {
	selectAllOrdersIsError,
	selectAllOrdersIsLoaded,
	selectAllTotals,
} from '@/services/feed/reducers';

export const FeedPage = () => {
	const dispatch = useDispatch();

	const isLoaded = useSelector(selectAllOrdersIsLoaded);
	const isError = useSelector(selectAllOrdersIsError);

	const { total, totalToday } = useSelector(selectAllTotals);
	const ordersWithDetailedIngredients = useSelector(
		selectOrdersWithDetailedIngredients
	);

	const ordersDone = useSelector(selectOrdersDone);
	const ordersPending = useSelector(selectOrdersPending);

	useEffect(() => {
		void dispatch(
			connect({ url: 'wss://norma.nomoreparties.space/orders/all', scope: 'all' })
		);

		return () => {
			dispatch(disconnect('all'));
		};
	}, [dispatch]);

	return (
		<div className={styles.page}>
			<p className="text text_type_main-medium">Лента заказов</p>
			<div className={styles.main}>
				<div className={styles.orders}>
					{!isLoaded ? (
						<div className={styles.card_preload}>Загрузка...</div>
					) : isError ? (
						<p>Ошибка</p>
					) : (
						ordersWithDetailedIngredients.map((order) => {
							return <OrderCard key={order._id} order={order} />;
						})
					)}
				</div>
				<div>
					<OrderStatuses
						total={total}
						totalToday={totalToday}
						ordersDone={ordersDone}
						ordersPending={ordersPending}
					/>
				</div>
			</div>
		</div>
	);
};
