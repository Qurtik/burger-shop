import styles from './order-statuses.module.scss';

export const OrderStatuses = () => {
	return (
		<div className={styles.page}>
			<div className={styles.statuses}>
				<div>
					<p className={`text text_type_main-medium ${styles.statuses__label}`}>
						Готовы:
					</p>
					<div className={`text text_type_digits-default ${styles.statuses__done}`}>
						<span>034533</span>
						<span>034532</span>
						<span>034530</span>
						<span>034527</span>
						<span>034525</span>
						<span>034532</span>
						<span>034530</span>
						<span>034527</span>
						<span>034525</span>
					</div>
				</div>
				<div>
					<p className={`text text_type_main-medium ${styles.statuses__label}`}>
						В работе:
					</p>
					<div
						className={`text text_type_digits-default ${styles.statuses__in_progress}`}
					>
						<span>034538</span>
						<span>034541</span>
						<span>034542</span>
					</div>
				</div>
			</div>
			<div className="text text_type_main-large">
				Выполнено за все время:
				<p className={`text text_type_digits-large ${styles.total}`}>28 752</p>
			</div>
			<div className="text text_type_main-large">
				Выполнено за сегодня:
				<p className={`text text_type_digits-large ${styles.total}`}>138</p>
			</div>
		</div>
	);
};
