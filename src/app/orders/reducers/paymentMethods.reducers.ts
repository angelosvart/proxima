import { createReducer, on } from "@ngrx/store";
import {
	getPaymentMethods,
	getPaymentMethodsFailure,
	getPaymentMethodsSuccess,
} from "../actions/paymentMethods.actions";
import { PaymentMethod } from "../models/PaymentMethod";

export interface PaymentMethodsState {
	paymentMethods: PaymentMethod[];
	error: any;
	pending: boolean;
}

export const initialState: PaymentMethodsState = {
	paymentMethods: null,
	error: null,
	pending: false,
};

const _paymentMethodsReducer = createReducer(
	initialState,
	on(getPaymentMethods, (state) => ({
		...state,
		pending: true,
	})),
	on(getPaymentMethodsSuccess, (state, action) => ({
		...state,
		paymentMethods: [...action.paymentMethods],
		pending: false,
	})),
	on(getPaymentMethodsFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	}))
);

export function paymentMethodsReducer(state: any, action: any) {
	return _paymentMethodsReducer(state, action);
}
