/* eslint-disable prettier/prettier */
import { selectUser } from '@/services/auth/reducers';
import { AppDispatch } from '@/services/store';
import { Card } from '@/shared/ui';
import {
	Button,
	Input,
	PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

import type { FormEvent, JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.css';
import { changeUserData } from '@/services/auth/actions';

type TForm = {
	username: string;
	login: string;
	password: string;
};

export const Profile = (): JSX.Element => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch<AppDispatch>();

	const inputRef = useRef<HTMLInputElement>(null);
	const loginRef = useRef<HTMLInputElement>(null);

	const [isEdit, setIsEdit] = useState(false);
	const [form, setForm] = useState<TForm>({
		username: '',
		login: '',
		password: '',
	});

	const [initialForm, setInitialForm] = useState<TForm>();

	useEffect(() => {
		const newForm = {
			username: user!.name,
			login: user!.email,
			password: '',
		};

		setForm(newForm);
		setInitialForm(newForm);
	}, [user]);

	const handleChange = (input: keyof TForm, inputValue: string): void => {
		setForm((prevState) => ({
			...prevState,
			[input]: inputValue,
		}));
	};

	const handleIconClick = (ref: HTMLInputElement | null) => {
		if (ref) ref?.focus();
		setIsEdit(true);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(
			changeUserData({
				email: form.login,
				name: form.username,
			})
		);
	};

	const handleCancelEdit = () => {
		setForm(initialForm as TForm);
		setIsEdit(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card
				footer={
					isEdit && (
						<div className={styles.card__action}>
							<Button htmlType="submit">Сохранить</Button>
							<Button htmlType="button" onClick={handleCancelEdit}>
								Отменить
							</Button>
						</div>
					)
				}
			>
				<Input
					type={'text'}
					onChange={(e) => handleChange('username', e.target.value)}
					ref={inputRef}
					value={form.username}
					placeholder={'Имя'}
					name={'username'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="ml-1"
					icon={isEdit ? undefined : 'EditIcon'}
					onIconClick={() => handleIconClick(inputRef.current)}
					readOnly={!isEdit}
				/>
				<Input
					type={'text'}
					onChange={(e) => handleChange('login', e.target.value)}
					ref={loginRef}
					value={form.login}
					placeholder={'Логин'}
					name={'email'}
					size={'default'}
					extraClass="ml-1"
					icon={isEdit ? undefined : 'EditIcon'}
					onIconClick={() => handleIconClick(loginRef.current)}
					readOnly={!isEdit}
				/>
				<PasswordInput
					onChange={(e) => handleChange('password', e.target.value)}
					value={form.password}
					name={'password'}
					icon={isEdit ? undefined : 'EditIcon'}
					extraClass="mb-2"
					readOnly={!isEdit}
				/>
			</Card>
		</form>
	);
};
