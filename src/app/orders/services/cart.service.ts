import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConnectableObservable, Observable } from "rxjs";
import { Product } from "src/app/products/models/Product";
import { CartItem } from "../models/CartItem";

@Injectable({
	providedIn: "root",
})
export class CartService {
	private cartApi = "http://localhost:3000/api/cart";

	constructor(private http: HttpClient) {}

	getCart(): CartItem[] {
		let cart = JSON.parse(localStorage.getItem("cart"));
		if (!cart) {
			cart = [];
		}

		return cart;
	}

	addCartItem(cartItem: CartItem): CartItem[] {
		const cart: CartItem[] = this.getCart();

		const cartItems = cart.find((item) => {
			return item.productId === cartItem.productId;
		});

		if (cartItems) {
			cart.map((item) => {
				if (item.productId === cartItem.productId) {
					item.quantity = item.quantity + cartItem.quantity;
				}
			});
		} else {
			cart.push(cartItem);
		}

		localStorage.setItem("cart", JSON.stringify(cart));

		return cart;
	}

	getCartProductsById(productIds: string[]): Observable<Product[]> {
		let params = new HttpParams();
		params = params.append("id", productIds.toString());

		return this.http
			.get<Product[]>(`${this.cartApi}`, { params: params })
			.pipe();
	}

	deleteFromCart(productId: string): CartItem[] {
		const cart: CartItem[] = this.getCart();
		const updatedCart = cart.filter((item) => item.productId !== productId);

		localStorage.setItem("cart", JSON.stringify(updatedCart));

		return updatedCart;
	}
}
