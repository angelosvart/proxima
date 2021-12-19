import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { FormValidators } from "src/app/shared/directives/formValidators";
import {
	createAccountClientUser,
	createAccountStoreUser,
} from "../../actions/users.actions";
import { ClientUser } from "../../models/ClientUser";
import { StoreUser } from "../../models/StoreUser";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
	public registerForm: FormGroup;
	public userType: FormControl;
	public name: FormControl;
	public surname: FormControl;
	public email: FormControl;
	public phone: FormControl;
	public address: FormControl;
	public postCode: FormControl;
	public password: FormControl;
	public password2: FormControl;
	public city: FormControl;
	public storeName: FormControl;
	public contactName: FormControl;
	public postCodesServing: FormControl;
	private usersObservable: Subscription;
	public error: boolean = false;
	public errorMessage: string;

	constructor(
		private titleService: Title,
		private store: Store<AppState>,
		private router: Router
	) {}

	ngOnInit(): void {
		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.storeUser && response.loggedIn) {
				this.router.navigate(["/dashboard"]);
			}

			if (response.clientUser && response.loggedIn) {
				localStorage.setItem(
					"postCode",
					response.clientUser.postCode.toString().padStart(5, "0")
				);
				this.router.navigate(["/products"]);
			}

			if (response.error) {
				if (response.error.status === 409) {
					this.errorMessage =
						"Ya existe una cuenta con este correo electrónico.";
				} else {
					this.errorMessage =
						"Ha ocurrido un error y no se ha podido crear una cuenta. Por favor inténtalo nuevamente.";
				}
				this.handleServerError();
			}
		});

		this.titleService.setTitle(`Crear Cuenta | Próxima`);
		this.initForm();
	}

	ngOnDestroy(): void {
		this.usersObservable.unsubscribe();
	}

	initForm() {
		this.userType = new FormControl("", [Validators.required]);
		this.name = new FormControl("", [Validators.required]);
		this.surname = new FormControl("", [Validators.required]);
		this.email = new FormControl("", [
			Validators.required,
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
		]);
		this.phone = new FormControl("");
		this.address = new FormControl("");
		this.postCode = new FormControl("", [
			Validators.required,
			Validators.maxLength(5),
			Validators.minLength(5),
		]);
		this.city = new FormControl("");
		this.password = new FormControl("", [Validators.required]);
		this.password2 = new FormControl("", [Validators.required]);
		this.storeName = new FormControl("", [Validators.required]);
		this.contactName = new FormControl("", [Validators.required]);
		this.postCodesServing = new FormControl("", [
			Validators.required,
			Validators.pattern(/^(\d{5})+(,(\d{5})+)*$/),
		]);

		this.registerForm = new FormGroup(
			{
				userType: this.userType,
				name: this.name,
				surname: this.surname,
				email: this.email,
				phone: this.phone,
				address: this.address,
				postCode: this.postCode,
				city: this.city,
				password: this.password,
				password2: this.password2,
				storeName: this.storeName,
				contactName: this.contactName,
				postCodesServing: this.postCodesServing,
			},
			{
				validators: FormValidators.checkPasswords(),
			}
		);

		this.onChanges();
	}

	onChanges() {
		this.registerForm.get("userType").valueChanges.subscribe((val) => {
			const switchLabels = document.querySelectorAll(".register__switchLabel");
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

			const clientUserFieldsets = document.querySelectorAll(".clientUser");
			const storeUserFieldsets = document.querySelectorAll(".storeUser");

			if (val === "user") {
				clientUserFieldsets?.forEach((fieldset) => {
					fieldset.classList.remove("hidden");
				});
				storeUserFieldsets?.forEach((fieldset) => {
					fieldset.classList.add("hidden");
				});

				this.name.setValidators([Validators.required]);
				this.name.updateValueAndValidity();

				this.surname.setValidators([Validators.required]);
				this.surname.updateValueAndValidity();

				this.storeName.clearValidators();
				this.storeName.updateValueAndValidity();

				this.contactName.clearValidators();
				this.contactName.updateValueAndValidity();

				this.postCodesServing.clearValidators();
				this.postCodesServing.updateValueAndValidity();
			} else {
				clientUserFieldsets?.forEach((fieldset) => {
					fieldset.classList.add("hidden");
				});
				storeUserFieldsets?.forEach((fieldset) => {
					fieldset.classList.remove("hidden");
				});
				this.storeName.setValidators([Validators.required]);
				this.storeName.updateValueAndValidity();

				this.contactName.setValidators([Validators.required]);
				this.contactName.updateValueAndValidity();

				this.postCodesServing.setValidators([
					Validators.required,
					Validators.pattern(/^(\d{5})+(,(\d{5})+)*$/),
				]);
				this.postCodesServing.updateValueAndValidity();

				this.name.clearValidators();
				this.name.updateValueAndValidity();

				this.surname.clearValidators();
				this.surname.updateValueAndValidity();
			}
		});
	}

	handleForm() {
		this.error = false;
		if (!this.registerForm.valid) {
			this.registerForm.markAllAsTouched();

			const invalidInputRadio = document.querySelectorAll(
				".register__inputRadio"
			);
			invalidInputRadio?.forEach((input) => {
				input.classList.contains("ng-invalid")
					? input.parentElement.classList.add("error")
					: input.parentElement.classList.remove("error");
			});
		} else {
			this.createAccount();
		}
	}

	createAccount() {
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.disabled = true;
		button.classList.add("loading");
		button.querySelector("span").innerText = "Creando cuenta...";

		let postCodesTransform = this.postCodesServing.value
			.split(",")
			.map((number: string) => {
				return parseInt(number);
			});

		if (this.userType.value === "store") {
			let storeUser: StoreUser = {
				name: this.storeName.value,
				contactName: this.contactName.value,
				email: this.email.value,
				phone: this.phone.value,
				address: this.address.value,
				postCode: this.postCode.value,
				city: this.city.value,
				postCodesServing: postCodesTransform,
				password: this.password.value,
			};
			this.store.dispatch(createAccountStoreUser({ storeUser }));
		}

		if (this.userType.value === "user") {
			let clientUser: ClientUser = {
				name: this.name.value,
				lastName: this.surname.value,
				email: this.email.value,
				phone: this.phone.value,
				address: this.address.value,
				postCode: this.postCode.value,
				city: this.city.value,
				password: this.password.value,
			};

			this.store.dispatch(createAccountClientUser({ clientUser }));
		}
	}

	handleServerError() {
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.disabled = false;
		button.classList.remove("loading");
		button.querySelector("span").innerText = "Crear Cuenta";
		this.error = true;
	}
}
