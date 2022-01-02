import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaymentMethod } from "../models/PaymentMethod";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class PaymentMethodsService {
	private API_URL = environment.API_URL;
	private paymentMethodsApi = `${this.API_URL}/api/paymentmethods`;

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getPaymentMethods(): Observable<PaymentMethod[]> {
		return this.http.get<PaymentMethod[]>(this.paymentMethodsApi).pipe();
	}
}
