import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Category } from "src/app/products/models/Category";
import { CategoryState } from "src/app/products/reducers/categories.reducer";

@Component({
	selector: "app-category-slider",
	templateUrl: "./category-slider.component.html",
	styleUrls: ["./category-slider.component.scss"],
})
export class CategorySliderComponent implements OnInit {
	public categoryState$: CategoryState;

	constructor(private store: Store<AppState>, public router: Router) {
		this.store
			.select("categories")
			.subscribe((response) => (this.categoryState$ = response));
	}

	ngOnInit(): void {}
}
