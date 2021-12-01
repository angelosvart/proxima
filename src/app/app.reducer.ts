import { ActionReducerMap } from "@ngrx/store";
import * as loginReducers from "./login/reducers";
import * as productsReducers from "./products/reducers/products.reducer";
import * as categoriesReducers from "./products/reducers/categories.reducer";
import * as cartReducers from "./orders/reducers/cart.reducers";

export interface AppState {
	login: loginReducers.LoginState;
	products: productsReducers.ProductState;
	categories: categoriesReducers.CategoryState;
	cart: cartReducers.CartState;
}

export const appReducers: ActionReducerMap<AppState> = {
	login: loginReducers.loginReducer,
	products: productsReducers.productsReducer,
	categories: categoriesReducers.categoriesReducer,
	cart: cartReducers.cartReducer,
};
