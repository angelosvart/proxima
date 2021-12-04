import { createReducer, on } from "@ngrx/store";
import {
	getStoreById,
	getStoreByIdFailure,
	getStoreByIdSuccess,
} from "../actions/stores.actions";
import { Stores } from "../models/Stores";

export interface StoresState {
	store: Stores;
	error: any;
	pending: boolean;
}

export const initialState: StoresState = {
	store: null,
	error: null,
	pending: false,
};

const _storesReducer = createReducer(
	initialState,
	on(getStoreById, (state) => ({
		...state,
		pending: true,
	})),
	on(getStoreByIdSuccess, (state, action) => ({
		...state,
		store: action.store,
		pending: false,
	})),
	on(getStoreByIdFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	}))
);

export function storesReducer(state: any, action: any) {
	return _storesReducer(state, action);
}
