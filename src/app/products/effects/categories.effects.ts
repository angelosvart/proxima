import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, mergeMap } from "rxjs/operators";
import * as CategoriesActions from "../actions/categories.actions";
import { CategoriesService } from "../services/categories.service";

@Injectable()
export class CategoriesEffects {
	getCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.getCategories),
			mergeMap(() =>
				this.categoriesService.getCategories().pipe(
					map((categories) =>
						CategoriesActions.getCategoriesSuccess({ categories })
					),
					catchError((error) =>
						of(CategoriesActions.getCategoriesFailure({ payload: error }))
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private categoriesService: CategoriesService
	) {}
}
