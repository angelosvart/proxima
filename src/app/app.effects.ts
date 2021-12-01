import { ProductsEffects } from "./products/effects/products.effects";
import { CategoriesEffects } from "./products/effects/categories.effects";
import { CartEffects } from "./orders/effects/cart.effects";

export const effects = [ProductsEffects, CategoriesEffects, CartEffects];
