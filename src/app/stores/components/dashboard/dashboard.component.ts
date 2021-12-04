import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { Product } from "src/app/products/models/Product";
import { getStoreById } from "../../actions/stores.actions";
import { Stores } from "../../models/Stores";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	//TODO user states
	public storeId: string = "6182b4a097f389088d42ed88";
	public storeData: Stores;

	private productsObservable: Subscription;
	private storesObservable: Subscription;

	constructor(private store: Store<AppState>, private router: Router) {}

	ngOnInit(): void {
		this.storesObservable = this.store
			.select("stores")
			.subscribe((response) => {
				if (response.store) {
					this.storeData = response.store;
				}
				if (response.error) {
					this.router.navigate(["/"]);
				}
			});

		this.store.dispatch(getStoreById({ storeId: this.storeId }));
	}
}
