import BurgerConstructorPage from '@/pages/constructor';
import ForgotPasswordPage from '@/pages/forgot-password';
import IngredientPage from '@/pages/ingredient';
import LoginPage from '@/pages/login';
import ProfilePage from '@/pages/profile';
import RegisterPage from '@/pages/register';
import ResetPasswordPage from '@/pages/reset-password';
import { checkUserAuth } from '@/services/auth/actions';
import AppHeader from '@/widgets/app-header';
import IngredientDetailsModal from '@/widgets/ingredient-details';
import { OrdersHistory, Profile } from '@/widgets/Profile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import type { AppDispatch } from '@/services/store';
import { loadIngredients } from '@/services/ingredients/actions';
import { OnlyAuth, OnlyNoAuth } from './router';

const Layout = (): React.JSX.Element => {
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
};

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();

	const location = useLocation();
	const backgroundLocation: Location = location.state?.background;

	useEffect(() => {
		dispatch(checkUserAuth());
	}, []);

	useEffect(() => {
		void dispatch(loadIngredients());
	}, [dispatch]);

	return (
		<>
			{backgroundLocation && (
				<Routes>
					<Route path="/ingredient/:id" element={<IngredientDetailsModal />} />
				</Routes>
			)}

			<Routes location={backgroundLocation || location}>
				<Route path="/" element={<Layout />}>
					<Route index element={<BurgerConstructorPage />} />

					<Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
						<Route path="" element={<Profile />} />
						<Route path="orders" element={<OrdersHistory />} />
					</Route>
					<Route path="/feed" element={<div>Feed</div>} />
					<Route path="/ingredient/:id" element={<IngredientPage />} />
				</Route>

				{/* No Layout */}
				<Route path="/login" element={<OnlyNoAuth element={<LoginPage />} />} />
				<Route
					path="/register"
					element={<OnlyNoAuth element={<RegisterPage />} />}
				/>
				<Route
					path="/forgot-password"
					element={<OnlyNoAuth element={<ForgotPasswordPage />} />}
				/>
				<Route
					path="/reset-password"
					element={<OnlyNoAuth element={<ResetPasswordPage />} />}
				/>
			</Routes>
		</>
	);
};
