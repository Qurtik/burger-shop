/* eslint-disable prettier/prettier */
import { resetPassword } from '@/services/auth/actions';
import { Card } from '@/shared/ui';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import type { AppDispatch } from '@/services/store';

import styles from './forgot-password-page.module.css';

type TForm = {
	email: string;
};

export const ForgotPasswordPage = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();
	const [form, setForm] = useState<TForm>({
		email: '',
	});

	const handleChange = (input: string, inputValue: string): void => {
		setForm((prevState) => ({
			...prevState,
			[input]: inputValue,
		}));
	};

	const handleSubmit = (): void => {
		const fetch = async (): Promise<void> => {
			try {
				await dispatch(resetPassword(form.email));
				void navigate('/reset-password', { state: location });
			} catch (error) {
				console.error(error);
			}
		};

		void fetch();
	};

	return (
		<div className={styles.page}>
			<Card
				title="Вход"
				footer={
					<>
						<span>
							Вспоминили пароль? <Link to="/login">Войти</Link>
						</span>
					</>
				}
			>
				<Input
					type={'text'}
					onChange={(e) => handleChange('email', e.target.value)}
					value={form.email}
					placeholder={'Укажите E-mail'}
					name={'email'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="ml-1"
				/>
				<Button htmlType="button" onClick={handleSubmit}>
					Восстановить
				</Button>
			</Card>
		</div>
	);
};
