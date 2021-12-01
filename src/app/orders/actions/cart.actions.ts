import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/products/models/Product";
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

export const getCartProductsById = createAction(
	"[CART] Get products by Id",
	props<{ productIds: string[] }>()
);

export const getCartProductsByIdSuccess = createAction(
	"[CART] Get products by Id Success",
	props<{ products: Product[] }>()
);

export const getCartProductsByIdFailure = createAction(
	"[CART] Get products by Id failure",
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
