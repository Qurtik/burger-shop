import { ActionCreatorWithPreparedPayload, Middleware } from '@reduxjs/toolkit';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Http from '@/shared/api/http';

type WSAction<T, S, G> = {
	connect: ActionCreatorWithPayload<{ url: string; scope: G }>;
	disconnect: ActionCreatorWithPayload<G>;
	onOpen?: ActionCreatorWithPreparedPayload<
		[G],
		undefined,
		string,
		never,
		{ scope: G }
	>;
	onClose?: ActionCreatorWithPreparedPayload<
		[G],
		undefined,
		string,
		never,
		{ scope: G }
	>;
	onError: ActionCreatorWithPreparedPayload<
		[string, G],
		string,
		string,
		never,
		{ scope: G }
	>;
	onMessage: ActionCreatorWithPreparedPayload<
		[T, G],
		T,
		string,
		never,
		{ scope: G }
	>;
	sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_PERIOD = 5000;

export const socketMiddleware = <T, S, G extends string>(
	wsActions: WSAction<T, S, G>
): Middleware<{}, RootState> => {
	return (store) => {
		let sockets: Record<string, WebSocket | null> = {};
		let urls: Record<string, string> = {};
		let reconnectTimer: Record<string, ReturnType<typeof setTimeout>> = {};
		let isConnected: Record<string, boolean> = {};

		const { dispatch } = store;
		const {
			connect,
			disconnect,
			onOpen,
			onClose,
			onError,
			onMessage,
			// , sendMessage
		} = wsActions;

		return (next) => (action) => {
			if (connect.match(action)) {
				const { url, scope } = action.payload;

				const socket = new WebSocket(url);
				sockets[scope] = socket;

				urls[scope] = url;
				isConnected[scope] = true;

				socket.onopen = () => {
					onOpen && dispatch(onOpen(scope));
				};
				socket.onclose = () => {
					onClose && dispatch(onClose(scope));

					if (isConnected[scope]) {
						reconnectTimer[scope] = setTimeout(() => {
							dispatch(connect({ url: urls[scope], scope }));
						}, RECONNECT_PERIOD);
					}
				};
				socket.onerror = () => {
					dispatch(onError('Ошибка соединения', scope));
				};
				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);

						if (parsedData.message === 'Invalid or missing token') {
							const http = new Http();
							http
								.refreshToken()
								.then(() => {
									const wssUrl = new URL(url);

									const refreshedToken = localStorage.getItem('accessToken');

									if (refreshedToken !== null) {
										wssUrl.searchParams.set('token', refreshedToken);
										dispatch(connect({ url: wssUrl.toString(), scope }));
									}
								})
								.catch((error) => {
									dispatch(onError((error as Error).message, scope));
								});

							dispatch(disconnect(scope));

							return;
						}

						dispatch(onMessage(parsedData, scope));
					} catch (error) {
						dispatch(
							onError('Ошибка парсинга данных: ' + (error as Error).message, scope)
						);
					}
				};
				return;
			}

			// disconnect вызывается в любом случае. Далее проверяем по чей инициативе произошло отключение
			if (disconnect.match(action)) {
				const scope = action.payload;
				// Проверка на отключение от сервера
				clearTimeout(reconnectTimer[scope]);
				isConnected[scope] = false;
				// reconnectTimer = 0;

				sockets[scope]?.close();
				sockets[scope] = null;
				return;
			}

			// if (sockets[scope] && sendMessage?.match(action)) {
			// 	const { payload } = action;
			// 	try {
			// 		const stringifiedPayload = JSON.stringify(payload);
			// 		sockets[scope].send(stringifiedPayload);
			// 	} catch (error) {
			// 		dispatch(
			// 			onError('Ошибка отправки данных: ' + (error as Error).message, scope)
			// 		);
			// 	}

			// 	return;
			// }

			// console.log('[socketMiddleware] action:', action.type, action);
			next(action);
		};
	};
};
