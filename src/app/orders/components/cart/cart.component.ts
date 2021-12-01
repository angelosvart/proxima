import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { Product } from "src/app/products/models/Product";
import { ProductState } from "src/app/products/reducers/products.reducer";
import {
	addToCart,
	deleteFromCart,
	getCart,
	getCartProductsById,
} from "../../actions/cart.actions";
import { CartItem } from "../../models/CartItem";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
	public cartProducts: CartItem[];
	public productIds: string[] = [];
	public products: any[] = [];
	public loading: boolean;
	public pending: boolean;
	public cartCount: number;
	public subTotal: number;

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.store.select("cart").subscribe((response) => {
			this.cartProducts = response?.cart;
			this.products = response?.cartProducts;
			this.pending = response?.pending;
			this.cartCount = 0;
			this.subTotal = 0;
			response?.cart.forEach((item) => {
				this.cartCount = this.cartCount + item.quantity;
			});
			response?.cartProducts?.forEach((product) => {
				response?.cart?.forEach((item) => {
					if (product._id === item.productId) {
						this.subTotal = this.subTotal + product.price * item.quantity;
					}
				});
			});
		});

		this.titleService.setTitle(`Cesta de Compras | Próxima`);

		if (this.router.url === "/cart") {
			this.getProductData();
		}
	}

	getProductData() {
		this.productIds = [];
		this.cartProducts.forEach((product) => {
			this.productIds.push(product.productId);
		});
		if (this.productIds.length) {
			this.store.dispatch(getCartProductsById({ productIds: this.productIds }));
		}
	}

	quantityChange(input: any) {
		this.loading = true;

		setTimeout(() => {
			if (!this.pending) {
				this.loading = false;
			}
		}, 1000);

		if (parseInt(input.value) < 1) {
			input.value = "1";
		}
		if (parseInt(input.value) > 99) {
			input.value = "99";
		}

		let quantityChange: number;
		this.cartProducts.forEach((product) => {
			if (product.productId === input.id) {
				quantityChange = parseInt(input.value) - product.quantity;
			}
		});

		const cartItem: CartItem = {
			productId: input.id,
			quantity: quantityChange,
		};

		this.store.dispatch(addToCart({ cartItem }));
	}

	deleteFromCart(productId: string) {
		this.loading = true;

		setTimeout(() => {
			if (!this.pending) {
				this.loading = false;
			}
		}, 1000);

		this.store.dispatch(deleteFromCart({ productId }));
	}
}
