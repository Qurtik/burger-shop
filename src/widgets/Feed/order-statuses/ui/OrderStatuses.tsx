import { TFeedOrder } from '@/services/feed/actions';
import styles from './order-statuses.module.scss';

type TOrderStatusesProps = {
	ordersDone: number[];
	ordersPending: number[];
	total: TFeedOrder['total'];
	totalToday: TFeedOrder['totalToday'];
};

export const OrderStatuses = ({
	total,
	totalToday,
	ordersDone,
	ordersPending,
}: TOrderStatusesProps) => {
	return (
		<div className={styles.page}>
			<div className={styles.statuses}>
				<div>
					<p className={`text text_type_main-medium ${styles.statuses__label}`}>
						Готовы:
					</p>
					<div className={`text text_type_digits-default ${styles.statuses__done}`}>
						{ordersDone.map((number) => {
							return <span key={`done-${number}`}>{number}</span>;
						})}
					</div>
				</div>
				<div>
					<p className={`text text_type_main-medium ${styles.statuses__label}`}>
						В работе:
					</p>
					<div
						className={`text text_type_digits-default ${styles.statuses__in_progress}`}
					>
						{ordersPending.map((number) => {
							return <span key={`pending-${number}`}>{number}</span>;
						})}
					</div>
				</div>
			</div>
			<div className="text text_type_main-large">
				Выполнено за все время:
				<p className={`text text_type_digits-large ${styles.total}`}>{total}</p>
			</div>
			<div className="text text_type_main-large">
				Выполнено за сегодня:
				<p className={`text text_type_digits-large ${styles.total}`}>{totalToday}</p>
			</div>
		</div>
	);
};
