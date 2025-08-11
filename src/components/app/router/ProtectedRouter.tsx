import { selectIsAuthChecked, selectUser } from '@/services/auth/reducers';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({
	onlyUnAuth = false,
	element,
}: {
	onlyUnAuth?: boolean;
	element: React.JSX.Element;
}) => {
	const isAuthChecked = useSelector(selectIsAuthChecked);
	const user = useSelector(selectUser);
	const location = useLocation();

	if (!isAuthChecked) {
		// TODO: Сделать прелоадер
		return <p>Loading...</p>;
	}

	if (!onlyUnAuth && !user) {
		// для авторизованного, но неавторизован
		return <Navigate to="/login" state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// для неавторизованного, но авторизован
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return element;
};

export const OnlyAuth = ({ element }: { element: React.JSX.Element }) => {
	return <Protected element={element} />;
};

export const OnlyNoAuth = ({ element }: { element: React.JSX.Element }) => {
	return <Protected onlyUnAuth={true} element={element} />;
};
