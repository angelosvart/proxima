import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as DeliveryMethodsActions from "../actions/deliveryMethods.actions";
import { DeliveryMethodsService } from "../services/deliveryMethods.service";

@Injectable()
export class DeliveryMethodsEffects {
	getDeliveryMethods$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DeliveryMethodsActions.getDeliveryMethods),
			mergeMap(() =>
				this.deliveryMethodsService.getDeliveryMethods().pipe(
					map((deliveryMethods) =>
						DeliveryMethodsActions.getDeliveryMethodsSuccess({
							deliveryMethods,
						})
					),
					catchError((error) =>
						of(
							DeliveryMethodsActions.getDeliveryMethodsFailure({
								payload: error,
							})
						)
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private deliveryMethodsService: DeliveryMethodsService
	) {}
}
