import type React from 'react';
import { Modal } from '@shared/ui';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { OrderDetails } from '@/components/order-details';

const OrderDetailsModal = (): React.JSX.Element | null => {
	const location = useLocation();
	const { id } = useParams();
	const navigate = useNavigate();

	const handleClose = (): void => {
		const prevPathname = location.state.background;
		void navigate(prevPathname);
	};

	return (
		<Modal hideCloseBtn padding={2} onClose={handleClose}>
			{<OrderDetails id={id} />}
		</Modal>
	);
};

export default OrderDetailsModal;
