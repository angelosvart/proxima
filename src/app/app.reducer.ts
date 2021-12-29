import { ActionReducerMap } from "@ngrx/store";
import * as productsReducers from "./products/reducers/products.reducer";
import * as categoriesReducers from "./products/reducers/categories.reducer";
import * as cartReducers from "./orders/reducers/cart.reducers";
import * as paymentMethodsReducers from "./orders/reducers/paymentMethods.reducers";
import * as deliveryMethodsReducers from "./orders/reducers/deliveryMethods.reducers";
import * as orderReducers from "./orders/reducers/order.reducers";
import * as usersReducers from "./users/reducers/users.reducer";

export interface AppState {
	products: productsReducers.ProductState;
	categories: categoriesReducers.CategoryState;
	cart: cartReducers.CartState;
	paymentMethods: paymentMethodsReducers.PaymentMethodsState;
	deliveryMethods: deliveryMethodsReducers.DeliveryMethodsState;
	order: orderReducers.OrderState;
	users: usersReducers.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
	products: productsReducers.productsReducer,
	categories: categoriesReducers.categoriesReducer,
	cart: cartReducers.cartReducer,
	paymentMethods: paymentMethodsReducers.paymentMethodsReducer,
	deliveryMethods: deliveryMethodsReducers.deliveryMethodsReducer,
	order: orderReducers.orderReducer,
	users: usersReducers.userReducer,
};
