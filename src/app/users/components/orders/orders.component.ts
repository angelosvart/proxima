import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { getOrders } from "src/app/orders/actions/order.actions";
import { Order } from "src/app/orders/models/Order";

@Component({
	selector: "app-orders",
	templateUrl: "./orders.component.html",
	styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnDestroy {
	private ordersObservable: Subscription;
	private usersObservable: Subscription;
	public orders: Order[];

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.storeUser) {
				this.router.navigate(["/dashboard/orders"]);
			}
			if (response.clientUser) {
				this.store.dispatch(getOrders());
			}
			if (!response.pending && !response.loggedIn) {
				this.router.navigate(["/"]);
			}
		});

		this.ordersObservable = this.store.select("order").subscribe((response) => {
			if (response.orders) {
				this.orders = response.orders;
			}
		});

		this.titleService.setTitle(`Historial de Pedidos | Próxima`);
	}

	ngOnDestroy(): void {
		this.ordersObservable.unsubscribe();
		this.usersObservable.unsubscribe();
	}
}
