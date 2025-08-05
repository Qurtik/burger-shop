/* eslint-disable prettier/prettier */
import { Card } from '@/shared/ui';
import {
	Button,
	Input,
	PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';
import { Link } from 'react-router-dom';

import styles from './login-page.module.css';

type TForm = {
	email: string;
	password: string;
};

export const LoginPage = (): JSX.Element => {
	const [form, setForm] = useState<TForm>({
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
				<Button htmlType="button">Войти</Button>
			</Card>
		</div>
	);
};
