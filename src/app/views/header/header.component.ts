import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { CartService } from "src/app/orders/services/cart.service";
import { getCategories } from "src/app/products/actions/categories.actions";
import { CategoryState } from "src/app/products/reducers/categories.reducer";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	public categoryState$: CategoryState;
	public cartCount: number = 0;

	constructor(public router: Router, private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store
			.select("categories")
			.subscribe((response) => (this.categoryState$ = response));
		this.store.select("cart").subscribe((response) => {
			this.cartCount = 0;
			response?.cart.forEach((item) => {
				this.cartCount = this.cartCount + item.quantity;
			});
		});

		this.store.dispatch(getCategories());
	}

	openModal() {
		document.querySelector("body")?.classList.add("openModal");
		document.querySelector(".header__navigation")?.classList.add("openModal");
		document.querySelector(".modalOverlay")?.classList.add("openModal");
	}

	closeModal() {
		document.querySelector("body")?.classList.remove("openModal");
		document
			.querySelector(".header__navigation")
			?.classList.remove("openModal");
		document.querySelector(".modalOverlay")?.classList.remove("openModal");
	}
}
