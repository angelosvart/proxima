import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/Category";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class CategoriesService {
	private API_URL = environment.API_URL;
	private categoriesApi = `${this.API_URL}/api/categories`;

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(this.categoriesApi).pipe();
	}
}
