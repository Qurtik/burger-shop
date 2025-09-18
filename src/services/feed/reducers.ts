import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TFeedOrder, onClose, onError, onMessage, onOpen } from './actions';

type ChannelState = {
	isConnected: boolean;
	isLoaded: boolean;
	isError: boolean;
} & TFeedOrder;

type State = {
	all: ChannelState;
	user: ChannelState;
};

const channelInitial: ChannelState = {
	orders: [],
	total: 0,
	totalToday: 0,
	isConnected: false,
	isLoaded: false,
	isError: false,
};

const initialState: State = {
	all: { ...channelInitial },
	user: { ...channelInitial },
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	selectors: {
		selectAll: (state) => state.all,
		selectUser: (state) => state.user,
		selectAllOrders: (state) => state.all.orders,
		selectAllOrdersIsLoaded: (state) => state.all.isLoaded,
		selectAllOrdersIsError: (state) => state.all.isError,
		selectUserOrders: (state) => state.user.orders,
		selectUserOrdersIsLoaded: (state) => state.user.isLoaded,
		selectUserOrdersIsError: (state) => state.user.isError,

		selectAllTotal: (state: State) => state.all.total,
		selectAllTotalToday: (state: State) => state.all.totalToday,
		selectUserTotal: (state: State) => state.user.total,
		selectUserTotalToday: (state: State) => state.user.totalToday,

		selectAllTotals: (state) => ({
			total: state.all.total,
			totalToday: state.all.totalToday,
		}),
		selectUserTotals: (state) => ({
			total: state.user.total,
			totalToday: state.user.totalToday,
		}),
	},
	extraReducers(builder) {
		builder
			.addCase(onMessage, (state, action) => {
				const scope = action.meta.scope as 'all' | 'user';
				const s = state[scope];
				s.orders = action.payload.orders;
				s.total = action.payload.total;
				s.totalToday = action.payload.totalToday;
				s.isLoaded = true;
				s.isError = action.payload.success !== true;
			})
			.addCase(onError, (state, action) => {
				const scope = action.meta.scope as 'all' | 'user';
				const s = state[scope];
				s.isConnected = false;
				s.isError = true;
			})
			.addCase(onClose, (state, action) => {
				const scope = action.meta.scope as 'all' | 'user';
				const s = state[scope];
				s.isConnected = false;
				s.isError = false;
			})
			.addCase(onOpen, (state, action) => {
				const scope = action.meta.scope as 'all' | 'user';
				const s = state[scope];
				s.isConnected = true;
				s.isError = false;
			});
	},
});

export const {
	selectAll,
	selectUser,
	selectAllOrders,
	selectUserOrders,
  selectAllTotal,
  selectAllTotalToday,
  selectUserTotal,
  selectUserTotalToday,
	selectAllOrdersIsLoaded,
	selectUserOrdersIsLoaded,
	selectAllOrdersIsError,
	selectUserOrdersIsError,
} = feedSlice.selectors;

export const selectAllTotals = createSelector(
	[selectAllTotal, selectAllTotalToday],
	(total, totalToday) => ({ total, totalToday })
);

export const selectUserTotals = createSelector(
	[selectUserTotal, selectUserTotalToday],
	(total, totalToday) => ({ total, totalToday })
);

export default feedSlice.reducer;
