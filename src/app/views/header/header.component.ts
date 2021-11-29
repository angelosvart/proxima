import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { CategoryState } from "src/app/products/reducers/categories.reducer";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	public categoryState$: CategoryState;

	constructor(public router: Router, private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store
			.select("categories")
			.subscribe((response) => (this.categoryState$ = response));
	}

	menuModalToggle() {
		document.querySelector("body")?.classList.toggle("openModal");
		document
			.querySelector(".header__navigation")
			?.classList.toggle("openModal");
		document.querySelector(".modalOverlay")?.classList.toggle("openModal");
	}
}
