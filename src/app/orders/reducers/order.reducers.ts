import { createReducer, on } from "@ngrx/store";
import {
	createOrder,
	createOrderFailure,
	createOrderSuccess,
	getOrderById,
	getOrderByIdFailure,
	getOrderByIdSuccess,
	resetSelectedOrder,
} from "../actions/order.actions";
import { Order } from "../models/Order";

export interface OrderState {
	orders: Order[];
	selectedOrder: Order;
	error: any;
	pending: boolean;
}

export const initialState: OrderState = {
	orders: null,
	selectedOrder: null,
	error: null,
	pending: false,
};

const _orderReducer = createReducer(
	initialState,
	on(createOrder, (state) => ({
		...state,
		pending: true,
	})),
	on(createOrderSuccess, (state, action) => ({
		...state,
		selectedOrder: action.selectedOrder,
		pending: false,
	})),
	on(createOrderFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	})),
	on(getOrderById, (state) => ({
		...state,
		pending: true,
	})),
	on(getOrderByIdSuccess, (state, action) => ({
		...state,
		selectedOrder: action.selectedOrder,
		pending: false,
	})),
	on(getOrderByIdFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	})),
	on(resetSelectedOrder, (state, action) => ({
		...state,
		selectedOrder: null,
		pending: false,
	}))
);

export function orderReducer(state: any, action: any) {
	return _orderReducer(state, action);
}