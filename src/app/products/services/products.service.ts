import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	productsApi = "api/products";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getProducts(userPostCode: string): Observable<Product[]> {
		return this.http
			.get<Product[]>(`${this.productsApi}?postcode=${userPostCode}`)
			.pipe();
	}
}
