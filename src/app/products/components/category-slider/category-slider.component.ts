import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs/internal/Subscription";
import { AppState } from "src/app/app.reducer";
import { Category } from "src/app/products/models/Category";
import { CategoryState } from "src/app/products/reducers/categories.reducer";

@Component({
	selector: "app-category-slider",
	templateUrl: "./category-slider.component.html",
	styleUrls: ["./category-slider.component.scss"],
})
export class CategorySliderComponent implements OnInit, OnDestroy {
	public categoryState$: CategoryState;
	private categoriesObservable: Subscription;

	constructor(private store: Store<AppState>, public router: Router) {}

	ngOnInit(): void {
		this.categoriesObservable = this.store
			.select("categories")
			.subscribe((response) => (this.categoryState$ = response));
	}

	ngOnDestroy() {
		this.categoriesObservable.unsubscribe();
	}
}
