import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ClientUser } from "../models/ClientUser";
import { Credentials } from "../models/Credentials";
import { StoreUser } from "../models/StoreUser";
import { TokenService } from "./token.service";

@Injectable({
	providedIn: "root",
})
export class UsersService {
	private API_URL = environment.API_URL;
	private usersApi = `${this.API_URL}/api/users`;
	private storesApi = `${this.API_URL}/api/stores`;

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
		localStorage.removeItem("postCode");
		this.router.navigate(["/"]);
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

	editAccountStoreUser(storeUser: StoreUser): Observable<any> {
		return this.http.put<StoreUser>(`${this.storesApi}/edit/${storeUser._id}`, {
			storeUser,
		});
	}
}
