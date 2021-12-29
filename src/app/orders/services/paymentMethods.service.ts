import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaymentMethod } from "../models/PaymentMethod";

@Injectable({
	providedIn: "root",
})
export class PaymentMethodsService {
	private paymentMethodsApi =
		"https://proxima-backend.herokuapp.com/api/paymentmethods";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getPaymentMethods(): Observable<PaymentMethod[]> {
		return this.http.get<PaymentMethod[]>(this.paymentMethodsApi).pipe();
	}
}
