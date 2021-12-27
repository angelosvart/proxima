import { createAction, props } from "@ngrx/store";
import { ClientUser } from "../models/ClientUser";
import { Credentials } from "../models/Credentials";
import { StoreUser } from "../models/StoreUser";

export const loginClientUser = createAction(
	"[USERS] Login client user",
	props<{ credentials: Credentials }>()
);

export const loginClientUserSuccess = createAction(
	"[USERS] Login client user Success",
	props<{ clientUser: ClientUser }>()
);

export const loginClientUserFailure = createAction(
	"[USERS] Login client user Failure",
	props<{ payload: any }>()
);

export const loginStoreUser = createAction(
	"[USERS] Login Store user",
	props<{ credentials: Credentials }>()
);

export const loginStoreUserSuccess = createAction(
	"[USERS] Login Store user Success",
	props<{ storeUser: StoreUser }>()
);

export const loginStoreUserFailure = createAction(
	"[USERS] Login Store user Failure",
	props<{ payload: any }>()
);

export const initUserSession = createAction("[USERS] Init user session");

export const initUserSessionSuccess = createAction(
	"[USERS] Init user session Success",
	props<{ clientUser?: ClientUser; storeUser?: StoreUser }>()
);

export const initUserSessionFailure = createAction(
	"[USERS] Init user session Failure"
);

export const logout = createAction("[USERS] Logout");

export const createAccountStoreUser = createAction(
	"[USERS] Create account store user",
	props<{ storeUser: StoreUser }>()
);

export const createAccountStoreUserSuccess = createAction(
	"[USERS] Create account store user Success",
	props<{ storeUser: StoreUser }>()
);

export const createAccountStoreUserFailure = createAction(
	"[USERS] Create account store user Failure",
	props<{ payload: any }>()
);

export const createAccountClientUser = createAction(
	"[USERS] Create account client user",
	props<{ clientUser: ClientUser }>()
);

export const createAccountClientUserSuccess = createAction(
	"[USERS] Create account client user Success",
	props<{ clientUser: ClientUser }>()
);

export const createAccountClientUserFailure = createAction(
	"[USERS] Create account client user Failure",
	props<{ payload: any }>()
);

export const editAccountClientUser = createAction(
	"[USERS] Edit account client user",
	props<{ clientUser: ClientUser }>()
);

export const editAccountClientUserSuccess = createAction(
	"[USERS] Edit account client user Success",
	props<{ clientUser: ClientUser }>()
);

export const editAccountClientUserFailure = createAction(
	"[USERS] Edit account client user Failure",
	props<{ payload: any }>()
);

export const editAccountStoreUser = createAction(
	"[USERS] Edit account store user",
	props<{ storeUser: StoreUser }>()
);

export const editAccountStoreUserSuccess = createAction(
	"[USERS] Edit account store user Success",
	props<{ storeUser: StoreUser }>()
);

export const editAccountStoreUserFailure = createAction(
	"[USERS] Edit account store user Failure",
	props<{ payload: any }>()
);
