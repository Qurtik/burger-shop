import { createAction } from '@reduxjs/toolkit';

export type TOrderStatus = 'created' | 'pending' | 'done';
export type TOrder = {
	_id: string;
	status: TOrderStatus;
	number: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	ingredients: string[];
};

export type TFeedOrder = {
	success?: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export type TFeedScope = 'all' | 'user';

export const connect = createAction<{ url: string; scope: TFeedScope }, 'feed/connect'>(
	'feed/connect'
);
export const disconnect = createAction<TFeedScope>('feed/disconnect');

export const onOpen = createAction('feed/onopen', (scope: TFeedScope) => ({
	payload: undefined,
	meta: { scope },
}));
export const onClose = createAction('feed/onclose', (scope: TFeedScope) => ({
	payload: undefined,
	meta: { scope },
}));

export const onError = createAction(
	'feed/onerror',
	(message: string, scope: TFeedScope) => ({
		payload: message,
		meta: { scope },
	})
);
export const onMessage = createAction(
	'feed/onmessage',
	(payload: TFeedOrder, scope: TFeedScope) => ({
		payload,
		meta: { scope },
	})
);

export type TFeedActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onMessage>
	| ReturnType<typeof onError>
	| ReturnType<typeof onClose>;
