import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	private API_URL = environment.API_URL;
	private productsApi = `${this.API_URL}/api/products`;

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

	createProduct(productData: FormData): Observable<Product> {
		return this.http.post<Product>(this.productsApi, productData);
	}

	getProductsByStoreId(storeId: string): Observable<Product[]> {
		return this.http
			.get<Product[]>(`${this.productsApi}/store/${storeId}`)
			.pipe();
	}

	editProduct(productId: string, productData: FormData): Observable<Product> {
		return this.http.put<Product>(
			`${this.productsApi}/${productId}`,
			productData
		);
	}

	deleteProduct(productId: string): Observable<any> {
		return this.http.delete<Product>(`${this.productsApi}/${productId}`);
	}
}
