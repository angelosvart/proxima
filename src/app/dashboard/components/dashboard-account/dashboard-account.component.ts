import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { FormValidators } from "src/app/shared/directives/formValidators";
import {
	editAccountStoreUser,
	logout,
} from "src/app/users/actions/users.actions";
import { StoreUser } from "src/app/users/models/StoreUser";

@Component({
	selector: "app-dashboard-account",
	templateUrl: "./dashboard-account.component.html",
	styleUrls: ["./dashboard-account.component.scss"],
})
export class DashboardAccountComponent implements OnInit, OnDestroy {
	private storesObservable: Subscription;
	public storeUser: StoreUser;

	public accountForm: FormGroup;
	public name: FormControl;
	public contactName: FormControl;
	public email: FormControl;
	public phone: FormControl;
	public address: FormControl;
	public postCode: FormControl;
	public city: FormControl;
	public postCodesServing: FormControl;
	public password: FormControl;
	public password2: FormControl;

	public isEditAccount: boolean = false;
	public error: boolean = false;

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.storesObservable = this.store.select("users").subscribe((response) => {
			if (response.storeUser) {
				this.storeUser = response.storeUser;
			}
			if (response.clientUser) {
				this.router.navigate(["/account"]);
			}

			if (response.pending === false) {
				this.isEditAccount = false;
			}

			if (response.error) {
				this.handleServerError();
			}
		});

		this.titleService.setTitle(`Mi Cuenta | Próxima`);
	}

	ngOnDestroy(): void {
		this.storesObservable.unsubscribe();
	}

	initForm() {
		this.isEditAccount = true;

		let postCodesTransform = this.storeUser.postCodesServing.map(
			(number: number) => {
				return number.toString().padStart(5, "0");
			}
		);

		this.name = new FormControl(this.storeUser.name, [Validators.required]);
		this.contactName = new FormControl(this.storeUser.contactName, [
			Validators.required,
		]);
		this.email = new FormControl(this.storeUser.email, [
			Validators.required,
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
		]);
		this.phone = new FormControl(this.storeUser.phone, [Validators.required]);
		this.address = new FormControl(this.storeUser.address, [
			Validators.required,
		]);
		this.postCode = new FormControl(
			this.storeUser.postCode.toString().padStart(5, "0"),
			[Validators.required, Validators.maxLength(5), Validators.minLength(5)]
		);
		this.city = new FormControl(this.storeUser.city, [Validators.required]);
		this.postCodesServing = new FormControl(postCodesTransform, [
			Validators.required,
			Validators.pattern(/^(\d{5})+(,(\d{5})+)*$/),
		]);
		this.password = new FormControl("");
		this.password2 = new FormControl("");

		this.accountForm = new FormGroup(
			{
				name: this.name,
				contactName: this.contactName,
				email: this.email,
				phone: this.phone,
				address: this.address,
				postCode: this.postCode,
				city: this.city,
				postCodesServing: this.postCodesServing,
				password: this.password,
				password2: this.password2,
			},
			{
				validators: FormValidators.checkPasswords(),
			}
		);

		this.onChanges();
	}

	onChanges() {
		this.accountForm.get("password").valueChanges.subscribe((val) => {
			const password2 = document.querySelector("#password2");
			if (val !== "") {
				password2.classList.remove("hidden");
				this.password2.setValidators([Validators.required]);
				this.password2.updateValueAndValidity();
			} else {
				password2.classList.add("hidden");
				this.password2.clearValidators();
				this.password2.updateValueAndValidity();
			}
		});
	}

	handleForm() {
		this.error = false;

		if (!this.accountForm.valid) {
			this.accountForm.markAllAsTouched();
		} else {
			this.editUser();
		}
	}

	editUser() {
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.disabled = true;
		button.classList.add("loading");

		let postCodesTransform = this.postCodesServing.value
			.toString()
			.split(",")
			.map((number: string) => {
				return parseInt(number);
			});

		let storeUser: StoreUser = {
			_id: this.storeUser._id,
			name: this.name.value,
			contactName: this.contactName.value,
			email: this.email.value,
			phone: this.phone.value,
			address: this.address.value,
			postCode: this.postCode.value,
			city: this.city.value,
			postCodesServing: postCodesTransform,
			password: this.password.value,
		};

		this.store.dispatch(editAccountStoreUser({ storeUser }));
	}

	handleServerError() {
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.disabled = false;
		button.classList.remove("loading");
		button.querySelector("span").innerText = "Guardar";
		this.error = true;
	}

	logout() {
		this.store.dispatch(logout());
	}
}
