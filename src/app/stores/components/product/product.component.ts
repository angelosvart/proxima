import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { getCategories } from "src/app/products/actions/categories.actions";
import { createProduct } from "src/app/products/actions/products.actions";
import { Category } from "src/app/products/models/Category";
import { Product } from "src/app/products/models/Product";
import { FormValidators } from "src/app/shared/directives/formValidators";

@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
	//TODO user states
	public storeId: string = "6182b4a097f389088d42ed88";
	public error: boolean = false;

	public productForm: FormGroup;
	public name: FormControl;
	public brand: FormControl;
	public description: FormControl;
	public category: FormControl;
	public subcategory: FormControl;
	public color: FormControl;
	public price: FormControl;
	public isOffer: FormControl;
	public previousPrice: FormControl;
	public isAvailable: FormControl;
	public image: FormControl;

	public imageDisplay: string | ArrayBuffer =
		"../../../../assets/images/empty_image_placeholder.png";

	public categories: Category[];
	private categoriesObservable: Subscription;
	private productsObservable: Subscription;

	constructor(private store: Store<AppState>, private router: Router) {}

	ngOnInit(): void {
		this.categoriesObservable = this.store
			.select("categories")
			.subscribe((response) => {
				this.categories = response?.categories;
				if (response.error) {
					this.handleServerError();
				}
			});

		this.productsObservable = this.store
			.select("products")
			.subscribe((response) => {
				if (response.createdProduct) {
					this.createProductSuccess();
				}
				if (response.error) {
					this.handleServerError();
				}
			});

		this.store.dispatch(getCategories());

		this.initForm();
	}

	initForm() {
		this.name = new FormControl("", [Validators.required]);
		this.brand = new FormControl("", [Validators.required]);
		this.description = new FormControl("", [Validators.required]);
		this.category = new FormControl("", [Validators.required]);
		this.subcategory = new FormControl("", [
			Validators.required,
			FormValidators.maxWordCount(3),
		]);
		this.color = new FormControl("", [Validators.required]);
		this.price = new FormControl("", [
			Validators.required,
			Validators.min(1),
			Validators.max(9999),
		]);
		this.isOffer = new FormControl("", [Validators.required]);
		this.isAvailable = new FormControl("", [Validators.required]);
		this.previousPrice = new FormControl("");
		this.image = new FormControl("", [Validators.required]);

		this.productForm = new FormGroup({
			name: this.name,
			brand: this.brand,
			description: this.description,
			category: this.category,
			subcategory: this.subcategory,
			color: this.color,
			price: this.price,
			isOffer: this.isOffer,
			previousPrice: this.previousPrice,
			isAvailable: this.isAvailable,
			image: this.image,
		});

		this.onChanges();
	}

	onChanges() {
		this.productForm.get("isOffer").valueChanges.subscribe((val) => {
			const previousPriceLabel = document.querySelector(
				"input[name='previousPrice']"
			);
			const switchLabels = document.querySelectorAll(
				".dashboardProduct__switchLabel"
			);
			[...switchLabels].forEach((label) => {
				const input = label.querySelector("input");
				if (input.checked) {
					label.classList.add("active");
					label.nextElementSibling?.classList.add("active");
				} else {
					label.classList.remove("active");
					label.nextElementSibling?.classList.remove("active");
				}
				label.classList.remove("error");
			});

			if (val === "true") {
				previousPriceLabel.parentElement.classList.remove("hidden");
				this.previousPrice.addValidators([
					Validators.required,
					Validators.min(1),
					Validators.max(9999),
				]);
			}
			if (val === "false") {
				previousPriceLabel.parentElement.classList.add("hidden");
				this.previousPrice.removeValidators([
					Validators.required,
					Validators.min(1),
					Validators.max(9999),
				]);
			}
		});

		this.productForm.get("isAvailable").valueChanges.subscribe((val) => {
			const switchLabels = document.querySelectorAll(
				".dashboardProduct__switchLabel"
			);
			[...switchLabels].forEach((label) => {
				const input = label.querySelector("input");
				if (input.checked) {
					label.classList.add("active");
					label.nextElementSibling?.classList.add("active");
				} else {
					label.classList.remove("active");
					label.nextElementSibling?.classList.remove("active");
				}
				label.classList.remove("error");
			});
		});

		this.productForm.get("image").valueChanges.subscribe((val) => {
			const imageButton: HTMLElement = document.querySelector(
				"button[name='imageUpload']"
			);
			imageButton.classList.remove("error");
		});
	}

	handleForm() {
		this.error = false;
		const imageButton: HTMLElement = document.querySelector(
			"button[name='imageUpload']"
		);
		imageButton.classList.remove("error");

		if (!this.productForm.valid) {
			this.productForm.markAllAsTouched();

			const invalidInputRadio = document.querySelectorAll(
				".dashboardProduct__inputRadio"
			);
			invalidInputRadio?.forEach((input) => {
				input.classList.contains("ng-invalid")
					? input.parentElement.classList.add("error")
					: input.parentElement.classList.remove("error");
			});

			if (!this.productForm.get("image").valid) {
				imageButton.classList.add("error");
			}
		} else {
			this.createOrder();
		}
	}

	createOrder() {
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.disabled = true;
		button.classList.add("loading");
		button.querySelector("span").innerText = "Añadiendo producto...";

		console.log(this.productForm.value);

		const productData = new FormData();
		Object.keys(this.productForm.value).map((key) => {
			productData.append(key, this.productForm.value[key]);
		});

		productData.append("store", this.storeId);

		this.store.dispatch(createProduct({ productData }));
	}

	createProductSuccess() {
		setTimeout(() => {
			const button: HTMLButtonElement = document.querySelector(
				"button[type='submit']"
			);
			button.disabled = false;
			button.classList.remove("loading");
			button.querySelector("span").innerText = "¡Producto creado con éxito!";
			setTimeout(() => {
				this.router.navigate(["/dashboard"]);
			}, 1500);
		}, 1500);
	}

	uploadFile($event: any) {
		const imageFile = $event.target.files[0];
		if (imageFile) {
			const reader = new FileReader();
			this.productForm.patchValue({ image: imageFile });
			this.productForm.get("image").updateValueAndValidity();
			reader.onload = () => {
				this.imageDisplay = reader.result;
			};
			reader.readAsDataURL(imageFile);
		}
	}

	handleServerError() {
		this.error = true;
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.disabled = false;
		button.classList.remove("loading");
		button.querySelector("span").innerText = "Añadir Producto";
	}
}
