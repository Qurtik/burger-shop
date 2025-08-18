/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { registerUser } from '@/services/auth/actions';
import { selectErrorText, selectIsLoading } from '@/services/auth/reducers';
import { Card } from '@/shared/ui';
import {
	Button,
	Input,
	PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import type { AppDispatch } from '@/services/store';
import type { FormEvent, JSX } from 'react';

import styles from './register-page.module.css';

type TForm = {
	username: string;
	email: string;
	password: string;
};

export const RegisterPage = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const errorText = useSelector(selectErrorText);
	const isLoading = useSelector(selectIsLoading);
	const navigate = useNavigate();
	const [form, setForm] = useState<TForm>({
		username: '',
		email: '',
		password: '',
	});

	const handleChange = (input: string, inputValue: string): void => {
		setForm((prevState) => ({
			...prevState,
			[input]: inputValue,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(
			registerUser({
				...form,
				name: form.username,
			})
		)
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
				<p className="text_error text text_type_main-medium pb-8">{errorText}</p>
			)}

			<form onSubmit={handleSubmit}>
				<Card
					title="Регистрация"
					footer={
						<>
							<span>
								Уже зарегистрированы? <Link to="/login">Войти</Link>
							</span>
						</>
					}
				>
					<Input
						type={'text'}
						onChange={(e) => handleChange('username', e.target.value)}
						value={form.username}
						placeholder={'Имя'}
						name={'username'}
						size={'default'}
						extraClass="ml-1"
					/>
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
						name={'Пароль'}
						extraClass="mb-2"
					/>
					<Button htmlType="submit" disabled={isLoading}>
						{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
					</Button>
				</Card>
			</form>
		</div>
	);
};
