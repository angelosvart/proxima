import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { getProducts } from "src/app/products/actions/products.actions";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
	constructor(private store: Store<AppState>, private router: Router) {}

	ngOnInit(): void {}

	toggleSearchBarStatus() {
		document.querySelector("#searchContainer")?.classList.toggle("active");
	}

	search() {
		const searchText: HTMLInputElement = document.querySelector(
			"#searchContainer input"
		);
		let searchValue = searchText.value;
		if (searchValue !== "") {
			this.router.navigate(["/products"], {
				queryParams: { page: 1, search: searchValue },
			});
		}
	}
}
