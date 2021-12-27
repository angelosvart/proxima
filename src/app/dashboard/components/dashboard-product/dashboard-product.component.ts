import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { getCategories } from "src/app/products/actions/categories.actions";
import {
	cleanCreatedProduct,
	createProduct,
	deleteProduct,
	editProduct,
	getProductById,
} from "src/app/products/actions/products.actions";
import { Category } from "src/app/products/models/Category";
import { Product } from "src/app/products/models/Product";
import { FormValidators } from "src/app/shared/directives/formValidators";
import { StoreUser } from "src/app/users/models/StoreUser";

@Component({
	selector: "app-dashboard-product",
	templateUrl: "./dashboard-product.component.html",
	styleUrls: ["./dashboard-product.component.scss"],
})
export class DashboardProductComponent implements OnInit, OnDestroy {
	public storeUser: StoreUser;
	public error: boolean = false;
	public isProductEdit: boolean = false;
	public product: Product;
	public pageTitle: string;

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
	private usersObservable: Subscription;

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.usersObservable = this.store.select("users").subscribe((response) => {
			if (response.storeUser) {
				this.storeUser = response.storeUser;
			}
		});

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
				if (response.selectedProduct) {
					this.product = response.selectedProduct;
					this.titleService.setTitle(`${this.pageTitle} | Próxima`);
					this.setFormValues();
				}
				if (response.deletedProduct) {
					this.deleteProductSuccess();
				}
				if (response.error) {
					this.handleServerError();
				}
			});

		this.activatedRoute.params.subscribe((params) => {
			const id = params["id"];
			if (id) {
				this.store.dispatch(getProductById({ productId: id }));
				this.isProductEdit = true;
			}
		});

		if (!this.isProductEdit) {
			this.pageTitle = "Añadir Producto";
		} else {
			this.pageTitle = "Editar Producto";
		}

		this.titleService.setTitle(`${this.pageTitle} | Próxima`);

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

	setFormValues() {
		this.productForm?.get("name").setValue(this.product.name);
		this.productForm?.get("brand").setValue(this.product.brand);
		this.productForm?.get("description").setValue(this.product.description);
		this.productForm?.get("category").setValue(this.product.category["_id"]);
		this.productForm?.get("subcategory").setValue(this.product.subcategory);
		this.productForm?.get("color").setValue(this.product.color);
		this.productForm?.get("price").setValue(this.product.price);
		this.productForm?.get("isOffer").setValue(this.product.isOffer);

		const isOfferInputs = document.querySelectorAll("input[name='isOffer']");
		[...isOfferInputs].forEach((input: HTMLInputElement) => {
			if (input.value === "true" && this.product.isOffer) {
				input.click();
			}
			if (input.value === "false" && !this.product.isOffer) {
				input.click();
			}
		});

		this.productForm?.get("isAvailable").setValue(this.product.isAvailable);

		const isAvailableInputs = document.querySelectorAll(
			"input[name='isAvailable']"
		);
		[...isAvailableInputs].forEach((input: HTMLInputElement) => {
			if (input.value === "true" && this.product.isAvailable) {
				input.click();
			}
			if (input.value === "false" && !this.product.isAvailable) {
				input.click();
			}
		});

		this.productForm?.get("previousPrice").setValue(this.product.previousPrice);
		this.productForm?.get("image").setValue(this.product.image);
		const image: HTMLImageElement = document.querySelector(
			".dashboardProduct__image"
		);
		image.src = this.product.image;
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
			this.createProduct();
		}
	}

	createProduct() {
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.disabled = true;
		button.classList.add("loading");
		if (!this.isProductEdit) {
			button.querySelector("span").innerText = "Añadiendo producto...";
		} else {
			button.querySelector("span").innerText = "Editando producto...";
		}

		let productData = new FormData();
		Object.keys(this.productForm.value).map((key) => {
			if (
				key === "image" &&
				this.product &&
				this.productForm.value[key] === this.product.image
			) {
				return;
			}
			productData.append(key, this.productForm.value[key]);
		});

		productData.append("store", this.storeUser._id);

		if (!this.isProductEdit) {
			this.store.dispatch(createProduct({ productData }));
		} else {
			this.store.dispatch(
				editProduct({ productId: this.product._id, productData })
			);
		}
	}

	createProductSuccess() {
		const button: HTMLButtonElement = document.querySelector(
			"button[type='submit']"
		);
		button.classList.remove("loading");
		if (!this.isProductEdit) {
			button.querySelector("span").innerText = "¡Producto creado con éxito!";
		} else {
			button.querySelector("span").innerText = "¡Producto editado con éxito!";
		}
		setTimeout(() => {
			this.router.navigate(["/dashboard"]);
			this.store.dispatch(cleanCreatedProduct());
		}, 500);
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
		if (!this.isProductEdit) {
			button.querySelector("span").innerText = "Añadir Producto";
		} else {
			button.querySelector("span").innerText = "Editar Producto";
		}
	}

	openModal() {
		document.querySelector(".deleteOverlay")?.classList.add("openModal");
	}

	closeModal() {
		document.querySelector(".deleteOverlay")?.classList.remove("openModal");
	}

	deleteProduct() {
		this.closeModal();
		const button: HTMLButtonElement = document.querySelector(
			".dashboardProduct__buttonDelete"
		);
		button.querySelector("span").innerText = "Eliminando producto...";
		button.disabled = true;
		button.classList.add("loading");

		this.store.dispatch(deleteProduct({ productId: this.product._id }));
	}

	deleteProductSuccess() {
		setTimeout(() => {
			const button: HTMLButtonElement = document.querySelector(
				".dashboardProduct__buttonDelete"
			);
			button.classList.remove("loading");
			button.querySelector("span").innerText = "¡Producto eliminado con éxito!";
			setTimeout(() => {
				this.router.navigate(["/dashboard"]);
			}, 500);
		}, 1000);
	}

	ngOnDestroy(): void {
		this.usersObservable.unsubscribe();
		this.productsObservable.unsubscribe();
		this.categoriesObservable.unsubscribe();
		this.isProductEdit = false;
	}
}
