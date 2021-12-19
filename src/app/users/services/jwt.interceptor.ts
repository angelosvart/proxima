import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private tokenService: TokenService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const storeToken = this.tokenService.getToken();
		const isApiUrl = request.url.match("/api/");

		if (storeToken && isApiUrl) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${storeToken}`,
				},
			});
		}

		return next.handle(request);
	}
}
