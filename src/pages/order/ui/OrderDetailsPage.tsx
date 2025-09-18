import { OrderDetails } from '@/components/order-details';
import { useParams } from 'react-router-dom';

export const OrderDetailsPage = (): React.JSX.Element => {
	const { id } = useParams();

	return (
		<>
			<OrderDetails id={id} />
		</>
	);
};
