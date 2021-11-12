import { ActionReducerMap } from "@ngrx/store";
import * as loginReducers from "./login/reducers";
import * as productsReducers from "./products/reducers";

export interface AppState {
	login: loginReducers.LoginState;
	products: productsReducers.ProductState;
}

export const appReducers: ActionReducerMap<AppState> = {
	login: loginReducers.loginReducer,
	products: productsReducers.productsReducer,
};
