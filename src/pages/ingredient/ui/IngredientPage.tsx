/* eslint-disable prettier/prettier */

import IngredientDetails from '@/components/burger-ingredients/ingredients-widget/ingredients-detailts/ingredient-details';
import { getIngredientById } from '@/services/ingredients/reducers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { AppThunkDispatch } from '@/services/store';
import type { TIngredient } from '@/utils/types';

import styles from './ingredient-page.module.css';

// FIXME: Проверить почему появляется "Данные отсутствуют"
export const IngredientPage = (): React.JSX.Element => {
	const dispatch = useDispatch<AppThunkDispatch>();
	const { id } = useParams();

	const [ingredient, setIngredient] = useState<TIngredient | null>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!id) {
			setIsLoading(false);
			setIsError(true);
			setIngredient(null);
			return;
		}

		const fetch = async (): Promise<void> => {
			setIsLoading(true);
			setIsError(false);
			setIngredient(undefined);
			try {
				const data = await dispatch(getIngredientById(id));
				setIngredient(data ?? null);
			} catch (__) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		void fetch();
	}, [dispatch, id]);

	return (
		<>
			<div className={styles.page}>
				{isLoading ? (
					<p>Loading...</p>
				) : isError ? (
					<p>Ошибка загрузки ингридиента</p>
				) : ingredient ? (
					<IngredientDetails currentIngredient={ingredient} />
				) : (
					<p>Данные отсутствуют</p>
				)}
			</div>
		</>
	);
};
