import { createReducer, on } from "@ngrx/store";
import { Product } from "../models/Product";
import {
	getProducts,
	getProductsSuccess,
	getProductsFailure,
} from "../actions/products.actions";

export interface ProductState {
	products: Product[];
	error: any;
	pending: boolean;
}

export const initialState: ProductState = {
	products: null,
	error: null,
	pending: false,
};

const _productsReducer = createReducer(
	initialState,
	on(getProducts, (state) => ({
		...state,
		pending: true,
	})),
	on(getProductsSuccess, (state, action) => ({
		...state,
		products: [...action.products],
		pending: false,
	})),
	on(getProductsFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	}))
);

export function productsReducer(state: any, action: any) {
	return _productsReducer(state, action);
}
