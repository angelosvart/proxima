import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./app.reducer";
import { initUserSession } from "./users/actions/users.actions";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.store.dispatch(initUserSession());
	}

	title = "Próxima";
}
