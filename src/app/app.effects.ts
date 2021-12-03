import { ProductsEffects } from "./products/effects/products.effects";
import { CategoriesEffects } from "./products/effects/categories.effects";
import { CartEffects } from "./orders/effects/cart.effects";
import { DeliveryMethodsEffects } from "./orders/effects/deliveryMethods.effects";
import { PaymentMethodsEffects } from "./orders/effects/paymentMethods.effects";
import { OrderEffects } from "./orders/effects/order.effects";

export const effects = [
	ProductsEffects,
	CategoriesEffects,
	CartEffects,
	DeliveryMethodsEffects,
	PaymentMethodsEffects,
	OrderEffects,
];
