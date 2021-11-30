import { createAction, props } from "@ngrx/store";
import { Product } from "../models/Product";

export const getProducts = createAction(
	"[PRODUCTS] Get products",
	props<{ userPostCode: string; filters?: object }>()
);

export const getProductsSuccess = createAction(
	"[PRODUCTS] Get products Success",
	props<{ products: Product[] }>()
);

export const getProductsFailure = createAction(
	"[PRODUCTS] Get products failure",
	props<{ payload: any }>()
);

export const cancelGetProducts = createAction("[PRODUCTS] Cancel get products");

export const getProductById = createAction(
	"[PRODUCTS] Get product by Id",
	props<{ productId: string }>()
);

export const getProductByIdSuccess = createAction(
	"[PRODUCTS] Get product by Id Success",
	props<{ product: Product }>()
);

export const getProductByIdFailure = createAction(
	"[PRODUCTS] Get product by Id failure",
	props<{ payload: any }>()
);
