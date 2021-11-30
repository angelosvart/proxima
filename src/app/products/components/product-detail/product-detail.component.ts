import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
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
export class ProductDetailComponent implements OnInit {
	public productPending: boolean = true;
	public categoryState$: CategoryState;
	public productState$: ProductState;
	public product: Product;
	public postCode: string;
	public categoryProducts: Product[];

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

		this.store.select("categories").subscribe((response) => {
			this.categoryState$ = response;
		});

		this.store.select("products").subscribe((response) => {
			this.productPending = response.pending;
			this.productState$ = response;
			this.product = response.selectedProduct;
			if (this.product) {
				this.getPageTitle();
			}
		});

		this.store.dispatch(getCategories());

		this.activatedRoute.params.subscribe((params) => {
			const id = params["id"];
			if (id) {
				this.store.dispatch(getProductById({ productId: id }));
			}
		});
	}

	getPageTitle() {
		if (this.product) {
			this.titleService.setTitle(`${this.product.name} | Próxima`);
		}
	}
}
