import { createAction, props } from "@ngrx/store";
import { StoreUser } from "../../users/models/StoreUser";

export const getStoreById = createAction(
	"[DASHBOARD] Get store by ID",
	props<{ storeId: string }>()
);

export const getStoreByIdSuccess = createAction(
	"[DASHBOARD] Get store by ID Success",
	props<{ storeUser: StoreUser }>()
);

export const getStoreByIdFailure = createAction(
	"[DASHBOARD] Get store by ID failure",
	props<{ payload: any }>()
);
