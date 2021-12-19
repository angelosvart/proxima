import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ClientUser } from "../models/ClientUser";
import { Credentials } from "../models/Credentials";
import { StoreUser } from "../models/StoreUser";
import { TokenService } from "./token.service";

@Injectable({
	providedIn: "root",
})
export class UsersService {
	private usersApi = "http://localhost:3000/api/users";
	private storesApi = "http://localhost:3000/api/stores";

	constructor(
		private http: HttpClient,
		private router: Router,
		private tokenService: TokenService
	) {}

	loginClientUser({ email, password }: Credentials): Observable<any> {
		return this.http.post<ClientUser>(`${this.usersApi}/login`, {
			email,
			password,
		});
	}

	loginStoreUser({ email, password }: Credentials): Observable<any> {
		return this.http.post<StoreUser>(`${this.storesApi}/login`, {
			email,
			password,
		});
	}

	logout() {
		this.tokenService.removeToken();
		this.router.navigate(["/login"]);
	}

	initSession() {
		const token = this.tokenService.getToken();
	}

	getClientUser(userId: string): Observable<ClientUser> {
		return this.http.get<ClientUser>(`${this.usersApi}/${userId}`);
	}

	getStoreUser(storeId: string): Observable<StoreUser> {
		return this.http.get<StoreUser>(`${this.storesApi}/${storeId}`);
	}

	createAccountStoreUser(storeUser: StoreUser): Observable<any> {
		return this.http.post<StoreUser>(`${this.storesApi}/register`, {
			storeUser,
		});
	}

	createAccountClientUser(clientUser: ClientUser): Observable<any> {
		return this.http.post<ClientUser>(`${this.usersApi}/register`, {
			clientUser,
		});
	}

	editAccountClientUser(clientUser: ClientUser): Observable<any> {
		return this.http.put<ClientUser>(
			`${this.usersApi}/edit/${clientUser._id}`,
			{
				clientUser,
			}
		);
	}
}
