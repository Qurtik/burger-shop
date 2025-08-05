/* eslint-disable prettier/prettier */
import { Card } from '@/shared/ui';
import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import type { JSX } from 'react';

type TForm = {
	username: string;
	login: string;
	password: string;
};

export const Profile = (): JSX.Element => {
	const [form, setForm] = useState<TForm>({
		username: 'test',
		login: 'test',
		password: 'test',
	});

	const handleChange = (input: string, inputValue: string): void => {
		setForm((prevState) => ({
			...prevState,
			[input]: inputValue,
		}));
	};

	return (
		<Card>
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
				icon="EditIcon"
				readOnly
			/>
			<Input
				type={'text'}
				onChange={(e) => handleChange('login', e.target.value)}
				value={form.login}
				placeholder={'Логин'}
				name={'email'}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass="ml-1"
				icon="EditIcon"
				readOnly
			/>
			<PasswordInput
				onChange={(e) => handleChange('password', e.target.value)}
				value={form.password}
				name={'Пароль'}
				icon="EditIcon"
				extraClass="mb-2"
			/>
		</Card>
	);
};
