import { ActionReducerMap } from "@ngrx/store";
import * as loginReducers from "./login/reducers";
import * as productsReducers from "./products/reducers/products.reducer";
import * as categoriesReducers from "./products/reducers/categories.reducer";

export interface AppState {
	login: loginReducers.LoginState;
	products: productsReducers.ProductState;
	categories: categoriesReducers.CategoryState;
}

export const appReducers: ActionReducerMap<AppState> = {
	login: loginReducers.loginReducer,
	products: productsReducers.productsReducer,
	categories: categoriesReducers.categoriesReducer,
};
