/* eslint-disable prettier/prettier */
import type { JSX } from 'react';

import styles from './card.module.css';

type TCard = {
	title?: string;
	form?: string;
	body?: JSX.Element;
	footer?: JSX.Element | JSX.Element[] | null | boolean;
	children?: JSX.Element | JSX.Element[];
};

export const Card = ({ title, footer, children }: TCard): JSX.Element => {
	return (
		<>
			<div className={styles.card}>
				{title && (
					<div className={`${styles.title} text text_type_main-medium`}>
						{title}
					</div>
				)}
				<div className={styles.body}>{children}</div>
				{footer && (
					<div className={`${styles.footer} text text_type_main-default`}>
						{footer}
					</div>
				)}
			</div>
		</>
	);
};
