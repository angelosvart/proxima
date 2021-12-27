import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { logout } from "../../actions/users.actions";

@Component({
	selector: "app-lateral-menu",
	templateUrl: "./lateral-menu.component.html",
	styleUrls: ["./lateral-menu.component.scss"],
})
export class LateralMenuComponent implements OnInit {
	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {}

	logout() {
		this.store.dispatch(logout());
	}
}
