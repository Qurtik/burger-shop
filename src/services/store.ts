import {
	connect,
	disconnect,
	onOpen,
	onClose,
	onError,
	onMessage,
	TFeedOrder,
	TFeedScope,
} from './feed/actions';
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/reducers';
import { ingredientsSlice } from './ingredients/reducers';
import { orderSlice } from './order/reducers';
import { feedSlice } from './feed/reducers';

import type {
	ActionCreator,
	ThunkAction,
	ThunkDispatch,
	UnknownAction,
} from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware-with-scope';

type TSocketScope = TFeedScope;

const feedMiddleware = socketMiddleware<TFeedOrder, unknown, TSocketScope>({
	connect: connect,
	disconnect: disconnect,
	onOpen: onOpen,
	onMessage: onMessage,
	onError: onError,
	onClose: onClose,
});

const rootReducer = combineSlices(ingredientsSlice, orderSlice, authSlice, feedSlice);

export const configureStore = (initialState?: Partial<RootState>) => {
	return createStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(feedMiddleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];

// TODO: Добавить свои типы экшенов вместо UnknownAction
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, RootState, unknown, UnknownAction>
>;

// export type AppThunk<ReturnType = void> = ThunkAction<
// 	ReturnType,
// 	RootState,
// 	unknown,
// 	UnknownAction
// >;
