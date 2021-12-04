import { createReducer, on } from "@ngrx/store";
import { Product } from "../models/Product";
import {
	getProducts,
	getProductsSuccess,
	getProductsFailure,
	getProductById,
	getProductByIdSuccess,
	getProductByIdFailure,
	createProduct,
	createProductSuccess,
	createProductFailure,
} from "../actions/products.actions";

export interface ProductState {
	products: Product[];
	selectedProduct: Product;
	createdProduct: Product;
	error: any;
	pending: boolean;
}

export const initialState: ProductState = {
	products: null,
	selectedProduct: null,
	createdProduct: null,
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
	})),
	on(getProductById, (state) => ({
		...state,
		pending: true,
	})),
	on(getProductByIdSuccess, (state, action) => ({
		...state,
		selectedProduct: action.product,
		pending: false,
	})),
	on(getProductByIdFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	})),
	on(createProduct, (state) => ({
		...state,
		pending: true,
	})),
	on(createProductSuccess, (state, action) => ({
		...state,
		createdProduct: action.product,
		pending: false,
	})),
	on(createProductFailure, (state, { payload }) => ({
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
