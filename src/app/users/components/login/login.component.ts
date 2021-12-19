import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { loginStoreUser, loginClientUser } from "../../actions/users.actions";
import { Credentials } from "../../models/Credentials";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
	public loginForm: FormGroup;
	public userType: FormControl;
	public email: FormControl;
	public password: FormControl;
	public error: boolean = false;
	public errorMessage: string;
	public redirectURL: string;

	private usersObservable: Subscription;

	constructor(
		private store: Store<AppState>,
		private titleService: Title,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.redirectURL = this.route.snapshot.queryParamMap.get("redirectTo");

		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.storeUser && response.loggedIn) {
				this.router.navigate(["/dashboard"]);
			}
			if (response.clientUser && response.loggedIn) {
				localStorage.setItem(
					"postCode",
					response.clientUser.postCode.toString().padStart(5, "0")
				);
				if (this.redirectURL) {
					this.router.navigate([this.redirectURL]);
				} else {
					this.router.navigate(["products"]);
				}
			}
			if (response.error) {
				if (response.error.status === 400) {
					this.errorMessage =
						"La cuenta no ha sido encontrada o la contraseña es incorrecta. Por favor inténtalo nuevamente.";
				} else {
					this.errorMessage =
						"Ha ocurrido un error y se ha podido iniciar sesión. Por favor inténtalo nuevamente.";
				}
				this.handleServerError();
			}
		});

		this.titleService.setTitle(`Iniciar Sesión | Próxima`);
		this.initForm();
	}

	ngOnDestroy(): void {
		this.usersObservable.unsubscribe();
	}

	initForm() {
		this.userType = new FormControl("", [Validators.required]);
		this.email = new FormControl("", [
			Validators.required,
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
		]);
		this.password = new FormControl("", [Validators.required]);

		this.loginForm = new FormGroup({
			userType: this.userType,
			email: this.email,
			password: this.password,
		});

		this.onChanges();
	}

	onChanges() {
		this.loginForm.get("userType").valueChanges.subscribe((val) => {
			const switchLabels = document.querySelectorAll(".login__switchLabel");
			[...switchLabels].forEach((label) => {
				const input = label.querySelector("input");
				if (input.checked) {
					label.classList.add("active");
					label.nextElementSibling?.classList.add("active");
				} else {
					label.classList.remove("active");
					label.nextElementSibling?.classList.remove("active");
				}
				label.classList.remove("error");
			});
		});
	}

	handleForm() {
		this.error = false;
		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();

			const invalidInputRadio = document.querySelectorAll(".login__inputRadio");
			invalidInputRadio?.forEach((input) => {
				input.classList.contains("ng-invalid")
					? input.parentElement.classList.add("error")
					: input.parentElement.classList.remove("error");
			});
		} else {
			const button: HTMLButtonElement =
				document.querySelector(".login__button");
			button.disabled = true;
			button.classList.add("loading");
			button.querySelector("span").innerText = "Iniciando sesión...";

			let loginData: Credentials = {
				email: this.email.value,
				password: this.password.value,
			};

			if (this.userType.value === "store") {
				this.store.dispatch(loginStoreUser({ credentials: loginData }));
			}

			if (this.userType.value === "user") {
				this.store.dispatch(loginClientUser({ credentials: loginData }));
			}
		}
	}

	handleServerError() {
		const button: HTMLButtonElement = document.querySelector(".login__button");
		button.disabled = false;
		button.classList.remove("loading");
		button.querySelector("span").innerText = "Iniciar Sesión";
		this.error = true;
	}
}
