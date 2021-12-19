import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { Product } from "src/app/products/models/Product";
import { getStoreById } from "../../actions/dashboard.actions";
import { StoreUser } from "../../../users/models/StoreUser";
import { Title } from "@angular/platform-browser";
import {
	cleanCreatedProduct,
	getProductsByStoreById,
} from "src/app/products/actions/products.actions";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
	public storeUser: StoreUser;
	public storeProducts: Product[];

	private productsObservable: Subscription;
	private usersObservable: Subscription;

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.storeUser) {
				this.storeUser = response.storeUser;
				this.store.dispatch(
					getProductsByStoreById({ storeId: this.storeUser._id })
				);
			}
			if (response.clientUser) {
				this.router.navigate(["/products"]);
			}
		});

		this.productsObservable = this.store
			.select("products")
			.subscribe((response) => {
				if (response.products) {
					this.storeProducts = response.products;
				}
			});

		this.titleService.setTitle(`Dashboard | Próxima`);
	}

	ngOnDestroy(): void {
		this.usersObservable.unsubscribe();
		this.productsObservable.unsubscribe();
	}
}
