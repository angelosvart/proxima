import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Stores } from "../models/Stores";

@Injectable({
	providedIn: "root",
})
export class StoresService {
	private storesApi = "http://localhost:3000/api/stores";

	constructor(private http: HttpClient) {}

	getStoreById(storeId: string): Observable<Stores> {
		return this.http.get<Stores>(`${this.storesApi}/${storeId}`).pipe();
	}
}
