import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StoreUser } from "../../users/models/StoreUser";

@Injectable({
	providedIn: "root",
})
export class DashboardService {
	private storesApi = "http://localhost:3000/api/stores";

	constructor(private http: HttpClient) {}

	getStoreById(storeId: string): Observable<StoreUser> {
		return this.http.get<StoreUser>(`${this.storesApi}/${storeId}`).pipe();
	}
}
