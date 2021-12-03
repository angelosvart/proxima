import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	private productsApi = "http://localhost:3000/api/products";
	private productsDetailApi = "http://localhost:3000/api/products/detail";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getProducts(userPostCode: string, filters?: object): Observable<Product[]> {
		let params = new HttpParams();
		params = params.append("postcode", userPostCode);

		if (filters) {
			for (let filter in filters) {
				params = params.append(filter, filters[filter]);
			}
		}

		return this.http
			.get<Product[]>(this.productsApi, { params: params })
			.pipe();
	}

	getProductById(productId: string): Observable<Product> {
		return this.http.get<Product>(`${this.productsApi}/${productId}`).pipe();
	}
}
