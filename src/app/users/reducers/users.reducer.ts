import {
	createAccountClientUser,
	createAccountClientUserFailure,
	createAccountClientUserSuccess,
	createAccountStoreUser,
	createAccountStoreUserFailure,
	createAccountStoreUserSuccess,
	editAccountClientUser,
	editAccountClientUserFailure,
	editAccountClientUserSuccess,
	initUserSession,
	initUserSessionFailure,
	initUserSessionSuccess,
	loginClientUser,
	loginClientUserFailure,
	loginClientUserSuccess,
	loginStoreUser,
	loginStoreUserFailure,
	loginStoreUserSuccess,
} from "../actions/users.actions";
import { createReducer, on } from "@ngrx/store";
import { StoreUser } from "../models/StoreUser";
import { ClientUser } from "../models/ClientUser";

export interface UserState {
	storeUser: StoreUser;
	clientUser: ClientUser;
	loggedIn: boolean;
	error: any;
	pending: boolean;
}

export const initialState: UserState = {
	storeUser: null,
	clientUser: null,
	loggedIn: false,
	error: null,
	pending: false,
};

const _userReducer = createReducer(
	initialState,
	on(loginClientUser, (state) => ({
		...state,
		loggedIn: false,
		pending: true,
	})),
	on(loginClientUserSuccess, (state, action) => ({
		...state,
		clientUser: action.clientUser,
		loggedIn: true,
		pending: false,
	})),
	on(loginClientUserFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		loggedIn: false,
		pending: false,
	})),
	on(loginStoreUser, (state) => ({
		...state,
		loggedIn: false,
		pending: true,
	})),
	on(loginStoreUserSuccess, (state, action) => ({
		...state,
		storeUser: action.storeUser,
		loggedIn: true,
		pending: false,
	})),
	on(loginStoreUserFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		loggedIn: false,
		pending: false,
	})),
	on(initUserSession, (state) => ({
		...state,
		loggedIn: false,
		pending: true,
	})),
	on(initUserSessionSuccess, (state, action) => ({
		...state,
		storeUser: action.storeUser,
		clientUser: action.clientUser,
		loggedIn: true,
		pending: false,
	})),
	on(initUserSessionFailure, (state) => ({
		...state,
		loggedIn: false,
		pending: false,
	})),
	on(createAccountStoreUser, (state) => ({
		...state,
		loggedIn: false,
		pending: true,
	})),
	on(createAccountStoreUserSuccess, (state, action) => ({
		...state,
		storeUser: action.storeUser,
		loggedIn: true,
		pending: false,
	})),
	on(createAccountStoreUserFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		loggedIn: false,
		pending: false,
	})),
	on(createAccountClientUser, (state) => ({
		...state,
		loggedIn: false,
		pending: true,
	})),
	on(createAccountClientUserSuccess, (state, action) => ({
		...state,
		clientUser: action.clientUser,
		loggedIn: true,
		pending: false,
	})),
	on(createAccountClientUserFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		loggedIn: false,
		pending: false,
	})),
	on(editAccountClientUser, (state) => ({
		...state,
		pending: true,
	})),
	on(editAccountClientUserSuccess, (state, action) => ({
		...state,
		clientUser: action.clientUser,
		pending: false,
	})),
	on(editAccountClientUserFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	}))
);

export function userReducer(state: any, action: any) {
	return _userReducer(state, action);
}
