import { createReducer, on } from "@ngrx/store";
import {
	getStoreById,
	getStoreByIdFailure,
	getStoreByIdSuccess,
} from "../actions/dashboard.actions";
import { StoreUser } from "../../users/models/StoreUser";

export interface DashboardState {
	store: StoreUser;
	error: any;
	pending: boolean;
}

export const initialState: DashboardState = {
	store: null,
	error: null,
	pending: false,
};

const _dashboardReducer = createReducer(
	initialState,
	on(getStoreById, (state) => ({
		...state,
		pending: true,
	})),
	on(getStoreByIdSuccess, (state, action) => ({
		...state,
		store: action.storeUser,
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

export function dashboardReducer(state: any, action: any) {
	return _dashboardReducer(state, action);
}
