/* eslint-disable prettier/prettier */
import { loadIngredients } from '@/services/ingredients/actions';
import {
	selectIngredients,
	selectIngredientsInConstructor,
	// selectIngredientsState,
	selectIsError,
	selectIsLoading,
} from '@/services/ingredients/reducers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { AppDispatch } from '@/services/store';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
	// const { ingredients, isLoading, isError } = useSelector(selectIngredientsState);
	// FIXME: Почему происходит перерсовка элементов компонента?
	const ingredients = useSelector(selectIngredients);
	const isLoading = useSelector(selectIsLoading);
	const isError = useSelector(selectIsError);

	const ingredientsInContructor = useSelector(selectIngredientsInConstructor);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		void dispatch(loadIngredients());
	}, [dispatch]);

	return (
		<>
			<div className={styles.app}>
				<AppHeader />
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
							{JSON.stringify(selectIngredientsInConstructor)}
							<BurgerIngredients ingredients={ingredients} />
							<BurgerConstructor ingredients={ingredientsInContructor} />
						</>
					)}
				</main>
			</div>
		</>
	);
};

export default App;
