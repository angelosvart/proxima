import { createReducer, on } from "@ngrx/store";
import {
	getDeliveryMethods,
	getDeliveryMethodsFailure,
	getDeliveryMethodsSuccess,
} from "../actions/deliveryMethods.actions";
import { DeliveryMethod } from "../models/DeliveryMethod";

export interface DeliveryMethodsState {
	deliveryMethods: DeliveryMethod[];
	error: any;
	pending: boolean;
}

export const initialState: DeliveryMethodsState = {
	deliveryMethods: null,
	error: null,
	pending: false,
};

const _deliveryMethodsReducer = createReducer(
	initialState,
	on(getDeliveryMethods, (state) => ({
		...state,
		pending: true,
	})),
	on(getDeliveryMethodsSuccess, (state, action) => ({
		...state,
		deliveryMethods: [...action.deliveryMethods],
		pending: false,
	})),
	on(getDeliveryMethodsFailure, (state, { payload }) => ({
		...state,
		error: {
			url: payload.url,
			status: payload.status,
			message: payload.message,
		},
		pending: false,
	}))
);

export function deliveryMethodsReducer(state: any, action: any) {
	return _deliveryMethodsReducer(state, action);
}
