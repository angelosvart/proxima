import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, catchError, exhaustMap, concatMap, tap } from "rxjs/operators";
import * as UsersActions from "../actions/users.actions";
import { UsersService } from "../services/users.service";
import { TokenService } from "../services/token.service";
import { userReducer } from "../reducers/users.reducer";

@Injectable()
export class UsersEffects {
	loginClientUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.loginClientUser),
			exhaustMap(({ credentials }) =>
				this.usersService.loginClientUser(credentials).pipe(
					tap((response) => {
						const token = response["token"];
						this.tokenService.setToken(token);
					}),
					map((response) =>
						UsersActions.loginClientUserSuccess({ clientUser: response.user })
					),
					catchError((error) =>
						of(UsersActions.loginClientUserFailure({ payload: error }))
					)
				)
			)
		)
	);

	loginStoreUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.loginStoreUser),
			exhaustMap(({ credentials }) =>
				this.usersService.loginStoreUser(credentials).pipe(
					tap((response) => {
						const token = response["token"];
						this.tokenService.setToken(token);
					}),
					map((response) =>
						UsersActions.loginStoreUserSuccess({
							storeUser: response.store,
						})
					),
					catchError((error) =>
						of(UsersActions.loginStoreUserFailure({ payload: error }))
					)
				)
			)
		)
	);

	initUserSession$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.initUserSession),
			concatMap(() => {
				if (this.tokenService.isValidToken()) {
					const user = this.tokenService.getIdAndType();
					if (user && user.userId) {
						return this.usersService.getClientUser(user.userId).pipe(
							map((clientUser) => {
								localStorage.setItem(
									"postCode",
									clientUser.postCode.toString().padStart(5, "0")
								);
								return UsersActions.initUserSessionSuccess({ clientUser });
							})
						);
					} else if (user && user.storeId) {
						return this.usersService.getStoreUser(user.storeId).pipe(
							map((storeUser) => {
								return UsersActions.initUserSessionSuccess({ storeUser });
							})
						);
					} else {
						return of(UsersActions.initUserSessionFailure());
					}
				} else {
					return of(UsersActions.initUserSessionFailure());
				}
			})
		)
	);

	createAccountStoreUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.createAccountStoreUser),
			exhaustMap(({ storeUser }) =>
				this.usersService.createAccountStoreUser(storeUser).pipe(
					tap((response) => {
						const token = response["token"];
						this.tokenService.setToken(token);
					}),
					map((response) =>
						UsersActions.createAccountStoreUserSuccess({
							storeUser: response.store,
						})
					),
					catchError((error) =>
						of(UsersActions.createAccountStoreUserFailure({ payload: error }))
					)
				)
			)
		)
	);

	createAccountClientUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.createAccountClientUser),
			exhaustMap(({ clientUser }) =>
				this.usersService.createAccountClientUser(clientUser).pipe(
					tap((response) => {
						const token = response["token"];
						this.tokenService.setToken(token);
					}),
					map((response) =>
						UsersActions.createAccountClientUserSuccess({
							clientUser: response.user,
						})
					),
					catchError((error) =>
						of(UsersActions.createAccountClientUserFailure({ payload: error }))
					)
				)
			)
		)
	);

	editAccountClientUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.editAccountClientUser),
			exhaustMap(({ clientUser }) =>
				this.usersService.editAccountClientUser(clientUser).pipe(
					map((response) =>
						UsersActions.editAccountClientUserSuccess({
							clientUser: response.user,
						})
					),
					catchError((error) =>
						of(UsersActions.editAccountClientUserFailure({ payload: error }))
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private usersService: UsersService,
		private tokenService: TokenService
	) {}
}
