import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/Category";

@Injectable({
	providedIn: "root",
})
export class CategoriesService {
	private categoriesApi = "http://localhost:3000/api/categories";

	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(private http: HttpClient) {}

	getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(this.categoriesApi).pipe();
	}
}
