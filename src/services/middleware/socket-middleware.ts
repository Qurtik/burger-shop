import { ActionCreatorWithoutPayload, Middleware } from '@reduxjs/toolkit';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Http from '@/shared/api/http';

type WSAction<T, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<T>;
	sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_PERIOD = 5000;

export const socketMiddleware = <T, S>(
	wsActions: WSAction<T, S>
): Middleware<{}, RootState> => {
	// console.log('socketMiddlewareActions', wsActions);
	return (store) => {
		let socket: WebSocket | null = null;
		const { connect, disconnect, onOpen, onClose, onError, onMessage, sendMessage } =
			wsActions;

		const { dispatch } = store;

		let reconnectTimer: ReturnType<typeof setTimeout>;
		let isConnected = false;
		let url = '';

		// console.log('socketMiddleware', store);
		return (next) => (action) => {
			console.log('action', action);

			if (connect.match(action)) {
				console.log('Url socket');
				console.log(action.payload);

				socket = new WebSocket(action.payload);
				url = action.payload;
				isConnected = true;

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};
				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectTimer = setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};
				socket.onerror = () => {
					dispatch(onError('Ошибка соединения'));
				};
				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);

						console.log('parsedData');
						console.log(parsedData);

						if (parsedData.message === 'Invalid or missing token') {
							const http = new Http();
							http
								.refreshToken()
								.then(() => {
									const wssUrl = new URL(url);

									const refreshedToken = localStorage.getItem('accessToken');

									if (refreshedToken !== null) {
										wssUrl.searchParams.set('token', refreshedToken);
										dispatch(connect(wssUrl.toString()));
									}
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});

							dispatch(disconnect());

							return;
						}

						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(
							onError('Ошибка парсинга данных: ' + (error as Error).message)
						);
					}
				};
				return;
			}

			// disconnect вызывается в любом случае. Далее проверяем по чей инициативе произошло отключение
			if (socket && disconnect.match(action)) {
				// Проверка на отключение от сервера
				clearTimeout(reconnectTimer);
				isConnected = false;
				// reconnectTimer = 0;

				socket.close();
				socket = null;
				return;
			}
			if (socket && sendMessage?.match(action)) {
				const { payload } = action;
				try {
					const stringifiedPayload = JSON.stringify(payload);
					socket.send(stringifiedPayload);
				} catch (error) {
					dispatch(onError('Ошибка отправки данных: ' + (error as Error).message));
				}

				return;
			}

			// console.log('[socketMiddleware] action:', action.type, action);
			next(action);
		};
	};
};
