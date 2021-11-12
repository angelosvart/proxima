import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-postcode-search",
	templateUrl: "./postcode-search.component.html",
	styleUrls: ["./postcode-search.component.scss"],
})
export class PostcodeSearchComponent implements OnInit {
	public postCode: FormControl;

	constructor(private router: Router) {}

	ngOnInit(): void {
		const userPostCode = localStorage.getItem("postCode");

		if (userPostCode) {
			this.router.navigate(["products"]);
		}

		this.postCode = new FormControl("", [
			Validators.required,
			Validators.maxLength(5),
			Validators.minLength(5),
		]);
	}

	toggleSearchBarStatus() {
		document.querySelector("#searchContainer")?.classList.toggle("active");
	}

	submitForm() {
		if (this.postCode.valid) {
			localStorage.setItem("postCode", this.postCode.value);
			this.router.navigate(["products"]);
		}
	}
}
