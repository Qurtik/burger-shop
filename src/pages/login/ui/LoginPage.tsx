/* eslint-disable prettier/prettier */
import { loginUser } from '@/services/auth/actions';
import { clearError, selectErrorText, selectIsLoading } from '@/services/auth/reducers';
import { Card } from '@/shared/ui';
import {
	Button,
	Input,
	PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { FormEvent, useState, type JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import type { AppDispatch } from '@/services/store';

import styles from './login-page.module.css';

type TForm = {
	email: string;
	password: string;
};

export const LoginPage = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const errorText = useSelector(selectErrorText);
	const isLoading = useSelector(selectIsLoading);
	const [form, setForm] = useState<TForm>({
		email: 'qwddaW@mail.ru',
		password: 'testtest',
	});

	const handleChange = (input: string, inputValue: string): void => {
		dispatch(clearError());
		setForm((prevState) => ({
			...prevState,
			[input]: inputValue,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(loginUser(form))
			.unwrap()
			.then(() => {
				void navigate('/');
			})
			.catch((__) => {
				/* */
			});
	};

	return (
		<div className={styles.page}>
			{errorText && (
				<p className={`text_error text text_type_main-medium pb-8`}>{errorText}</p>
			)}

			<form onSubmit={handleSubmit}>
				<Card
					title="Вход"
					footer={
						<>
							<span>
								Вы - новый пользователь?{' '}
								<Link to="/register">Зарегистрироваться</Link>
							</span>
							<span>
								Забыли пароль?{' '}
								<Link to="/forgot-password">Восстановить пароль</Link>
							</span>
						</>
					}
				>
					<Input
						type={'text'}
						onChange={(e) => handleChange('email', e.target.value)}
						value={form.email}
						placeholder={'E-mail'}
						name={'name'}
						size={'default'}
						extraClass="ml-1"
					/>
					<PasswordInput
						onChange={(e) => handleChange('password', e.target.value)}
						value={form.password}
						name={'password'}
						extraClass="mb-2"
					/>

					<Button htmlType="submit" disabled={isLoading}>
						{isLoading ? 'Загружаем...' : 'Войти'}
					</Button>
				</Card>
			</form>
		</div>
	);
};
