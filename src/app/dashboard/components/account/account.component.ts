import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { editAccountClientUser } from "../../actions/users.actions";
import { ClientUser } from "../../models/ClientUser";

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit, OnDestroy {
	private usersObservable: Subscription;
	public clientUser: ClientUser;

	public accountForm: FormGroup;
	public name: FormControl;
	public surname: FormControl;
	public email: FormControl;
	public phone: FormControl;
	public address: FormControl;
	public postCode: FormControl;
	public city: FormControl;
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
		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.clientUser) {
				this.clientUser = response.clientUser;
				localStorage.setItem(
					"postCode",
					response.clientUser.postCode.toString().padStart(5, "0")
				);
			}
			if (response.storeUser) {
				this.router.navigate(["/dashboard/account"]);
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
		this.usersObservable.unsubscribe();
	}

	initForm() {
		this.isEditAccount = true;
		this.name = new FormControl(this.clientUser.name, [Validators.required]);
		this.surname = new FormControl(this.clientUser.lastName, [
			Validators.required,
		]);
		this.email = new FormControl(this.clientUser.email, [
			Validators.required,
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
		]);
		this.phone = new FormControl(this.clientUser.phone);
		this.address = new FormControl(this.clientUser.address);
		this.postCode = new FormControl(
			this.clientUser.postCode.toString().padStart(5, "0"),
			[Validators.required, Validators.maxLength(5), Validators.minLength(5)]
		);
		this.city = new FormControl(this.clientUser.city);
		this.password = new FormControl("", [Validators.required]);
		this.password2 = new FormControl("", [Validators.required]);

		this.accountForm = new FormGroup({
			name: this.name,
			surname: this.surname,
			email: this.email,
			phone: this.phone,
			address: this.address,
			postCode: this.postCode,
			city: this.city,
			password: this.password,
			password2: this.password2,
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

		let clientUser: ClientUser = {
			_id: this.clientUser._id,
			name: this.name.value,
			lastName: this.surname.value,
			email: this.email.value,
			phone: this.phone.value,
			address: this.address.value,
			postCode: this.postCode.value,
			city: this.city.value,
		};

		this.store.dispatch(editAccountClientUser({ clientUser }));
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
}
