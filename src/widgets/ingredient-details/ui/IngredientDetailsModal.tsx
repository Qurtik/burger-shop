/* eslint-disable prettier/prettier */

import IngredientDetails from '@/components/burger-ingredients/ingredients-widget/ingredients-detailts/ingredient-details';
import { selectIngredientById } from '@/services/ingredients/reducers';
import { Modal } from '@shared/ui';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import type React from 'react';

const IngredientDetailsModal = (): React.JSX.Element | null => {
	const { id } = useParams();
	const navigate = useNavigate();

	const ingredient = useSelector(selectIngredientById(id!));

	const handleClose = (): void => {
		void navigate('/');
	};

	if (!ingredient) return null;

	return (
		<Modal title={'Детали ингредиента'} onClose={handleClose}>
			<IngredientDetails currentIngredient={ingredient} />
		</Modal>
	);
};

export default IngredientDetailsModal;
