import { ActionReducerMap } from "@ngrx/store";
import * as loginReducers from "./login/reducers";
import * as productsReducers from "./products/reducers/products.reducer";
import * as categoriesReducers from "./products/reducers/categories.reducer";
import * as cartReducers from "./orders/reducers/cart.reducers";
import * as paymentMethodsReducers from "./orders/reducers/paymentMethods.reducers";
import * as deliveryMethodsReducers from "./orders/reducers/deliveryMethods.reducers";
import * as orderReducers from "./orders/reducers/order.reducers";

export interface AppState {
	login: loginReducers.LoginState;
	products: productsReducers.ProductState;
	categories: categoriesReducers.CategoryState;
	cart: cartReducers.CartState;
	paymentMethods: paymentMethodsReducers.PaymentMethodsState;
	deliveryMethods: deliveryMethodsReducers.DeliveryMethodsState;
	order: orderReducers.OrderState;
}

export const appReducers: ActionReducerMap<AppState> = {
	login: loginReducers.loginReducer,
	products: productsReducers.productsReducer,
	categories: categoriesReducers.categoriesReducer,
	cart: cartReducers.cartReducer,
	paymentMethods: paymentMethodsReducers.paymentMethodsReducer,
	deliveryMethods: deliveryMethodsReducers.deliveryMethodsReducer,
	order: orderReducers.orderReducer,
};
