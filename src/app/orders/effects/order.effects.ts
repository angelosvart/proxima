import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, mergeMap } from "rxjs/operators";
import * as OrderActions from "../actions/order.actions";
import { OrderService } from "../services/order.service";

@Injectable()
export class OrderEffects {
	createOrder$ = createEffect(() =>
		this.actions$.pipe(
			ofType(OrderActions.createOrder),
			mergeMap(({ createdOrder }) =>
				this.orderService.createOrder(createdOrder).pipe(
					map((order) =>
						OrderActions.createOrderSuccess({ selectedOrder: order })
					),
					catchError((error) =>
						of(OrderActions.createOrderFailure({ payload: error }))
					)
				)
			)
		)
	);

	getOrderById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(OrderActions.getOrderById),
			mergeMap(({ orderId }) =>
				this.orderService.getOrderById(orderId).pipe(
					map((order) =>
						OrderActions.getOrderByIdSuccess({ selectedOrder: order })
					),
					catchError((error) =>
						of(OrderActions.getOrderByIdFailure({ payload: error }))
					)
				)
			)
		)
	);

	constructor(private actions$: Actions, private orderService: OrderService) {}
}
