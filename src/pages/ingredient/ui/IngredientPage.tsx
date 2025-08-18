/* eslint-disable prettier/prettier */

import IngredientDetails from '@/components/burger-ingredients/ingredients-widget/ingredients-detailts/ingredient-details';
import {
	selectIngredientById,
	selectIsError,
	selectIsLoading,
} from '@/services/ingredients/reducers';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient-page.module.css';

// FIXME: Проверить почему появляется "Данные отсутствуют"
export const IngredientPage = (): React.JSX.Element => {
	const { id } = useParams();
	const ingredient = useSelector(selectIngredientById(id!));
	const isLoading = useSelector(selectIsLoading);
	const isError = useSelector(selectIsError);

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
