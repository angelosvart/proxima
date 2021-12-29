import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartItem } from "../models/CartItem";

@Injectable({
	providedIn: "root",
})
export class CartService {
	private cartApi = "https://proxima-backend.herokuapp.com/api/cart";

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

	deleteFromCart(productId: string): CartItem[] {
		const cart: CartItem[] = this.getCart();
		const updatedCart = cart.filter((item) => item.productId !== productId);

		localStorage.setItem("cart", JSON.stringify(updatedCart));

		return updatedCart;
	}
}
