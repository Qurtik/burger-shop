import { OrderCard } from '@/widgets/Feed/order-card';
import styles from './feed-page.module.css';
import { OrderStatuses } from '@/widgets/Feed/order-statuses';

export const FeedPage = () => {
	return (
		<div className={styles.page}>
			<p className="text text_type_main-medium">Лента заказов</p>
			<div className={styles.main}>
				<div className={styles.orders}>
					<OrderCard />
				</div>
				<div>
					<OrderStatuses />
				</div>
			</div>
		</div>
	);
};
