/* eslint-disable prettier/prettier */
import { Card } from '@/shared/ui';
import {
	Button,
	Input,
	PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState, type JSX } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './reset-password-page.module.css';

type TForm = {
	code: string;
	password: string;
};

export const ResetPasswordPage = (): JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const [form, setForm] = useState<TForm>({
		code: '',
		password: '',
	});

	useEffect(() => {
		const prevPage = location.state as Location;

		if (!prevPage || prevPage.pathname !== '/forgot-password') {
			navigate('/forgot-password');
		}
	}, []);

	const handleChange = (input: string, inputValue: string): void => {
		setForm((prevState) => ({
			...prevState,
			[input]: inputValue,
		}));
	};

	return (
		<div className={styles.page}>
			<Card
				title="Восстановление пароля"
				footer={
					<>
						<span>
							Вспоминили пароль? <Link to="/login">Войти</Link>
						</span>
					</>
				}
			>
				<PasswordInput
					onChange={(e) => handleChange('password', e.target.value)}
					value={form.password}
					placeholder={'Введите новый пароль'}
					name={'Введите новый пароль'}
					extraClass="mb-2"
				/>
				<Input
					type={'text'}
					onChange={(e) => handleChange('code', e.target.value)}
					value={form.code}
					placeholder={'Введите код из письма'}
					name={'code'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="ml-1"
				/>
				<Button htmlType="button">Сохранить</Button>
			</Card>
		</div>
	);
};
