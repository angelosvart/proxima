import { createAction, props } from "@ngrx/store";
import { DeliveryMethod } from "../models/DeliveryMethod";

export const getDeliveryMethods = createAction(
	"[DELIVERY METHODS] Get delivery methods"
);

export const getDeliveryMethodsSuccess = createAction(
	"[DELIVERY METHODS] Get delivery methods Success",
	props<{ deliveryMethods: DeliveryMethod[] }>()
);

export const getDeliveryMethodsFailure = createAction(
	"[DELIVERY METHODS] Get delivery methods failure",
	props<{ payload: any }>()
);
