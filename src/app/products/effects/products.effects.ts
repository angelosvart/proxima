import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, exhaustMap } from "rxjs/operators";
import * as ProductsActions from "../actions";
import { ProductsService } from "../services/products.service";

import { Router } from "@angular/router";

@Injectable()
export class ProductsEffects {
	getProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProductsActions.getProducts),
			exhaustMap(({ userPostCode }) =>
				this.productsService.getProducts(userPostCode).pipe(
					map((products) => ProductsActions.getProductsSuccess({ products })),
					catchError((error) =>
						of(ProductsActions.getProductsFailure({ payload: error }))
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private router: Router,
		private productsService: ProductsService
	) {}
}
