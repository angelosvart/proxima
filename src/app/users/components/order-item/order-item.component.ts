import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import {
	getOrderById,
	resetSelectedOrder,
} from "src/app/orders/actions/order.actions";
import { Order } from "src/app/orders/models/Order";

@Component({
	selector: "app-order-item",
	templateUrl: "./order-item.component.html",
	styleUrls: ["./order-item.component.scss"],
})
export class OrderItemComponent implements OnInit {
	public order: Order;
	public productCount: number;
	public stores: any[] = [];
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
				this.router.navigate(["/account/orders"]);
			}
			if (this.order?.products) {
				this.getStoreInfo();
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

	getStoreInfo() {
		this.order.products.forEach((product) => {
			if (product.productId["store"]) {
				this.stores.push(product.productId["store"]);
			}
		});
		this.stores = [
			...new Map(this.stores.map((store) => [store._id, store])).values(),
		];
	}
}
