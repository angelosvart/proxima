import { createAction, props } from "@ngrx/store";
import { Product } from "../models/Product";

export const getProducts = createAction(
	"[PRODUCTS] Get products",
	props<{ userPostCode: string }>()
);

export const getProductsSuccess = createAction(
	"[PRODUCTS] Get products Success",
	props<{ products: Product[] }>()
);

export const getProductsFailure = createAction(
	"[PRODUCTS] Get products failure",
	props<{ payload: any }>()
);
