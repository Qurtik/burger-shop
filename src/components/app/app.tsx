import BurgerConstructorPage from '@/pages/constructor';
import ForgotPasswordPage from '@/pages/forgot-password';
import IngredientPage from '@/pages/ingredient';
import LoginPage from '@/pages/login';
import ProfilePage from '@/pages/profile';
import RegisterPage from '@/pages/register';
import ResetPasswordPage from '@/pages/reset-password';
import AppHeader from '@/widgets/app-header';
import IngredientDetailsModal from '@/widgets/ingredient-details';
import { OrdersHistory, Profile } from '@/widgets/Profile';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

const Layout = (): React.JSX.Element => {
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
};

export const App = (): React.JSX.Element => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<BurgerConstructorPage />}>
						<Route
							path="ingredientModal/:id"
							element={<IngredientDetailsModal />}
						/>
					</Route>

					{/* <Route path="/test" element={<BurgerConstructorPage />}>
						<Route
							path="/test/ingredientModal"
							element={<IngredientDetailsModal />}
						/>
					</Route> */}

					{/* <Route path="ingredientModal/:id" element={<IngredientDetailsModal />} /> */}
					<Route path="/profile" element={<ProfilePage />}>
						<Route path="" element={<Profile />} />
						<Route path="orders" element={<OrdersHistory />} />
					</Route>
					<Route path="/feed" element={<div>Feed</div>} />
					<Route path="/ingredients/:id" element={<IngredientPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
			</Routes>
		</BrowserRouter>
	);
};
