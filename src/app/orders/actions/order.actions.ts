import { createAction, props } from "@ngrx/store";
import { Order } from "../models/Order";

export const createOrder = createAction(
	"[ORDERS] Create order",
	props<{ createdOrder: Order }>()
);

export const createOrderSuccess = createAction(
	"[ORDERS] Create order Success",
	props<{ selectedOrder: Order }>()
);

export const createOrderFailure = createAction(
	"[ORDERS] Create order failure",
	props<{ payload: any }>()
);

export const getOrderById = createAction(
	"[ORDERS] Get order by ID",
	props<{ orderId: string }>()
);

export const getOrderByIdSuccess = createAction(
	"[ORDERS] Get order by ID Success",
	props<{ selectedOrder: Order }>()
);

export const getOrderByIdFailure = createAction(
	"[ORDERS] Get order by ID failure",
	props<{ payload: any }>()
);

export const resetSelectedOrder = createAction("[ORDERS] Reset selected order");
