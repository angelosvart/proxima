import { createAction, props } from "@ngrx/store";
import { Stores } from "../models/Stores";

export const getStoreById = createAction(
	"[STORES] Get store by ID",
	props<{ storeId: string }>()
);

export const getStoreByIdSuccess = createAction(
	"[STORES] Get store by ID Success",
	props<{ store: Stores }>()
);

export const getStoreByIdFailure = createAction(
	"[STORES] Get store by ID failure",
	props<{ payload: any }>()
);
