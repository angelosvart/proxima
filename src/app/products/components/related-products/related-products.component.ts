import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { getProducts } from "../../actions/products.actions";
import { Product } from "../../models/Product";

@Component({
	selector: "app-related-products",
	templateUrl: "./related-products.component.html",
	styleUrls: ["./related-products.component.scss"],
})
export class RelatedProductsComponent implements OnInit, OnDestroy {
	@Input()
	public postCode: string;

	@Input()
	public product: Product;

	public products: Product[];
	public categoryProducts: Product[];
	private productsObservable: Subscription;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.productsObservable = this.store
			.select("products")
			.subscribe((response) => {
				this.products = response.products;
				if (this.products) {
					this.selectRelatedProducts();
				}
			});

		this.products = [];
		this.categoryProducts = [];

		this.store.dispatch(
			getProducts({
				userPostCode: this.postCode,
				filters: { category: this.product.category["_id"] },
			})
		);
	}

	selectRelatedProducts() {
		let filterProducts = this.products.filter((product) => {
			return product._id !== this.product._id;
		});

		this.categoryProducts = filterProducts
			.map((product) => ({ product, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ product }) => product);
	}

	ngOnDestroy() {
		this.productsObservable.unsubscribe();
	}
}
