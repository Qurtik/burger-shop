/* eslint-disable prettier/prettier */

import { NavLink, Outlet } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './profile-page.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { logout } from '@/services/auth/reducers';

export const ProfilePage = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const handleClick = () => {
		dispatch(logout());
	};

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
					<div className={styles.menu_item} onClick={handleClick}>
						Выход
					</div>
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
