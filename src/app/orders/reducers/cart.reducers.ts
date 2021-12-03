import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/products/models/Product";
import {
	addToCart,
	addToCartFailure,
	addToCartSuccess,
	deleteFromCart,
	deleteFromCartFailure,
	deleteFromCartSuccess,
	getCart,
	getCartFailure,
	getCartSuccess,
} from "../actions/cart.actions";
import { CartItem } from "../models/CartItem";

export interface CartState {
	cart: CartItem[];
	error: any;
	pending: boolean;
}

export const initialState: CartState = {
	cart: null,
	error: null,
	pending: false,
};

const _cartReducer = createReducer(
	initialState,
	on(getCart, (state) => ({
		...state,
		pending: true,
	})),
	on(getCartSuccess, (state, action) => ({
		...state,
		cart: action.cart ? [...action.cart] : [],
		pending: false,
	})),
	on(getCartFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	})),
	on(addToCart, (state) => ({
		...state,
		pending: true,
	})),
	on(addToCartSuccess, (state, action) => ({
		...state,
		cart: [...action.cart],
		pending: false,
	})),
	on(addToCartFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	})),
	on(deleteFromCart, (state, action) => ({
		...state,
		cart: [...state.cart.filter((x) => x.productId !== action.productId)],
		error: null,
		pending: true,
	})),
	on(deleteFromCartSuccess, (state, action) => ({
		...state,
		error: null,
		pending: false,
	})),
	on(deleteFromCartFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	}))
);

export function cartReducer(state: any, action: any) {
	return _cartReducer(state, action);
}
