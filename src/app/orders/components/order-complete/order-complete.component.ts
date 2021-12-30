import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { getOrderById, resetOrders } from "../../actions/order.actions";
import { Order } from "../../models/Order";

@Component({
	selector: "app-order-complete",
	templateUrl: "./order-complete.component.html",
	styleUrls: ["./order-complete.component.scss"],
})
export class OrderCompleteComponent implements OnInit, OnDestroy {
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
				this.router.navigate(["/"]);
			}
			if (this.order?.products) {
				this.getStoreInfo();
			}
		});

		this.titleService.setTitle(`Pedido Realizado | Próxima`);

		this.activatedRoute.queryParams.subscribe((params) => {
			if (params["order"]) {
				this.store.dispatch(getOrderById({ orderId: params["order"] }));
			}
		});
	}

	ngOnDestroy(): void {
		this.ordersObservable.unsubscribe();
		this.store.dispatch(resetOrders());
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
