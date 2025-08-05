/* eslint-disable prettier/prettier */
import { Card } from '@/shared/ui';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';
import { Link } from 'react-router-dom';

import styles from './forgot-password-page.module.css';

type TForm = {
	email: string;
};

export const ForgotPasswordPage = (): JSX.Element => {
	const [form, setForm] = useState<TForm>({
		email: '',
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
				<Button htmlType="button">Восстановить</Button>
			</Card>
		</div>
	);
};
