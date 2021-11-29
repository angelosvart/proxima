import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, exhaustMap, takeUntil } from "rxjs/operators";
import * as ProductsActions from "../actions/products.actions";
import { ProductsService } from "../services/products.service";

@Injectable()
export class ProductsEffects {
	getProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProductsActions.getProducts),
			exhaustMap(({ userPostCode, filters }) =>
				this.productsService.getProducts(userPostCode, filters).pipe(
					map((products) => ProductsActions.getProductsSuccess({ products })),
					catchError((error) =>
						of(ProductsActions.getProductsFailure({ payload: error }))
					),
					takeUntil(
						this.actions$.pipe(ofType(ProductsActions.cancelGetProducts))
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private productsService: ProductsService
	) {}
}
