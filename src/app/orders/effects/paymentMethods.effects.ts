import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as PaymentMethodsActions from "../actions/paymentMethods.actions";
import { PaymentMethodsService } from "../services/paymentMethods.service";

@Injectable()
export class PaymentMethodsEffects {
	getPaymentMethods$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PaymentMethodsActions.getPaymentMethods),
			mergeMap(() =>
				this.paymentMethodsService.getPaymentMethods().pipe(
					map((paymentMethods) =>
						PaymentMethodsActions.getPaymentMethodsSuccess({ paymentMethods })
					),
					catchError((error) =>
						of(
							PaymentMethodsActions.getPaymentMethodsFailure({ payload: error })
						)
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private paymentMethodsService: PaymentMethodsService
	) {}
}
