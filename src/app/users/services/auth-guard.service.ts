import { Injectable } from "@angular/core";
import {
	ActivatedRoute,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { TokenService } from "./token.service";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private tokenService: TokenService) {}

	canActivate() {
		const token = this.tokenService.getToken();

		if (token) {
			const decodeToken = JSON.parse(atob(token.split(".")[1]));
			if (decodeToken.storeId && !this.tokenExpired(decodeToken.exp))
				return true;
			if (decodeToken.userId && !this.tokenExpired(decodeToken.exp)) {
				return true;
			}
		}

		this.router.navigate(["/login"]);
		return false;
	}

	tokenExpired(expirationDate: any): boolean {
		return Math.floor(new Date().getTime() / 1000) >= expirationDate;
	}
}
