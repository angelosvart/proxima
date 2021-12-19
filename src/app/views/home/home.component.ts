import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
	private usersObservable: Subscription;

	constructor(
		private router: Router,
		private titleService: Title,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.titleService.setTitle(`Próxima`);

		const userPostCode = localStorage.getItem("postCode");

		if (userPostCode) {
			this.router.navigate(["/products"]);
		}

		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.storeUser && response.loggedIn) {
				this.router.navigate(["/dashboard"]);
			}

			if (response.clientUser && response.loggedIn) {
				this.router.navigate(["/products"]);
			}
		});
	}

	ngOnDestroy(): void {
		this.usersObservable.unsubscribe();
	}
}
