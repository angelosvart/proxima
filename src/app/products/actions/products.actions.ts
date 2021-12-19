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

export const createProduct = createAction(
	"[PRODUCTS] Create product",
	props<{ productData: FormData }>()
);

export const createProductSuccess = createAction(
	"[PRODUCTS] Create product Success",
	props<{ product: Product }>()
);

export const createProductFailure = createAction(
	"[PRODUCTS] Create product failure",
	props<{ payload: any }>()
);

export const getProductsByStoreById = createAction(
	"[PRODUCTS] Get products by store by ID",
	props<{ storeId: string }>()
);

export const getProductsByStoreByIdSuccess = createAction(
	"[PRODUCTS] Get products by store ID Success",
	props<{ products: Product[] }>()
);

export const getProductsByStoreByIdFailure = createAction(
	"[PRODUCTS] Get products by store ID failure",
	props<{ payload: any }>()
);

export const editProduct = createAction(
	"[PRODUCTS] Edit product",
	props<{ productId: string; productData: FormData }>()
);

export const editProductSuccess = createAction(
	"[PRODUCTS] Edit product Success",
	props<{ product: Product }>()
);

export const editProductFailure = createAction(
	"[PRODUCTS] Edit product failure",
	props<{ payload: any }>()
);

export const cleanCreatedProduct = createAction(
	"[PRODUCTS] Clean created product"
);

export const deleteProduct = createAction(
	"[PRODUCTS] Delete product",
	props<{ productId: string }>()
);

export const deleteProductSuccess = createAction(
	"[PRODUCTS] Delete product Success"
);

export const deleteProductFailure = createAction(
	"[PRODUCTS] Delete product failure",
	props<{ payload: any }>()
);
