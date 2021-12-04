import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, mergeMap } from "rxjs/operators";
import * as StoresActions from "../actions/stores.actions";
import { StoresService } from "../services/stores.service";

@Injectable()
export class StoresEffects {
	getStoreById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StoresActions.getStoreById),
			mergeMap(({ storeId }) =>
				this.storesService.getStoreById(storeId).pipe(
					map((store) => StoresActions.getStoreByIdSuccess({ store })),
					catchError((error) =>
						of(StoresActions.getStoreByIdFailure({ payload: error }))
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private storesService: StoresService
	) {}
}
