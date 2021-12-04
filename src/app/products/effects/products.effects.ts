import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import {
	map,
	catchError,
	exhaustMap,
	takeUntil,
	mergeMap,
} from "rxjs/operators";
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

	getProduct$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProductsActions.getProductById),
			mergeMap(({ productId }) =>
				this.productsService.getProductById(productId).pipe(
					map((product) => ProductsActions.getProductByIdSuccess({ product })),
					catchError((error) =>
						of(ProductsActions.getProductByIdFailure({ payload: error }))
					)
				)
			)
		)
	);

	createProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProductsActions.createProduct),
			mergeMap(({ productData }) =>
				this.productsService.createProduct(productData).pipe(
					map((product) =>
						ProductsActions.createProductSuccess({ product: product })
					),
					catchError((error) =>
						of(ProductsActions.createProductFailure({ payload: error }))
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
