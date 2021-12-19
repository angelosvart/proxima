import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, mergeMap } from "rxjs/operators";
import * as DashboardActions from "../actions/dashboard.actions";
import { DashboardService } from "../services/dashboard.service";

@Injectable()
export class DashboardEffects {
	getStoreById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DashboardActions.getStoreById),
			mergeMap(({ storeId }) =>
				this.dashboardService.getStoreById(storeId).pipe(
					map((storeUser) =>
						DashboardActions.getStoreByIdSuccess({ storeUser })
					),
					catchError((error) =>
						of(DashboardActions.getStoreByIdFailure({ payload: error }))
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private dashboardService: DashboardService
	) {}
}
