import { createAction, props } from "@ngrx/store";
import { CartItem } from "../models/CartItem";

export const getCart = createAction("[CART] Get cart");

export const getCartSuccess = createAction(
	"[CART] Get cart Success",
	props<{ cart: CartItem[] }>()
);

export const getCartFailure = createAction(
	"[CART] Get cart failure",
	props<{ payload: any }>()
);

export const addToCart = createAction(
	"[CART] Add to cart",
	props<{ cartItem: CartItem }>()
);

export const addToCartSuccess = createAction(
	"[CART] Add to cart Success",
	props<{ cart: CartItem[] }>()
);

export const addToCartFailure = createAction(
	"[CART] Add to cart failure",
	props<{ payload: any }>()
);

export const deleteFromCart = createAction(
	"[CART] Delete from cart",
	props<{ productId: string }>()
);

export const deleteFromCartSuccess = createAction(
	"[CART] Delete from cart Success",
	props<{ cart: CartItem[] }>()
);

export const deleteFromCartFailure = createAction(
	"[CART] Delete from cart failure",
	props<{ payload: any }>()
);
