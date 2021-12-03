import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { addToCart } from "src/app/orders/actions/cart.actions";
import { CartItem } from "src/app/orders/models/CartItem";
import { getCategories } from "../../actions/categories.actions";
import { getProductById, getProducts } from "../../actions/products.actions";
import { Product } from "../../models/Product";
import { CategoryState } from "../../reducers/categories.reducer";
import { ProductState } from "../../reducers/products.reducer";

@Component({
	selector: "app-product-detail",
	templateUrl: "./product-detail.component.html",
	styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	public productPending: boolean = true;
	public categoryState$: CategoryState;
	public productState$: ProductState;
	public product: Product;
	public postCode: string;
	public categoryProducts: Product[];
	private productsObservable: Subscription;
	private categoriesObservable: Subscription;

	constructor(
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.postCode = localStorage.getItem("postCode");

		if (!this.postCode) {
			this.router.navigate(["/"]);
		}

		this.categoriesObservable = this.store
			.select("categories")
			.subscribe((response) => {
				this.categoryState$ = response;
			});

		this.productsObservable = this.store
			.select("products")
			.subscribe((response) => {
				this.productPending = response.pending;
				this.productState$ = response;
				this.product = response.selectedProduct;
				if (this.product) {
					this.getPageTitle();
				}
			});

		this.activatedRoute.params.subscribe((params) => {
			const id = params["id"];
			if (id) {
				this.store.dispatch(getProductById({ productId: id }));
			}
		});
	}

	ngOnDestroy() {
		this.productsObservable.unsubscribe();
		this.categoriesObservable.unsubscribe();
	}

	getPageTitle() {
		if (this.product) {
			this.titleService.setTitle(`${this.product.name} | Próxima`);
		}
	}

	addToCart() {
		const quantity: HTMLSelectElement =
			document.querySelector(".product__quantity");
		const button: HTMLButtonElement =
			document.querySelector(".product__button");

		button.disabled = true;
		button.classList.add("loading");
		button.querySelector("span").innerText = "Añadiendo a la Cesta...";

		const cartItem: CartItem = {
			productId: this.product._id,
			quantity: parseInt(quantity.value),
		};

		this.store.dispatch(addToCart({ cartItem }));

		setTimeout(() => {
			button.disabled = false;
			button.classList.remove("loading");
			button.querySelector("span").innerText = "¡Producto añadido!";
			setTimeout(() => {
				button.querySelector("span").innerText = "Añadir a la Cesta";
			}, 1500);
		}, 1500);
	}
}
