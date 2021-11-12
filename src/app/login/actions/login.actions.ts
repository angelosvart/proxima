import { createAction, props } from "@ngrx/store";
import { Credentials } from "../models/Credentials";

export const login = createAction(
	"[LOGIN] Login action",
	props<{ credentials: Credentials }>()
);

export const loginSuccess = createAction(
	"[LOGIN] Login Success",
	props<{ credentials: any }>()
);

export const loginFailure = createAction(
	"[LOGIN] Login Failure",
	props<{ payload: any }>()
);

export const loginRedirect = createAction("[LOGIN] Login Redirect");

export const logout = createAction("[LOGIN] Logout");
export const logoutConfirmation = createAction("[LOGIN] Logout Confirmation");
