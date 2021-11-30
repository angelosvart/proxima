import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { getCategories } from "../../actions/categories.actions";
import { cancelGetProducts, getProducts } from "../../actions/products.actions";
import { ProductState } from "../../reducers/products.reducer";
import { Title } from "@angular/platform-browser";
import { CategoryState } from "../../reducers/categories.reducer";

@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
	public postCode: string;
	public productsState$: ProductState;
	public categoryState$: CategoryState;
	public productPending: boolean = true;
	public brandFilter: string[] = [];
	public subcategoryFilter: string[] = [];
	public colorFilter: string[] = [];
	public ownerFilter: string[] = [];
	public isCategoryPage: boolean = false;
	public isSearchPage: boolean = false;
	public searchQuery: string;
	public categoryPageId: string;
	public pageTitle: string;
	public currentPaginatorPage: number;
	public maxProductsPerPage: number = 12;
	public totalPages: number[];

	constructor(
		private router: Router,
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.postCode = localStorage.getItem("postCode");

		if (!this.postCode) {
			this.router.navigate(["/"]);
		}

		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { page: 1 },
			queryParamsHandling: "merge",
		});

		this.store.select("products").subscribe((response) => {
			this.productPending = response.pending;
			this.productsState$ = response;
			this.getPageTitle();
			this.initFilters();
			this.initPaginator();
		});

		this.store.select("categories").subscribe((response) => {
			this.categoryState$ = response;
			this.routeHandle();
		});

		this.store.dispatch(getCategories());
	}

	routeHandle() {
		this.activatedRoute.params.subscribe((params) => {
			if (!this.categoryState$.categories) return;

			this.productPending = true;
			this.resetFilterList();

			this.categoryState$.categories.map((category) => {
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
		if (this.categoryState$ && this.categoryPageId) {
			this.categoryState$.categories.map((category) => {
				if (category._id === this.categoryPageId) {
					this.pageTitle = category.name;
				}
				if (this.categoryPageId === "sales") {
					this.pageTitle = "Ofertas";
				}
			});
		} else if (this.categoryState$ && this.searchQuery) {
			this.pageTitle = `Búsqueda: ${this.searchQuery}`;
		} else {
			this.pageTitle = `Productos en ${this.postCode}`;
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
			this.productsState$.products?.map((product) => {
				this.brandFilter.push(product.brand);
				this.subcategoryFilter.push(product.subcategory);
				this.colorFilter.push(product.color);
				this.ownerFilter.push(product.owner.name);
			});
			this.brandFilter = [...new Set(this.brandFilter)];
			this.subcategoryFilter = [...new Set(this.subcategoryFilter)];
			this.colorFilter = [...new Set(this.colorFilter)];
			this.ownerFilter = [...new Set(this.ownerFilter)];
		}
	}

	resetFilterList() {
		this.brandFilter = [];
		this.subcategoryFilter = [];
		this.colorFilter = [];
		this.ownerFilter = [];
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
				if (filter.value === "sales") {
					filterObject["isOffer"] = true;
					return;
				}
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
		if (this.productsState$.products) {
			const pages = Math.ceil(
				this.productsState$.products.length / this.maxProductsPerPage
			);
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
