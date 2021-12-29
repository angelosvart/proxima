import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import {
	editOrder,
	getOrderById,
	resetSelectedOrder,
} from "src/app/orders/actions/order.actions";
import { Order } from "src/app/orders/models/Order";

@Component({
	selector: "app-order-item",
	templateUrl: "./order-item.component.html",
	styleUrls: ["./order-item.component.scss"],
})
export class DashboardOrderItemComponent implements OnInit, OnDestroy {
	public order: Order;
	public productCount: number;
	private ordersObservable: Subscription;

	constructor(
		private store: Store<AppState>,
		private titleService: Title,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.ordersObservable = this.store.select("order").subscribe((response) => {
			if (response.selectedOrder) {
				this.order = response.selectedOrder;
				this.productCount = 0;
				response.selectedOrder.products.forEach((product) => {
					this.productCount = this.productCount + product.quantity;
				});
			}
			if (response.error) {
				this.router.navigate(["/dashboard/orders"]);
			}
		});

		this.titleService.setTitle(`Detalles del Pedido | Próxima`);

		this.store.dispatch(
			getOrderById({ orderId: this.activatedRoute.snapshot.params["id"] })
		);
	}

	ngOnDestroy(): void {
		this.ordersObservable.unsubscribe();
		this.store.dispatch(resetSelectedOrder());
	}

	markAsDelivered() {
		const button: HTMLButtonElement = document.querySelector(
			"button[name='delivered']"
		);
		button.disabled = true;
		button.classList.add("loading");
		this.store.dispatch(
			editOrder({ orderId: this.order._id, isDelivered: true })
		);
	}

	markAsPaid() {
		const button: HTMLButtonElement = document.querySelector(
			"button[name='paid']"
		);
		button.disabled = true;
		button.classList.add("loading");
		this.store.dispatch(editOrder({ orderId: this.order._id, isPaid: true }));
	}
}
