import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { logout } from "src/app/users/actions/users.actions";

@Component({
	selector: "app-lateral-menu",
	templateUrl: "./lateral-menu.component.html",
	styleUrls: ["./lateral-menu.component.scss"],
})
export class LateralMenuComponent implements OnInit {
	constructor(private store: Store<AppState>, public router: Router) {}

	ngOnInit(): void {}

	logout() {
		this.store.dispatch(logout());
	}
}
