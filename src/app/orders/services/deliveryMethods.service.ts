import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { DeliveryMethod } from "../models/DeliveryMethod";

@Injectable({
	providedIn: "root",
})
export class DeliveryMethodsService {
	private deliveryMethodsApi =
		"https://proxima-backend.herokuapp.com/api/deliverymethods";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getDeliveryMethods(): Observable<DeliveryMethod[]> {
		return this.http.get<DeliveryMethod[]>(this.deliveryMethodsApi).pipe();
	}
}
