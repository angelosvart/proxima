import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class TokenService {
	constructor() {}

	setToken(token: any) {
		localStorage.setItem("jwtt", token);
	}

	getToken(): string {
		return localStorage.getItem("jwtt");
	}

	removeToken() {
		localStorage.removeItem("jwtt");
	}

	isValidToken() {
		const token = this.getToken();
		if (token) {
			const decodeToken = JSON.parse(atob(token.split(".")[1]));
			return !this.tokenExpired(decodeToken.exp);
		} else {
			return false;
		}
	}

	tokenExpired(expirationDate: any): boolean {
		return Math.floor(new Date().getTime() / 1000) >= expirationDate;
	}

	getIdAndType() {
		const token = this.getToken();
		if (token) {
			const decodeToken = JSON.parse(atob(token.split(".")[1]));
			if (decodeToken?.userId) {
				return { userId: decodeToken.userId };
			} else if (decodeToken?.storeId) {
				return { storeId: decodeToken.storeId };
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
