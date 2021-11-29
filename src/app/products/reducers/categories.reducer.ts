import { createReducer, on } from "@ngrx/store";
import {
	getCategories,
	getCategoriesSuccess,
	getCategoriesFailure,
} from "../actions/categories.actions";
import { Category } from "../models/Category";

export interface CategoryState {
	categories: Category[];
	error: any;
	pending: boolean;
}

export const initialState: CategoryState = {
	categories: null,
	error: null,
	pending: false,
};

const _categoriesReducer = createReducer(
	initialState,
	on(getCategories, (state) => ({
		...state,
		pending: true,
	})),
	on(getCategoriesSuccess, (state, action) => ({
		...state,
		categories: [...action.categories],
		pending: false,
	})),
	on(getCategoriesFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	}))
);

export function categoriesReducer(state: any, action: any) {
	return _categoriesReducer(state, action);
}
