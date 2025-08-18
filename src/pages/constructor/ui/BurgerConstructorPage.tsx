/* eslint-disable prettier/prettier */

import {
	selectIngredients,
	selectIngredientsInConstructor,
	selectIsError,
	selectIsLoading,
} from '@/services/ingredients/reducers';
import {
	useSelector,
} from 'react-redux';
import { Outlet } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const BurgerConstructorPage = (): React.JSX.Element => {
	// FIXME: Почему происходит перерсовка элементов компонента?
	const ingredients = useSelector(selectIngredients);
	const isLoading = useSelector(selectIsLoading);
	const isError = useSelector(selectIsError);

	const ingredientsInContructor = useSelector(selectIngredientsInConstructor);

	return (
		<div className={styles.app}>
			<h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				{isLoading ? (
					<p>Loading...</p>
				) : isError ? (
					<p>Error</p>
				) : !ingredients?.length ? (
					<p>Нет доступных ингредиентов</p>
				) : (
					<>
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor ingredients={ingredientsInContructor} />
					</>
				)}
			</main>
			<Outlet />
		</div>
	);
};
