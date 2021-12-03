import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, mergeMap } from "rxjs/operators";
import * as CartActions from "../actions/cart.actions";
import { CartService } from "../services/cart.service";

@Injectable()
export class CartEffects {
	getCart$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CartActions.getCart),
			map(() => {
				const cart = this.cartService.getCart();
				if (!cart) {
					return CartActions.getCartFailure({
						payload: { message: "Ha ocurrido un error" },
					});
				} else {
					return CartActions.getCartSuccess({ cart });
				}
			})
		)
	);

	addToCart$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CartActions.addToCart),
			map(({ cartItem }) => {
				const cart = this.cartService.addCartItem(cartItem);
				if (!cart) {
					return CartActions.addToCartFailure({
						payload: { message: "Ha ocurrido un error" },
					});
				} else {
					return CartActions.addToCartSuccess({ cart });
				}
			})
		)
	);

	deleteFromCart$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CartActions.deleteFromCart),
			map(({ productId }) => {
				const cart = this.cartService.deleteFromCart(productId);
				if (!cart) {
					return CartActions.deleteFromCartFailure({
						payload: { message: "Ha ocurrido un error" },
					});
				} else {
					return CartActions.deleteFromCartSuccess({ cart });
				}
			})
		)
	);

	constructor(private actions$: Actions, private cartService: CartService) {}
}
