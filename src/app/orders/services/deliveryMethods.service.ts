import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { DeliveryMethod } from "../models/DeliveryMethod";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class DeliveryMethodsService {
	private API_URL = environment.API_URL;
	private deliveryMethodsApi = `${this.API_URL}/api/deliverymethods`;

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getDeliveryMethods(): Observable<DeliveryMethod[]> {
		return this.http.get<DeliveryMethod[]>(this.deliveryMethodsApi).pipe();
	}
}
