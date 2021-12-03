import { createAction, props } from "@ngrx/store";
import { PaymentMethod } from "../models/PaymentMethod";

export const getPaymentMethods = createAction(
	"[PAYMENT METHODS] Get payment methods"
);

export const getPaymentMethodsSuccess = createAction(
	"[PAYMENT METHODS] Get payment methods Success",
	props<{ paymentMethods: PaymentMethod[] }>()
);

export const getPaymentMethodsFailure = createAction(
	"[PAYMENT METHODS] Get payment methods failure",
	props<{ payload: any }>()
);
