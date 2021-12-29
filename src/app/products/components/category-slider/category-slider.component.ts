import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs/internal/Subscription";
import { AppState } from "src/app/app.reducer";
import { CategoryState } from "src/app/products/reducers/categories.reducer";
import { Category } from "../../models/Category";

@Component({
	selector: "app-category-slider",
	templateUrl: "./category-slider.component.html",
	styleUrls: ["./category-slider.component.scss"],
})
export class CategorySliderComponent implements OnInit, OnDestroy {
	public categories: Category[];
	private categoriesObservable: Subscription;

	constructor(private store: Store<AppState>, public router: Router) {}

	ngOnInit(): void {
		this.categoriesObservable = this.store
			.select("categories")
			.subscribe((response) => (this.categories = response.categories));
	}

	ngOnDestroy() {
		this.categoriesObservable.unsubscribe();
	}
}
