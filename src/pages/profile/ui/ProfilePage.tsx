/* eslint-disable prettier/prettier */

import { NavLink, Outlet } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './profile-page.module.css';

export const ProfilePage = (): JSX.Element => {
	return (
		<>
			<div className={styles.page}>
				<nav className={`${styles.menu} text text_type_main-medium`}>
					<div className={`${styles.menu_item} ${styles.menu_item_active}`}>
						<NavLink to="/profile">Профиль</NavLink>
					</div>
					<div className={styles.menu_item}>
						<NavLink to="/profile/orders">История заказов</NavLink>
					</div>
					<div className={styles.menu_item}>Выход</div>
					<div
						className={`${styles.menu_footer} text text_type_main-default mt-20`}
					>
						В этом разделе вы можете изменить свои персональные данные
					</div>
				</nav>
				<div className={styles.main}>
					<Outlet />
				</div>
			</div>
		</>
	);
};
