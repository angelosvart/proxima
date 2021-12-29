import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { cancelGetProducts, getProducts } from "../../actions/products.actions";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";

@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit, OnDestroy {
	public postCode: string;
	public products: Product[];
	public categories: Category[];
	public productPending: boolean = true;
	public brandFilter: string[] = [];
	public subcategoryFilter: string[] = [];
	public colorFilter: string[] = [];
	public storeFilter: any[] = [];
	public categoryFilter: string[] = [];
	public isCategoryPage: boolean = false;
	public isSearchPage: boolean = false;
	public searchQuery: string;
	public categoryPageId: string;
	public pageTitle: string;
	public currentPaginatorPage: number;
	public maxProductsPerPage: number = 12;
	public totalPages: number[];
	private productsObservable: Subscription;
	private categoriesObservable: Subscription;

	constructor(
		private router: Router,
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.postCode = localStorage.getItem("postCode");

		if (!this.postCode || this.postCode === null) {
			this.router.navigate(["/"]);
			return;
		}

		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { page: 1 },
			queryParamsHandling: "merge",
		});

		this.productsObservable = this.store
			.select("products")
			.subscribe((response) => {
				this.productPending = response.pending;
				this.products = response.products;
				this.getPageTitle();
				this.initFilters();
				this.initPaginator();
			});

		this.categoriesObservable = this.store
			.select("categories")
			.subscribe((response) => {
				this.categories = response.categories;
				this.routeHandle();
			});
	}

	ngOnDestroy() {
		if (this.productsObservable) this.productsObservable.unsubscribe();
		if (this.categoriesObservable) this.categoriesObservable.unsubscribe();
	}

	routeHandle() {
		this.activatedRoute.params.subscribe((params) => {
			if (!this.categories) return;

			this.productPending = true;
			this.resetFilterList();

			this.categories.map((category) => {
				if (category.path === params["category"]) {
					this.categoryPageId = category._id;
				}
			});

			if (params["category"] === "sales") {
				this.categoryPageId = "sales";
			}

			this.store.dispatch(cancelGetProducts());

			if (this.categoryPageId) {
				if (this.categoryPageId === "sales") {
					this.store.dispatch(
						getProducts({
							userPostCode: this.postCode,
							filters: { isOffer: true },
						})
					);
				} else {
					this.store.dispatch(
						getProducts({
							userPostCode: this.postCode,
							filters: { category: this.categoryPageId },
						})
					);
				}
				this.isCategoryPage = true;
			} else {
				this.store.dispatch(
					getProducts({
						userPostCode: this.postCode,
					})
				);
				this.isCategoryPage = false;
			}
		});

		this.activatedRoute.queryParams.subscribe((params) => {
			this.currentPaginatorPage = params["page"] ? params["page"] - 1 : 0;
			this.searchQuery = params["search"];
			if (this.searchQuery) {
				this.handleSearch();
			} else {
				this.isSearchPage = false;
			}
		});
	}

	getPageTitle() {
		if (this.categories && this.categoryPageId) {
			this.categories.map((category) => {
				if (category._id === this.categoryPageId) {
					this.pageTitle = category.name;
				}
				if (this.categoryPageId === "sales") {
					this.pageTitle = "Ofertas";
				}
			});
		} else if (this.categories && this.searchQuery) {
			this.pageTitle = `Búsqueda: ${this.searchQuery}`;
		} else {
			this.pageTitle = `Productos cerca de ${this.postCode}`;
		}

		this.titleService.setTitle(`${this.pageTitle} | Próxima`);
	}

	toggleOptions(filterItem: any) {
		filterItem
			.closest(".filters__optionTitle")
			.querySelector("img")
			.classList.toggle("closed");

		filterItem
			.closest(".filters__optionTitle")
			.nextElementSibling.classList.toggle("closed");
	}

	filterModalToggle() {
		document.querySelector("body")?.classList.toggle("openModal");
		document
			.querySelector(".productList__filters")
			?.classList.toggle("openModal");
		document.querySelector(".modalOverlay")?.classList.toggle("openModal");
	}

	initFilters() {
		if (!this.productPending) {
			this.products?.map((product) => {
				this.categoryFilter.push(product.category["name"]);
				this.brandFilter.push(product.brand);
				this.subcategoryFilter.push(product.subcategory);
				this.colorFilter.push(product.color);
				this.storeFilter.push(product.store);
			});
			this.categoryFilter = [...new Set(this.categoryFilter)];
			this.brandFilter = [...new Set(this.brandFilter)];
			this.subcategoryFilter = [...new Set(this.subcategoryFilter)];
			this.colorFilter = [...new Set(this.colorFilter)];
			this.storeFilter = this.storeFilter.filter(
				(value, index, self) =>
					index === self.findIndex((t) => t._id === value._id)
			);
		}
	}

	resetFilterList() {
		this.categoryFilter = [];
		this.brandFilter = [];
		this.subcategoryFilter = [];
		this.colorFilter = [];
		this.storeFilter = [];
	}

	filterProducts() {
		this.productPending = true;
		const formFieldsets: NodeListOf<HTMLInputElement> =
			document.querySelectorAll("#filterForm fieldset");

		let filterObject = {};

		[...formFieldsets].forEach((fieldset) => {
			let filterArray = [];
			let filters: NodeListOf<HTMLInputElement> =
				fieldset.querySelectorAll("input:checked");
			filters.forEach((filter) => {
				filterArray.push(filter.value);
			});
			if (filterArray.length) {
				filterObject[fieldset.name] = filterArray;
			}
		});

		if (this.isCategoryPage) {
			if (this.categoryPageId === "sales") {
				filterObject["isOffer"] = true;
			} else {
				filterObject["category"] = this.categoryPageId;
			}
		}

		if (this.isSearchPage) {
			filterObject["search"] = this.searchQuery;
		}

		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { page: 1 },
			queryParamsHandling: "merge",
		});

		this.store.dispatch(cancelGetProducts());

		this.store.dispatch(
			getProducts({ userPostCode: this.postCode, filters: filterObject })
		);
	}

	clearFilters() {
		const checkedInputs: NodeListOf<HTMLInputElement> =
			document.querySelectorAll("#filterForm input:checked");

		if (!checkedInputs.length) return;
		checkedInputs.forEach((input) => {
			input.checked = false;
		});
		this.filterProducts();
	}

	initPaginator() {
		if (this.products) {
			const pages = Math.ceil(this.products.length / this.maxProductsPerPage);
			this.totalPages = Array(pages)
				.fill(pages)
				.map((x, i) => i);
		}
	}

	handlePaginator(page: number) {
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { page: page + 1 },
			queryParamsHandling: "merge",
		});
	}

	handleSearch() {
		if (this.searchQuery) {
			this.store.dispatch(cancelGetProducts());
			this.isSearchPage = true;
			this.store.dispatch(
				getProducts({
					userPostCode: this.postCode,
					filters: { search: this.searchQuery },
				})
			);
			this.resetFilterList();
		}
	}
}
