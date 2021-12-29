import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { getProducts } from "src/app/products/actions/products.actions";
import { Product } from "src/app/products/models/Product";
import { addToCart, deleteFromCart } from "../../actions/cart.actions";
import { CartItem } from "../../models/CartItem";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
	public cartProducts: CartItem[];
	public productIds: string[] = [];
	public products: Product[] = [];
	public loading: boolean;
	public pending: boolean;
	public cartCount: number;
	public subTotal: number;
	public postCode: string;
	public isUserLoggedIn: boolean = false;
	private cartObservable: Subscription;
	private productsObservable: Subscription;
	private usersObservable: Subscription;

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.postCode = localStorage.getItem("postCode");

		this.cartObservable = this.store.select("cart").subscribe((response) => {
			if (response.cart) {
				this.cartProducts = response.cart;
				this.calculateCartCount();
				this.calculateSubTotal();
			}
			this.pending = response?.pending;
		});

		this.productsObservable = this.store
			.select("products")
			.subscribe((response) => {
				if (response.products) {
					this.products = response.products;
					this.calculateCartCount();
					this.calculateSubTotal();
				}
			});

		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.clientUser && response.loggedIn) {
				this.isUserLoggedIn = true;
			}
		});

		this.titleService.setTitle(`Cesta de Compras | Próxima`);

		this.getProductData();
	}

	ngOnDestroy() {
		this.cartObservable.unsubscribe();
		this.productsObservable.unsubscribe();
		this.usersObservable.unsubscribe();
	}

	calculateCartCount() {
		this.cartCount = 0;
		this.cartProducts.forEach((item) => {
			this.cartCount = this.cartCount + item.quantity;
		});
	}

	calculateSubTotal() {
		this.subTotal = 0;
		this.products.forEach((product) => {
			this.cartProducts.forEach((item) => {
				if (product._id === item.productId) {
					this.subTotal = this.subTotal + product.price * item.quantity;
				}
			});
		});
	}

	getProductData() {
		this.productIds = [];
		this.cartProducts.forEach((product) => {
			this.productIds.push(product.productId);
		});
		if (this.productIds.length) {
			this.store.dispatch(
				getProducts({
					userPostCode: this.postCode,
					filters: { _id: this.productIds },
				})
			);
		}
	}

	quantityChange(input: any) {
		this.loading = true;

		setTimeout(() => {
			if (!this.pending) {
				this.loading = false;
			}
		}, 1000);

		if (parseInt(input.value) < 1 || !input.value) {
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

	checkLoggedUser() {
		if (this.isUserLoggedIn) {
			this.router.navigate(["/checkout"]);
		} else {
			this.router.navigate(["/login"], {
				queryParams: { redirectTo: "/checkout" },
			});
		}
	}
}
