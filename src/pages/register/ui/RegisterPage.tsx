/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { Card } from '@/shared/ui';
import {
	Button,
	Input,
	PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './register-page.module.css';

type TForm = {
	username: string;
	email: string;
	password: string;
};

export const RegisterPage = (): JSX.Element => {
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

	return (
		<div className={styles.page}>
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
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="ml-1"
				/>
				<Input
					type={'text'}
					onChange={(e) => handleChange('email', e.target.value)}
					value={form.email}
					placeholder={'E-mail'}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="ml-1"
				/>
				<PasswordInput
					onChange={(e) => handleChange('password', e.target.value)}
					value={form.password}
					name={'Пароль'}
					extraClass="mb-2"
				/>
				<Button htmlType="button">Зарегистрироваться</Button>
			</Card>
		</div>
	);
};
