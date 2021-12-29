import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../models/Order";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private orderApi = "https://proxima-backend.herokuapp.com/api/orders";

	constructor(private http: HttpClient) {}

	createOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(this.orderApi, order);
	}

	getOrderById(orderId: string): Observable<Order> {
		return this.http.get<Order>(`${this.orderApi}/${orderId}`).pipe();
	}

	getOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(`${this.orderApi}`).pipe();
	}

	editOrder(
		orderId: string,
		isDelivered?: boolean,
		isPaid?: boolean
	): Observable<any> {
		return this.http.put<Order>(`${this.orderApi}/${orderId}`, {
			isDelivered,
			isPaid,
		});
	}
}
